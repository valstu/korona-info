import { format, sub, eachDayOfInterval, isSameDay } from 'date-fns';
import groupBy from 'lodash.groupby'
import sortBy from 'lodash.sortby'
import { Confirmed } from '../pages';
import { InfectionSourceEnum } from '../pages/index';

// Map data to show development of infections
export const colors = [
  '#003f5c',
  '#2fab8e',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
  '#ee2320',
];

interface InfectionDevelopmentDataItem {
  date: number;
  infections: number
};

export const getTimeSeriesData = (confirmed:Confirmed[]): {
  infectionDevelopmentData: InfectionDevelopmentDataItem[]
  infectionDevelopmentData30Days: InfectionDevelopmentDataItem[]
} =>  {

  const sortedData = sortBy(confirmed, 'date').map(item => ({...item, dateString: format(new Date(item.date), 'yyyy-MM-dd')}));


  const daysIntervalSinceFirstInfection = eachDayOfInterval({ start: new Date(sortedData[0].date), end: new Date(sortedData[sortedData.length -1].date)});

  const infectionDevelopmentData:InfectionDevelopmentDataItem[] = []
  daysIntervalSinceFirstInfection.reduce((acc, curr) => {
    const items = sortedData.filter(item => isSameDay(new Date(item.date), curr));
    if (items) {
      infectionDevelopmentData.push({date: curr.getTime(), infections: acc + items.length})
    } else {
      infectionDevelopmentData.push({date: curr.getTime(), infections: acc})
    }
    return items.length ? acc + items.length : acc
  }, 0)  
  
  const thirtyDaysAgo = sub(new Date(), {days: 30});
  const infectionDevelopmentData30Days = infectionDevelopmentData.filter(item => item.date > thirtyDaysAgo.getTime());
  

  return {
    infectionDevelopmentData,
    infectionDevelopmentData30Days,
  };

}

export const getTnfectionsByDistrict = (confirmed:Confirmed[]) => {
  const groupedData = groupBy(confirmed, 'healthCareDistrict');

  const infectionsByDistrict = Object.entries(groupedData).map((value) => ({
    name: value[0],
    infections: value[1].length
  }))

  const areas = Object.entries(groupedData).map((value) => (value[0]));
  return {
    infectionsByDistrict,
    areas
  };
}

export const getInfectionsBySourceCountry = (confirmed:Confirmed[]) => {
  const groupedData = groupBy(confirmed, 'infectionSourceCountry');

  const infectionsBySourceCountry = Object.entries(groupedData).map((value) => ({
    name: value[0] === 'null' ? 'Ei tiedossa' : value[0],
    infections: value[1].length
  }))

  const areas = Object.entries(groupedData).map((value) => (value[0]));
  return {
    infectionsBySourceCountry,
    areas
  };
}

const getGroup = (infection: Confirmed, confirmed: Confirmed[]): string | null => {
  if (typeof infection.infectionSource === 'number') {
    const item = confirmed.find(i => Number(i.id) === infection.infectionSource);
    if (item) {
      if (typeof item.infectionSource === 'number') {
        return getGroup(item, confirmed);
      }
      if (item.infectionSourceCountry) {
        return item.infectionSourceCountry;
      }
      return null;
    }
  }
  return infection.infectionSourceCountry;
}

export const getNetworkGraphData = (confirmed:Confirmed[]) => {

  const infectionSources = Array.from(new Set(confirmed.filter(i => typeof i.infectionSource === 'number').map(inf => inf.infectionSource)));

  const uniqueCountries = Array.from(new Set(confirmed.filter(i => !!i.infectionSourceCountry).map(inff => inff.infectionSourceCountry)));

  const allNodes = confirmed.map((infection, index) => ({
    ...infection,
    id: Number(infection.id),
    label: `#${infection.id}`,
    // group: getGroup(infection, confirmed),
    color: `${colors[uniqueCountries.indexOf(infection.infectionSourceCountry)]}`,
  }));
  const nodes = allNodes.filter(i => infectionSources.includes(i.id) || typeof i.infectionSource === 'number');
  // @ts-ignore
  const edges = allNodes.map(i => ({
    from: typeof i.infectionSource === 'number' ? i.infectionSource : i.infectionSourceCountry,
    to: i.id,
  }));
  const filteredNodes = allNodes.filter(i => !!i.infectionSourceCountry || typeof i.infectionSource === 'number');
  // @ts-ignore
  uniqueCountries.map((country, index) => filteredNodes.push({ id:country, label: country, color: `${colors[uniqueCountries.indexOf(country)]}` }))
  return {
    nodes: filteredNodes,
    edges
  };
}

import { format, sub, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
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

export const healtCareDistricts = [
  { name: 'HUS', people: 1651715 },
  { name: 'Etelä-Karjala', people: 129865 },
  { name: 'Kymenlaakso', people: 168691 },
  { name: 'Päijät-Häme', people: 211957 },
  { name: 'Pohjois-Savo', people: 246653 },
  { name: 'Etelä-Savo', people: 101518 },
  { name: 'Itä-Savo', people: 42221 },
  { name: 'Keski-Suomi', people: 252902 },
  { name: 'Pohjois-Karjala', people: 166441 },
  { name: 'Pohjois-Pohjanmaa', people: 409043 },
  { name: 'Kainuu', people: 73959 },
  { name: 'Keski-Pohjanmaa', people: 78124 },
  { name: 'Lappi', people: 117447 },
  { name: 'Länsi-Pohja', people: 61776 },
  { name: 'Pirkanmaa', people: 532261 },
  { name: 'Etelä-Pohjanmaa', people: 195583 },
  { name: 'Kanta-Häme', people: 172720 },
  { name: 'Varsinais-Suomi', people: 480626 },
  { name: 'Satakunta', people: 220398 },
  { name: 'Vaasa', people: 169741 }
];

const peopleTotal = healtCareDistricts.reduce((acc, curr) => curr.people + acc, 0);

interface InfectionDevelopmentDataItem {
  date: number;
  infections: number
};

export const getTimeSeriesData = (confirmed: Confirmed[]): {
  infectionDevelopmentData: InfectionDevelopmentDataItem[]
  infectionDevelopmentData30Days: InfectionDevelopmentDataItem[]
} => {

  const sortedData = sortBy(confirmed, 'date').map(item => ({ ...item, dateString: format(new Date(item.date), 'yyyy-MM-dd') }));


  const daysIntervalSinceFirstInfection = eachDayOfInterval({ start: new Date(sortedData[0].date), end: new Date(sortedData[sortedData.length - 1].date) });

  const infectionDevelopmentData: InfectionDevelopmentDataItem[] = []
  daysIntervalSinceFirstInfection.reduce((acc, curr) => {
    const items = sortedData.filter(item => isSameDay(new Date(item.date), curr));
    if (items) {
      infectionDevelopmentData.push({ date: curr.getTime(), infections: acc + items.length })
    } else {
      infectionDevelopmentData.push({ date: curr.getTime(), infections: acc })
    }
    return items.length ? acc + items.length : acc
  }, 0)

  const thirtyDaysAgo = sub(new Date(), { days: 30 });
  const infectionDevelopmentData30Days = infectionDevelopmentData.filter(item => item.date > thirtyDaysAgo.getTime());


  return {
    infectionDevelopmentData,
    infectionDevelopmentData30Days,
  };

}

export const getTnfectionsByDistrict = (confirmed: Confirmed[]) => {
  const groupedData = groupBy(confirmed, 'healthCareDistrict');

  const infectionsByDistrict = Object.entries(groupedData).map((value) => ({
    name: value[0],
    infections: value[1].length,
    // @ts-ignore
    people: Math.round(healtCareDistricts.find(i => i.name === value[0])?.people / peopleTotal * 100)
  }))

  const infectionsByDistrictPercentage = Object.entries(groupedData).map((value) => ({
    name: value[0],
    infections: Math.round(value[1].length / confirmed.length * 100),
    // @ts-ignore
    people: Math.round(healtCareDistricts.find(i => i.name === value[0])?.people / peopleTotal * 100),
    // @ts-ignore
    perDistrict: Math.round(value[1].length / healtCareDistricts.find(i => i.name === value[0])?.people * 100 * 10000) / 10000,
  }))

  const areas = Object.entries(groupedData).map((value) => (value[0]));
  return {
    infectionsByDistrict,
    infectionsByDistrictPercentage,
    areas
  };
}

export const getInfectionsBySourceCountry = (confirmed: Confirmed[]) => {
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

export const getInfectionsToday = (confirmed: Confirmed[]) => {
  const infectionsToday = confirmed.filter(infection => isToday(new Date(infection.date)));
  return infectionsToday.length || 0;
}

export const getNetworkGraphData = (confirmed: Confirmed[]) => {

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
  uniqueCountries.map((country, index) => filteredNodes.push({ id: country, label: country, color: `${colors[uniqueCountries.indexOf(country)]}` }))
  return {
    nodes: filteredNodes,
    edges
  };
}

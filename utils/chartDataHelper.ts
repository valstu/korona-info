import { format, sub, eachDayOfInterval, isSameDay } from 'date-fns';
import groupBy from 'lodash.groupby'
import sortBy from 'lodash.sortby'
import { Confirmed } from '../pages';

// Map data to show development of infections


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

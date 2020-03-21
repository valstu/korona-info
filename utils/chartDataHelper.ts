import { format, sub, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';
import ExponentialRegression from 'ml-regression-exponential';
import { Confirmed, Recovered, Deaths, Filter } from '../pages';

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
  '#ee2320'
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

const peopleTotal = healtCareDistricts.reduce(
  (acc, curr) => curr.people + acc,
  0
);

interface InfectionDevelopmentDataItem {
  date: number;
  infections: number | null;
  deaths: number | null;
  recovered: number | null;
  infectionsDaily: number | null;
}

interface InfectionDevelopment60DaysDataItem {
  date: number;
  infections: number | null;
}

interface InfectionDevelopmentDataObj {
  prediction60Days: InfectionDevelopment60DaysDataItem[];
  today: number;
}

export const getTimeSeriesData = (
  confirmed: Confirmed[],
  recovered: Recovered[],
  deaths: Deaths[],
  filter: Filter
): {
  infectionDevelopmentData: InfectionDevelopmentDataItem[];
  infectionDevelopmentData30Days: InfectionDevelopmentDataItem[];
} => {
  const sortedData = sortBy(confirmed, 'date').map(item => ({
    ...item,
    dateString: format(new Date(item.date), 'yyyy-MM-dd')
  }));
  const sortedDataRecoverd = sortBy(recovered, 'date').map(item => ({
    ...item,
    dateString: format(new Date(item.date), 'yyyy-MM-dd')
  }));
  const sortedDataDeaths = sortBy(deaths, 'date').map(item => ({
    ...item,
    dateString: format(new Date(item.date), 'yyyy-MM-dd')
  }));

  const daysIntervalSinceFirstInfection = eachDayOfInterval({
    start: new Date(sortedData[0].date),
    end: new Date(sortedData[sortedData.length - 1].date)
  });

  const infectionDevelopmentData: InfectionDevelopmentDataItem[] = [];
  daysIntervalSinceFirstInfection.reduce(
    (
      acc: {
        recovered: number | null;
        infections: number | null;
        deaths: number | null;
      },
      curr
    ) => {
      const items = sortedData.filter(
        item => isSameDay(new Date(item.date), curr) && filter(item)
      );
      const itemsRecovered = sortedDataRecoverd.filter(
        item => isSameDay(new Date(item.date), curr) && filter(item)
      );
      const itemsDeaths = sortedDataDeaths.filter(
        item => isSameDay(new Date(item.date), curr) && filter(item)
      );
      acc.deaths = (acc.deaths ?? 0) + itemsDeaths.length || null;
      acc.infections = (acc.infections ?? 0) + items.length || null;
      acc.recovered = (acc.recovered ?? 0) + itemsRecovered.length || null;

      infectionDevelopmentData.push({
        date: curr.getTime(),
        infectionsDaily: items.length,
        ...acc
      });

      return acc;
    },
    { infections: null, deaths: null, recovered: null }
  );

  const thirtyDaysAgo = sub(new Date(), { days: 30 });
  const infectionDevelopmentData30Days = infectionDevelopmentData.filter(
    item => item.date > thirtyDaysAgo.getTime()
  );

  return {
    infectionDevelopmentData,
    infectionDevelopmentData30Days
  };
};

export const getPredictionData = (
  confirmed: Confirmed[],
  deaths: Deaths[],
  recovered: Recovered[],
  filter: Filter
): InfectionDevelopmentDataObj => {
  const currentData30Days = getTimeSeriesData(
    confirmed,
    recovered,
    deaths,
    filter
  ).infectionDevelopmentData30Days;

  const indexes = currentData30Days.map((d, i) => i + 1);
  const infections = currentData30Days.map(d => d.infections);

  const x = indexes;
  const y = infections;

  const regression = new ExponentialRegression(x, y);

  const prediction60Days = Array.from(new Array(60)).map((x, i) => {
    const date = new Date(currentData30Days[0].date);

    date.setDate(date.getDate() + i);
    return {
      date: date.getTime(),
      infections:
        Math.round(regression.predict(i)) === 0
          ? null
          : Math.round(regression.predict(i))
    };
  });

  return { prediction60Days, today: prediction60Days[29].date };
};

export const getTnfectionsByDistrict = (confirmed: Confirmed[]) => {
  const groupedData = groupBy(confirmed, 'healthCareDistrict');

  const infectionsByDistrict = Object.entries(groupedData).map(value => ({
    name: value[0],
    infections: value[1].length,
    people: Math.round(
      // @ts-ignore
      (healtCareDistricts.find(i => i.name === value[0])?.people /
        peopleTotal) *
        100
    )
  }));

  const infectionsByDistrictPercentage = Object.entries(groupedData).map(
    value => ({
      name: value[0],
      infections: Math.round((value[1].length / confirmed.length) * 100),
      people: Math.round(
        // @ts-ignore
        (healtCareDistricts.find(i => i.name === value[0])?.people /
          peopleTotal) *
          100
      ),
      perDistrict:
        Math.round(
          (value[1].length /
            // @ts-ignore
            healtCareDistricts.find(i => i.name === value[0])?.people) *
            100 *
            10000
        ) / 10000
    })
  );

  const areas = Object.entries(groupedData).map(value => value[0]);
  return {
    infectionsByDistrict,
    infectionsByDistrictPercentage,
    areas
  };
};

export const getInfectionsBySourceCountry = (confirmed: Confirmed[]) => {
  const groupedData = groupBy(confirmed, 'infectionSourceCountry');

  const infectionsBySourceCountry = Object.entries(groupedData).map(value => ({
    name: value[0] === 'null' ? 'Ei tiedossa' : value[0],
    infections: value[1].length
  }));

  const areas = Object.entries(groupedData).map(value => value[0]);
  return {
    infectionsBySourceCountry,
    areas
  };
};

const getGroup = (
  infection: Confirmed,
  confirmed: Confirmed[]
): string | null => {
  if (typeof infection.infectionSource === 'number') {
    const item = confirmed.find(
      i => Number(i.id) === infection.infectionSource
    );
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
};

export const getInfectionsToday = (confirmed: Confirmed[]) => {
  const infectionsToday = confirmed.filter(infection =>
    isToday(new Date(infection.date))
  );
  return infectionsToday.length || 0;
};

export const getNetworkGraphData = (confirmed: Confirmed[]) => {
  const infectionSources = Array.from(
    new Set(
      confirmed
        .filter(i => typeof i.infectionSource === 'number')
        .map(inf => inf.infectionSource)
    )
  );

  const uniqueCountries = Array.from(
    new Set(
      confirmed
        .filter(i => !!i.infectionSourceCountry)
        .map(inff => inff.infectionSourceCountry)
    )
  );

  const allNodes = confirmed.map((infection, index) => ({
    index: index + 1,
    ...infection,
    id: Number(infection.id),
    label: `#0${index + 1}`,
    // group: getGroup(infection, confirmed),
    color: `${
      colors[uniqueCountries.indexOf(infection.infectionSourceCountry)]
    }`
  }));
  const nodes = allNodes.filter(
    i =>
      infectionSources.includes(i.id) || typeof i.infectionSource === 'number'
  );
  // @ts-ignore
  const edges = allNodes.map(i => ({
    from:
      typeof i.infectionSource === 'number'
        ? i.infectionSource
        : i.infectionSourceCountry,
    to: i.id
  }));
  const filteredNodes = allNodes.filter(
    i => !!i.infectionSourceCountry || typeof i.infectionSource === 'number'
  );
  uniqueCountries.map((country, index) =>
    filteredNodes.push({
      // @ts-ignore
      id: country,
      // @ts-ignore
      label: country,
      color: `${colors[uniqueCountries.indexOf(country)]}`
    })
  );
  return {
    nodes: filteredNodes,
    edges
  };
};

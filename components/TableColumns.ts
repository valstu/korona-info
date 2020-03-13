import { format } from 'date-fns';

export const infectionColumns = [
  // {
  //   Header: 'Id',
  //   accessor: 'id',
  //   Cell: ({ cell: { value } }: any) => `#${value}`
  // },
  {
    Header: 'Päiväys',
    accessor: 'date',
    minWidth: '20%',
    Cell: ({ cell: { value } }: any) => format(new Date(value), 'dd.MM.yyyy - HH:mm')
  },
  {
    Header: 'Sairaanhoitopiiri',
    accessor: 'healthCareDistrict',
  },
  {
    Header: 'Maa',
    accessor: 'infectionSourceCountry',
  },
  {
    Header: 'Tartunnan lähde',
    accessor: 'infectionSource',
  },
]

import { format } from 'date-fns';

export const infectionColumns = [
  // {
  //   Header: 'ID',
  //   accessor: 'id',
  // },
  {
    Header: 'Päiväys',
    accessor: 'date',
    minWidth: '20%',
    Cell: ({ cell: { value } }: any) => format(new Date(value), 'dd.MM.yyyy')
  },
  {
    Header: 'Sairaanhoitopiiri',
    accessor: 'healthCareDistrict',
  },
  {
    Header: 'Tartuntamaa',
    accessor: 'infectionSourceCountry',
  },
  {
    Header: 'Tartunnan lähde',
    accessor: 'infectionSource',
  },
]

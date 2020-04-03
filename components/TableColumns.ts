import { format } from 'date-fns';

export const infectionColumns = [
  {
    Header: 'Jär.nro',
    accessor: 'index',
    Cell: ({ cell: { value } }: any) => {
      return value;
    }
  },
  {
    Header: 'Päiväys',
    accessor: 'date',
    minWidth: '20%',
    Cell: ({ cell: { value } }: any) =>
      format(new Date(value), 'dd.MM.yyyy - HH:mm')
  },
  {
    Header: 'Sair.hoitopiiri',
    accessor: 'healthCareDistrict'
  }
];

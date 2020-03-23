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
    Header: 'Id',
    accessor: 'id',
    Cell: ({ cell }: any) => {
      return `#0${cell.value}`;
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
  },
  {
    Header: 'Maa',
    accessor: 'infectionSourceCountry'
  },
  {
    Header: 'Tartunnan lähde',
    accessor: 'infectionSource',
    Cell: ({ cell: { value } }: any) => {
      if (value === 'unknown') {
        return 'Ei tiedossa';
      }
      if (value === 'related to earlier') {
        return 'Liittyy aiempaan';
      }
      return `#0${value}`;
    }
  }
];

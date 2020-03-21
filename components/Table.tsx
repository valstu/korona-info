import React from 'react';
import styled from '@emotion/styled';
import { useTable } from 'react-table';

const Styles = styled.div`
  /* padding: 1rem; */
  -webkit-overflow-scrolling: touch;
  table {
    border-spacing: 0;
    border-bottom: solid 1px rgba(102, 119, 136, 0.15);
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th {
      border-top: solid 1px white;
      position: sticky;
      top: -1px;
      background: white;
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem 1rem;
      text-align: left;
      border-bottom: solid 1px rgba(102, 119, 136, 0.15);
      border-right: 0px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

interface TableProps {
  columns: any;
  data: any;
  height?: number;
}

const Table: React.FC<TableProps> = ({ columns, data, height }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <Styles style={{ height: `${height}px`, overflowY: 'scroll' }}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};

export default Table;

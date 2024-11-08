import React, { useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import Papa from 'papaparse';

const formatNumber = (value) => {
  if (typeof value === 'number') {
    return value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }
  return value;
};

export default function StockTable({ queryConditions }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.csv');
      const text = await response.text();

      Papa.parse(text, {
        header: true,
        complete: (result) => {
          const normalizedData = result.data.map(row => ({
            name: row["Ticker"],
            marketCap: parseFloat(row["Market Capitalization (B)"]),
            peRatio: parseFloat(row["P/E Ratio"]),
            roe: parseFloat(row["ROE (%)"]),
            debtToEquity: parseFloat(row["Debt-to-Equity Ratio"]),
            dividendYield: parseFloat(row["Dividend Yield (%)"]),
            revenueGrowth: parseFloat(row["Revenue Growth (%)"]),
            epsGrowth: parseFloat(row["EPS Growth (%)"]),
            currentRatio: parseFloat(row["Current Ratio"]),
            grossMargin: parseFloat(row["Gross Margin (%)"])
          }));
          setData(normalizedData);
        }
      });
    };

    fetchData();
  }, []);

  const filteredData = React.useMemo(() => {
    if (!queryConditions || queryConditions.length === 0) return data;

    return data.filter(stock => {
      return queryConditions.every(condition => {
        const stockValue = stock[condition.parameter];
        const queryValue = condition.value;

        switch (condition.operator) {
          case '>':
            return stockValue > queryValue;
          case '<':
            return stockValue < queryValue;
          case '=':
            return Math.abs(stockValue - queryValue) < 0.0001; // For floating point comparison
          default:
            return true;
        }
      });
    });
  }, [data, queryConditions]);

  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Market Cap (₹Cr)', accessor: 'marketCap', Cell: ({ value }) => formatNumber(value) },
      { Header: 'P/E Ratio', accessor: 'peRatio', Cell: ({ value }) => formatNumber(value) },
      { Header: 'ROE (%)', accessor: 'roe', Cell: ({ value }) => formatNumber(value) },
      { Header: 'D/E Ratio', accessor: 'debtToEquity', Cell: ({ value }) => formatNumber(value) },
      { Header: 'Div Yield (%)', accessor: 'dividendYield', Cell: ({ value }) => formatNumber(value) },
      { Header: 'Rev Growth (%)', accessor: 'revenueGrowth', Cell: ({ value }) => formatNumber(value) },
      { Header: 'EPS Growth (%)', accessor: 'epsGrowth', Cell: ({ value }) => formatNumber(value) },
      { Header: 'Current Ratio', accessor: 'currentRatio', Cell: ({ value }) => formatNumber(value) },
      { Header: 'Gross Margin (%)', accessor: 'grossMargin', Cell: ({ value }) => formatNumber(value) },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span className='text-blue-500 text-base'>{column.render('Header')}</span>
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ChevronDownIcon className="h-4 w-4" />
                          ) : (
                            <ChevronUpIcon className="h-4 w-4" />
                          )
                        ) : null}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {page.map(row => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map(cell => (
                    <td
                      key={cell.column.id}
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
          <span className="text-sm text-gray-700">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
        </div>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="px-2 py-1 border rounded-md"
        >
          {[10, 20, 30, 40, 50].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
// todo: error control level api and component
// todo: add tests

import { CurrenciesMockRepository } from '../models/currency/repositories/CurrenciesMockRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import { useMemo } from 'react'
import {
  createChangesRatioMatrix,
  createTableColumns,
  getCurrencyChangesVector,
  getCurrencyNames,
} from '../utils/functions'
import { useTable } from 'react-table'
import { MOCK_DATA } from '../utils/mock-data'

export default function Index() {
  const currenciesRepository = new CurrenciesMockRepository()
  const { useGetList } = useRepository(currenciesRepository)
  // const { data: currenciesDataList, isLoading } = useGetList()
  const { data: currenciesDataList } = MOCK_DATA

  const currenciesChangesVector = getCurrencyChangesVector(currenciesDataList)
  const tableData = createChangesRatioMatrix(currenciesChangesVector)
  const currenciesNamesVector = getCurrencyNames(currenciesDataList)
  // const tableColumns = useMemo(() => currenciesNamesVector, [])
  const tableColumns = useMemo(
    () => createTableColumns(currenciesNamesVector),
    []
  )
  // const tableColumns = useMemo(
  //   () => [
  //     {
  //       Header: 'Column 1',
  //       accessor: '1', // accessor is the "key" in the data
  //     },
  //   ],
  //   []
  // )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableColumns, data: tableData })
  console.log(tableColumns)

  return (
    <div>
      {/*
      {isLoading ? (
        'Loading...'
      ) : (
        <pre>{JSON.stringify(currenciesDataList, null, 2)}</pre>
      )}
*/}

      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/*Apply the table body props*/}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

// todo: remove
// export async function getStaticProps() {
//   console.log(process.env)
//   return {
//     props: {
//       products: [],
//     },
//   }
// }

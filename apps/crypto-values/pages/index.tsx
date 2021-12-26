// todo: error control level api and component
// todo: add tests

import { CurrenciesMockRepository } from '../models/currency/repositories/CurrenciesMockRepository'
import { useRepository } from '@crypto-values/react-query-crud'
import React, { useCallback, useRef, Fragment } from 'react'
import {
  createChangesRatioMatrix,
  createTableColumns,
  getCurrencyChangesVector,
  getCurrencyNames,
} from '../utils/functions'
import { MOCK_DATA } from '../utils/mock-data'
import { useVirtual } from 'react-virtual'

function GridVirtualizerFixed() {
  const parentRef = useRef()

  const rowVirtualizer = useVirtual({
    size: 10000,
    parentRef,
    estimateSize: useCallback(() => 35, []),
    overscan: 5,
  })

  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: 10000,
    parentRef,
    estimateSize: useCallback(() => 100, []),
    overscan: 5,
  })

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `500px`,
          width: `500px`,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: `${columnVirtualizer.totalSize}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <Fragment key={virtualRow.index}>
              {columnVirtualizer.virtualItems.map((virtualColumn) => (
                <div
                  key={virtualColumn.index}
                  className={
                    virtualColumn.index % 2
                      ? virtualRow.index % 2 === 0
                        ? 'ListItemOdd'
                        : 'ListItemEven'
                      : virtualRow.index % 2
                      ? 'ListItemOdd'
                      : 'ListItemEven'
                  }
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${virtualColumn.size}px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                  }}
                >
                  Cell {virtualRow.index}, {virtualColumn.index}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

export default function Index() {
  const currenciesRepository = new CurrenciesMockRepository()
  const { useGetList } = useRepository(currenciesRepository)
  const { data: currenciesDataList, isLoading } = useGetList()
  // const { data: currenciesDataList } = MOCK_DATA

  // const currenciesChangesVector = getCurrencyChangesVector(currenciesDataList)
  // const tableData = createChangesRatioMatrix(currenciesChangesVector)
  // const currenciesNamesVector = getCurrencyNames(currenciesDataList)
  // const tableColumns = useMemo(
  //   () => createTableColumns(currenciesNamesVector),
  //   []
  // )

  // console.log(currenciesChangesVector)

  return (
    <div>
      {/*
      {isLoading ? (
        'Loading...'
      ) : (
        <pre>{JSON.stringify(currenciesDataList, null, 2)}</pre>
      )}
*/}

      <h3>Grid</h3>
      <GridVirtualizerFixed />
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

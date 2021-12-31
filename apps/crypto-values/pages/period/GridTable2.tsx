// todo: add tool tip to first row and column with "change value" text
import { AutoSizer, MultiGrid } from 'react-virtualized'
import styles from './gridtable.module.css'
import { useState } from 'react'
import css from './gridtable.module.css'

const TABLE_STYLE = {
  border: '5px solid #ddd',
}

const STYLE_FIRST_CELL = {
  background: 'lightgrey',
}

const STYLE_FIRST_ROW = {
  background: '#f7f7f7',
  borderBottom: '1px solid #aaa',
}
const STYLE_FIRST_COLUMN = {
  backgroundColor: '#f7f7f7',
}

export default function GridTable2({ tableData }) {
  // todo: remove
  // console.log(tableData[][0])
  const dimension = tableData?.length
  const [state, setStateValues] = useState({
    fixedColumnCount: 1,
    fixedRowCount: 1,
    scrollToColumn: 0,
    scrollToRow: 0,
  })

  const onResetScroll = () => {}

  const _cellRenderer = ({ columnIndex, key, rowIndex, style }) => (
    <div className={styles.cell} key={key} style={style}>
      {rowIndex === 0 && (
        <div>
          {tableData[rowIndex][columnIndex].s}
          <div className={css.ch}>{tableData[rowIndex][columnIndex].ch}</div>
        </div>
      )}

      {columnIndex === 0 && (
        <div>
          {tableData[rowIndex][columnIndex].s}
          <div className={css.ch}>{tableData[rowIndex][columnIndex].ch}</div>
        </div>
      )}

      {rowIndex !== 0 && columnIndex !== 0 && (
        <div>{tableData[rowIndex][columnIndex]}</div>
      )}
    </div>
  )

  // console.table(tableData)
  // todo: remove
  // console.log('render----------------------------')
  // console.log(getFirstColumn(tableData))
  console.log(tableData)
  console.table(tableData)
  console.log('process.browser', process.browser)

  return (
    <>
      <AutoSizer disableHeight>
        {({ width }) => (
          <MultiGrid
            {...state}
            cellRenderer={_cellRenderer}
            columnWidth={75}
            columnCount={dimension}
            rowHeight={50}
            rowCount={dimension}
            height={500}
            width={width}
            enableFixedColumnScroll
            enableFixedRowScroll
            hideTopRightGridScrollbar
            hideBottomLeftGridScrollbar
            hideBottomRightGridScrollbar
            style={TABLE_STYLE}
            styleTopLeftGrid={STYLE_FIRST_CELL}
            styleTopRightGrid={STYLE_FIRST_ROW}
            styleBottomLeftGrid={STYLE_FIRST_COLUMN}
          />
        )}
      </AutoSizer>
      <button onClick={onResetScroll}>Reset Scroll Bars</button>
    </>
  )
}

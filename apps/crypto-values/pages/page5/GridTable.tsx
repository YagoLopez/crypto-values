// todo: add tool tip to first row and column with "change value" text
import { AutoSizer, MultiGrid } from 'react-virtualized'
import styles from './gridtable.module.css'
import { useState } from 'react'

const TABLE_STYLE = {
  border: '5px solid #ddd',
}
const STYLE_FIRST_CELL = {
  background: '#f7f7f7',
  borderBottom: '2px solid #aaa',
}
const STYLE_FIRST_ROW = {
  background: '#f7f7f7',
  borderBottom: '1px solid #aaa',
}
const STYLE_FIRST_COLUMN = {
  backgroundColor: '#f7f7f7',
}

const STYLE_FIRST_ROW_CONTENT = {
  height: 'inherit',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export default function Page5({ tableData }) {
  const dimension = tableData?.length
  const [state, setStateValues] = useState({
    fixedColumnCount: 1,
    fixedRowCount: 1,
    scrollToColumn: 0,
    scrollToRow: 0,
  })

  const onResetScroll = () => {
  }

  const _cellRenderer = ({ columnIndex, key, rowIndex, style }) => (
    <div className={styles.cell} key={key} style={style}>
      {rowIndex === 0 && (
        <div data-id="first-row" style={STYLE_FIRST_ROW_CONTENT}>
          {tableData[rowIndex][columnIndex].s}
          <br />
          {tableData[rowIndex][columnIndex].ch}
        </div>
      )}
      {columnIndex === 0 && (
        <div data-id="first-column" style={STYLE_FIRST_ROW_CONTENT}>
          {tableData[rowIndex][columnIndex].s}
          <br />
          {tableData[rowIndex][columnIndex].ch}
        </div>
      )}
      {rowIndex !== 0 && columnIndex !== 0 && (
        <span data-id="submatrix" style={STYLE_FIRST_ROW_CONTENT}>
          {tableData[rowIndex][columnIndex]}
        </span>
      )}
    </div>
  )

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

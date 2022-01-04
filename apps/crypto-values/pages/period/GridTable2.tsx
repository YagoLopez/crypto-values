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

export const getStyleCell3 = (value: number): Record<string, string> => {
  let color, backgroundColor, opacity
  const rgbRed = '255, 0, 0'
  const rgbGreen = '144, 238, 144'
  if (value > 0) {
    backgroundColor = rgbGreen
    color = '#38b438'
  }
  if (value < 0) {
    backgroundColor = rgbRed
    color = 'brown'
  }
  if (value >= -0.09 && value < 0) {
    opacity = 0.1
  } else if (value > 0 && value <= 0.09) {
    opacity = 0.1
  } else {
    opacity = Math.abs(value)
  }
  return {
    color,
    backgroundColor: `rgb(${backgroundColor}, ${opacity})`,
    textShadow: '1px 1px 4px grey',
  }
}

export default function GridTable2({ tableData }) {
  const dimension = tableData?.length
  const [state, setStateValues] = useState({
    fixedColumnCount: 1,
    fixedRowCount: 1,
    scrollToColumn: 0,
    scrollToRow: 0,
  })

  const onResetScroll = () => {}

  const _cellRenderer = ({ columnIndex: j, key, rowIndex: i, style }) => (
    <div
      className={styles.cell}
      key={key}
      style={{ ...style, ...getStyleCell3(tableData[i][j]) }}
    >
      {i === 0 && (
        <div>
          {tableData[i][j].s}
          <div className={css.ch}>{tableData[i][j].ch}</div>
        </div>
      )}

      {j === 0 && (
        <div>
          {tableData[i][j].s}
          <div className={css.ch}>{tableData[i][j].ch}</div>
        </div>
      )}

      {i !== 0 && j !== 0 && <div>{tableData[i][j]}</div>}
    </div>
  )

  // console.table(tableData)
  // todo: remove
  // console.log('render----------------------------')
  // console.log(getFirstColumn(tableData))
  // console.log(tableData)
  // console.table(tableData)

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

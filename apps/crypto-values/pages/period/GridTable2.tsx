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

const getStyleCell = (
  start: number = 0,
  end: number = 120,
  value
): { backgroundColor: string } => {
  let colorComponent = (start + (end - start) * value) / 100
  let backgroundColor = `hsl( ${colorComponent}, 100%, 50% )`
  console.log(backgroundColor)
  return { backgroundColor }
}

const getStyleCell2 = (
  start: number = 0,
  end: number = 120,
  value
): { backgroundColor: string } => {
  let colorComponent = (start + (end - start) * value) / 100
  let backgroundColor = `hsl(calc(${value} * 1.2), 100%, 50%)`
  console.log(backgroundColor)
  return { backgroundColor: `hsl(calc(${value} * 1.2), 100%, 50%)` }
}

export const getStyleCell3 = (value: number): Record<string, string> => {
  let color, backgroundColor, opacity
  if (value > 0) {
    color = 'green'
  }
  if (value < 0) {
    color = 'red'
  }
  if (value < 0 && value >= -0.09) {
    opacity = 0.1
  } else if (value > 0 && value <= 0.09) {
    opacity = 0.1
  } else {
    opacity = Math.abs(value)
  }
  return { color, opacity }
}

// todo: review
function redYellowGreen(min, max, value) {
  var green_max = 220
  var red_max = 220
  var red = 0
  var green = 0
  var blue = 0

  if (value < max / 2) {
    red = red_max
    green = Math.round((value / (max / 2)) * green_max)
  } else {
    green = green_max
    red = Math.round((1 - (value - max / 2) / (max / 2)) * red_max)
  }

  var to_return: any = {}
  to_return.red = red
  to_return.green = green
  to_return.blue = blue

  return to_return
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

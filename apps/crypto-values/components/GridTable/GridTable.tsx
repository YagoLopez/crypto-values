import { useRef, useState } from 'react'
import { AutoSizer, MultiGrid } from 'react-virtualized'
import styles from './gridtable.module.css'
import Button from '@mui/material/Button'
import SyncIcon from '@mui/icons-material/Sync'

const TABLE_STYLE = {
  border: '1px solid #ddd',
}

const STYLE_FIRST_CELL = {
  background: 'hsl(0deg 0% 97%)',
}

const STYLE_FIRST_ROW = {
  background: '#f7f7f7',
  borderBottom: '1px solid #aaa',
}
const STYLE_FIRST_COLUMN = {
  backgroundColor: '#f7f7f7',
}

const resetbtn = {
  height: '36px',
  margin: '15px',
}

export const getCellStyle = (value: number): Record<string, string> => {
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
    textShadow: '2px 2px 4px grey',
  }
}

export default function GridTable({ tableData }) {
  const dimension = tableData?.length
  const gridRef = useRef(null)
  const [state] = useState({
    fixedColumnCount: 1,
    fixedRowCount: 1,
    scrollToColumn: 0,
    scrollToRow: 0,
  })

  const onResetScroll = () => {
    gridRef.current.setState((prevState) => {
      return {
        ...prevState,
        scrollLeft: 0,
        scrollTop: 0,
      }
    })
  }

  const _cellRenderer = ({ columnIndex: j, key, rowIndex: i, style }) => (
    <div
      className={styles.cell}
      key={key}
      style={{ ...style, ...getCellStyle(tableData[i][j]) }}
    >
      {i === 0 && (
        <div>
          {tableData[i][j].s}
          <div className={styles.ch}>{tableData[i][j].ch}</div>
        </div>
      )}

      {j === 0 && (
        <div>
          {tableData[i][j].s}
          <div className={styles.ch}>{tableData[i][j].ch}</div>
        </div>
      )}
      {i !== 0 && j !== 0 && <div>{tableData[i][j]}</div>}
    </div>
  )

  return (
    <div id="table" className={[styles.gridTable, 'fade-in'].join(' ')}>
      <AutoSizer disableHeight>
        {({ width }) => (
          <MultiGrid
            ref={gridRef}
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
      <Button
        style={resetbtn}
        variant="contained"
        color="primary"
        onClick={onResetScroll}
        startIcon={<SyncIcon />}
      >
        Reset Scroll Bars
      </Button>
    </div>
  )
}

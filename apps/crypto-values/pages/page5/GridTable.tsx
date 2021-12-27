import { AutoSizer, MultiGrid } from 'react-virtualized'
import styles from './gridtable.module.css'
import { useState } from 'react'

const STYLE = {
  border: '1px solid #ddd',
}
const STYLE_BOTTOM_LEFT_GRID = {
  // borderRight: "2px solid #aaa",
  backgroundColor: '#f7f7f7',
}
const STYLE_TOP_LEFT_GRID = {
  borderBottom: '2px solid #aaa',
  // borderRight: "2px solid #aaa",
  fontWeight: 'bold',
}
const STYLE_TOP_RIGHT_GRID = {
  borderBottom: '1px solid #aaa',
  fontWeight: 'bold',
}

export default ({ tableData }) => {
  const [state] = useState({
    fixedColumnCount: 1,
    fixedRowCount: 1,
    scrollToColumn: 0,
    scrollToRow: 0,
  })

  const _cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    return (
      <div className={styles.Cell} key={key} style={style}>
        {rowIndex === 0 ? (
          <div>
            Header
            <br /> {`${columnIndex} - ${rowIndex}`}
          </div>
        ) : (
          <span>{tableData?.[rowIndex]?.[columnIndex]}</span>
        )}
      </div>
    )
  }

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <MultiGrid
          {...state}
          cellRenderer={_cellRenderer}
          columnWidth={75}
          columnCount={tableData?.length}
          enableFixedColumnScroll
          enableFixedRowScroll
          height={500}
          rowHeight={70}
          rowCount={tableData?.length}
          style={STYLE}
          styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
          styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
          styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
          width={width}
          hideTopRightGridScrollbar
          hideBottomLeftGridScrollbar
          hideBottomRightGridScrollbar
        />
      )}
    </AutoSizer>
  )
}

/** @flow */
import * as React from 'react'
import { AutoSizer, MultiGrid } from 'react-virtualized'
import styles from './gridtable.module.css'

// const STYLE = {
//   border: "1px solid #ddd"
// };
// const STYLE_BOTTOM_LEFT_GRID = {
//   // borderRight: "2px solid #aaa",
//   backgroundColor: "#f7f7f7"
// };
// const STYLE_TOP_LEFT_GRID = {
//   borderBottom: "2px solid #aaa",
//   // borderRight: "2px solid #aaa",
//   fontWeight: "bold"
// };
// const STYLE_TOP_RIGHT_GRID = {
//   borderBottom: "1px solid #aaa",
//   fontWeight: "bold"
// };

export default function Page4() {
  const [state] = React.useState({
    fixedColumnCount: 1,
    fixedRowCount: 1,
    scrollToColumn: 0,
    scrollToRow: 0,
  })

  const _cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    return (
      <div className={styles.cell} key={key} style={style}>
        {rowIndex === 0 ? (
          `Header: ${columnIndex}- ${rowIndex}`
        ) : (
          <span>{`${columnIndex} - ${rowIndex}`}</span>
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
          columnCount={50}
          enableFixedColumnScroll
          enableFixedRowScroll
          height={500}
          rowHeight={70}
          rowCount={100}
          // style={STYLE}
          // styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
          // styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
          // styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
          width={width}
          hideTopRightGridScrollbar
          hideBottomLeftGridScrollbar
          hideBottomRightGridScrollbar
        />
      )}
    </AutoSizer>
  )
}

import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import Grid from '@material-ui/core/Grid'

import Controls from './Controls'
import CellsGrid from './CellsGrid'
import Header from './Header'
import Description from './Description'

const Root = styled(Grid)`
  flex-grow: 1;
  margin-top: 2.5em !important;
`

const ButtonRow = styled(Grid)`
  text-align: left;
  justify-content: left;
`

const CustomControls = styled(Controls)`
  text-align: left;
  justify-content: left;
`

const Board = styled(Grid)`
  display: inline-block;
  text-align: left;
`

const InnerBoard = styled.div`
  display: grid;
  margin-left: 1.5rem;
  ${({ width, height, columns, rows }) => css`
    width: ${width}px;
    height: ${height}px;
    grid-template-rows: repeat(${rows}, 1fr);
    grid-template-columns: repeat(${columns}, 1fr);
  `}
`

// main app consists of header, buttons, description, and the grid of cells
const Game = props => {
  const { n, width, length, cells } = props.state

  // Don't display margins of two cells on all sides
  const cells_to_display = useMemo(
    () =>
      cells.slice(2 * n, -2 * n).filter(c => {
        const { key } = c
        const mod = key % n
        return mod !== n - 2 && mod !== n - 1 && mod !== 0 && mod !== 1
      }),
    [cells, n]
  )

  const cellsPerRow = useMemo(() => Math.sqrt(cells_to_display.length), [
    cells_to_display.length
  ])

  return (
    <div>
      <Header />
      <Root container spacing={1}>
        <ButtonRow item lg={4}>
          <CustomControls
            randomizeGrid={props.randomizeGrid}
            clearGrid={props.clearGrid}
            startTicker={props.startTicker}
            stopTicker={props.stopTicker}
          />
          <Description />
        </ButtonRow>
        <Board item lg={8}>
          <InnerBoard
            columns={cellsPerRow}
            rows={cellsPerRow}
            width={width}
            height={width}
          >
            <CellsGrid
              cells={cells_to_display}
              width={width}
              length={length}
              activate={props.activate}
            />
          </InnerBoard>
        </Board>
      </Root>
    </div>
  )
}

export default Game
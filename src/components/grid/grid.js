import React from 'react'
import Node from './node/node'
import './grid.css'
import { Button, IconButton } from '@material-ui/core'
import { bfs } from '../../algorithms/bfs'

const START_ROW = 3
const START_COL = 2
const TARGET_ROW = 20
const TARGET_COL = 80

export const TOTAL_ROWS = 30
export const TOTAL_COLS = 120

class Grid extends React.Component {
	constructor() {
		super()
		this.state = {
			grid: []
		}
	}
	componentDidMount() {
		const grid = genInitialGrid()
		this.setState({ grid })
	}

	animateBFS(nodes) {
		for (let i = 0; i < nodes.length; ++i) {
			const node = nodes[i]
			console.log('test')
			setTimeout(() => {
				document.getElementById(`node-${node.row}-${node.col}`).className =
					'node node-visited'
			}, 10 * i)
		}
	}

	visualize() {
		const { grid } = this.state
		const startNode = grid[START_ROW][START_ROW]
		const targetNode = grid[TARGET_ROW][TARGET_COL]
		const visited = bfs(grid, startNode, targetNode)
		this.animateBFS(visited)
	}

	render() {
		const { grid } = this.state
		return (
			<div>
				<Button
					variant='contained'
					color='primary'
					onClick={() => this.visualize()}
				>
					Visualize
				</Button>
				<div className='grid'>
					{grid.map((row, rowIdx) => {
						return (
							<div key={rowIdx}>
								{row.map((node, nodeIdx) => {
									const {
										row,
										col,
										isStart,
										isTarget,
										isVisited,
										isWall
									} = node
									return (
										<Node
											row={row}
											col={col}
											key={nodeIdx}
											isStart={isStart}
											isTarget={isTarget}
											isVisited={isVisited}
											isWall={isWall}
										></Node>
									)
								})}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

const genInitialGrid = () => {
	const grid = []
	for (let i = 0; i < TOTAL_ROWS; ++i) {
		const row = []
		for (let j = 0; j < TOTAL_COLS; ++j) {
			row.push(createNode(i, j))
		}
		grid.push(row)
	}
	return grid
}

const createNode = (row, col) => {
	return {
		row,
		col,
		isStart: row == START_ROW && col == START_COL,
		isTarget: row == TARGET_ROW && col == TARGET_COL,
		isVisited: false,
		isWall: false
	}
}

export default Grid

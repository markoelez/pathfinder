import React from 'react'
import Node from './node/node'
import './grid.css'
import { Button, IconButton } from '@material-ui/core'
import { bfs, getShortestPath } from '../../algorithms/bfs'

export const TOTAL_ROWS = 27
export const TOTAL_COLS = 70

const SPEED_MULTIPLIER = 2

class Grid extends React.Component {
	constructor() {
		super()
		let START_ROW = Math.floor(Math.random() * (TOTAL_ROWS + 1))
		let START_COL = Math.floor(Math.random() * (TOTAL_COLS + 1))
		let TARGET_ROW = Math.floor(Math.random() * (TOTAL_ROWS + 1))
		let TARGET_COL = Math.floor(Math.random() * (TOTAL_COLS + 1))
		this.state = {
			start: [START_ROW, START_COL],
			target: [TARGET_ROW, TARGET_COL],
			grid: [],
			mouseIsPressed: false
		}
	}
	componentDidMount() {
		const { start, target } = this.state
		const grid = genInitialGrid(start, target)
		this.setState({ grid: grid })
	}

	handleMouseDown(row, col) {
		const newGrid = this.toggleWall(this.state.grid, row, col)
		this.setState({ grid: newGrid, mouseIsPressed: true })
	}

	handleMouseEnter(row, col) {
		if (!this.state.mouseIsPressed) return
		const newGrid = this.toggleWall(this.state.grid, row, col)
		this.setState({ grid: newGrid })
	}

	handleMouseUp() {
		this.setState({ mouseIsPressed: false })
	}

	getMaze() {
		// const { start, target } = this.state
		// const grid = getWalledGrid()
		// const startNode = grid[start[0]][start[1]]
		// const targetNode = grid[target[0]][target[1]]
		// const visited = bfs(grid, startNode, targetNode)
		// for (let i = 0; i < visited.length; ++i) {
		// 	const node = visited[i]
		// 	document.getElementById(`node-${node.row}-${node.col}`).className =
		// 		'node node-empty'
		// }
	}

	resetGrid() {
		const grid = getNewGrid()
		for (let i = 0; i < grid.length; ++i) {
			for (let j = 0; j < grid[0].length; ++j) {
				document.getElementById(`node-${i}-${j}`).className = 'node node-empty'
			}
		}

		var start_row = Math.floor(Math.random() * (TOTAL_ROWS + 1))
		var start_col = Math.floor(Math.random() * (TOTAL_COLS + 1))
		var target_row = Math.floor(Math.random() * (TOTAL_ROWS + 1))
		var target_col = Math.floor(Math.random() * (TOTAL_COLS + 1))

		while (start_row == target_row && start_col == target_col) {
			target_row = Math.floor(Math.random() * (TOTAL_ROWS + 1))
			target_col = Math.floor(Math.random() * (TOTAL_COLS + 1))
		}

		document.getElementById(`node-${start_row}-${start_col}`).className =
			'node node-start'
		document.getElementById(`node-${target_row}-${target_col}`).className =
			'node node-target'

		this.setState({
			grid: grid,
			start: [start_row, start_col],
			target: [target_row, target_col]
		})
	}

	toggleWall(grid, row, col) {
		const newGrid = grid.slice()
		newGrid[row][col].isWall = true
		return newGrid
	}

	animateBFS(nodes, shortestOrder) {
		for (let i = 0; i <= nodes.length; ++i) {
			if (i === nodes.length) {
				setTimeout(() => {
					this.animateShortestPath(shortestOrder)
				}, SPEED_MULTIPLIER * i)
				return
			}
			const node = nodes[i]
			console.log('test')
			setTimeout(() => {
				document.getElementById(`node-${node.row}-${node.col}`).className =
					'node node-visited'
			}, SPEED_MULTIPLIER * i)
		}
	}

	animateShortestPath(shortestOrder) {
		for (let i = 0; i < shortestOrder.length; i++) {
			setTimeout(() => {
				const node = shortestOrder[i]
				document.getElementById(`node-${node.row}-${node.col}`).className =
					'node node-shortest-path'
			}, SPEED_MULTIPLIER * i)
		}
	}

	visualize() {
		const { grid, start, target } = this.state
		const startNode = grid[start[0]][start[1]]
		const targetNode = grid[target[0]][target[1]]
		const visited = bfs(grid, startNode, targetNode)
		const shortestOrder = getShortestPath(targetNode)
		this.animateBFS(visited, shortestOrder)
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
				<Button
					variant='contained'
					color='secondary'
					onClick={() => this.resetGrid()}
				>
					Clear
				</Button>
				<Button
					variant='contained'
					color='secondary'
					onClick={() => this.getMaze()}
				>
					Get Maze
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
											onMouseDown={(row, col) => this.handleMouseDown(row, col)}
											onMouseEnter={(row, col) =>
												this.handleMouseEnter(row, col)
											}
											onMouseUp={() => this.handleMouseUp()}
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

const genInitialGrid = (start, target) => {
	const grid = []
	for (let i = 0; i < TOTAL_ROWS; ++i) {
		const row = []
		for (let j = 0; j < TOTAL_COLS; ++j) {
			row.push(createNode(i, j, start, target))
		}
		grid.push(row)
	}
	return grid
}

const getNewGrid = () => {
	const grid = []
	for (let i = 0; i < TOTAL_ROWS; ++i) {
		const row = []
		for (let j = 0; j < TOTAL_COLS; ++j) {
			row.push(getEmptyNode(i, j))
		}
		grid.push(row)
	}
	return grid
}

const getWalledGrid = () => {
	const grid = []
	for (let i = 0; i < TOTAL_ROWS; ++i) {
		const row = []
		for (let j = 0; j < TOTAL_COLS; ++j) {
			row.push(getWallNode(i, j))
		}
		grid.push(row)
	}
	return grid
}

const getEmptyNode = (row, col) => {
	return {
		row,
		col,
		isStart: false,
		isTarget: false,
		isVisited: false,
		isWall: false,
		previousNode: null
	}
}

const getWallNode = (row, col) => {
	return {
		row,
		col,
		isStart: false,
		isTarget: false,
		isVisited: false,
		isWall: true,
		previousNode: null
	}
}

const createNode = (row, col, start, target) => {
	return {
		row,
		col,
		isStart: row == start[0] && col == start[1],
		isTarget: row == target[0] && col == target[1],
		isVisited: false,
		isWall: false,
		previousNode: null
	}
}

export default Grid

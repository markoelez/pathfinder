import React from 'react'
import Node from './node/node'
import { Button } from '@material-ui/core'
import { dfs, bfs, getShortestPath } from '../../algorithms/bfs'
import './grid.css'
import { genRandomMaze, genRecursiveMaze } from '../../algorithms/maze_gen'

export const TOTAL_ROWS = 30
export const TOTAL_COLS = 60

const SPEED_MULTIPLIER = 5
const PATH_SPEED_MULTIPLIER = 40

class Grid extends React.Component {
	constructor() {
		super()
		const { start_row, start_col, target_row, target_col } = getNewEndpoints()

		this.state = {
			start: [start_row, start_col],
			target: [target_row, target_col],
			grid: [],
			mouseIsPressed: false,
			algorithm: bfs
		}
	}

	componentDidMount() {
		const { start, target } = this.state
		const grid = genInitialGrid(start, target)
		this.setState({ grid: grid })
	}

	handleMouseDown(row, col) {
		const { start, target } = this.state
		if (
			(row == start[0] && col == start[1]) ||
			(row == target[0] && col == target[1])
		)
			return
		const newGrid = toggleWall(this.state.grid, row, col)
		this.setState({ grid: newGrid, mouseIsPressed: true })
	}

	handleMouseEnter(row, col) {
		if (!this.state.mouseIsPressed) return
		const { start, target } = this.state
		if (
			(row == start[0] && col == start[1]) ||
			(row == target[0] && col == target[1])
		)
			return
		const newGrid = toggleWall(this.state.grid, row, col)
		this.setState({ grid: newGrid })
	}

	handleMouseUp() {
		this.setState({ mouseIsPressed: false })
	}

	resetGrid() {
		const { start_row, start_col, target_row, target_col } = getNewEndpoints()
		const grid = getNewGrid([start_row, start_col], [target_row, target_col])

		this.setState({
			grid: grid,
			start: [start_row, start_col],
			target: [target_row, target_col]
		})
	}

	animateBFS(nodes, shortestOrder) {
		for (let i = 0; i <= nodes.length; ++i) {
			if (i === nodes.length) {
				setTimeout(() => {
					this.animateShortestPath(shortestOrder)
				}, SPEED_MULTIPLIER * i)
				return
			}
			if (i == nodes.length - 1) {
				continue
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
			if (i == 0 || i == shortestOrder.length - 1) continue
			setTimeout(() => {
				const node = shortestOrder[i]
				document.getElementById(`node-${node.row}-${node.col}`).className =
					'node node-shortest-path'
			}, PATH_SPEED_MULTIPLIER * i)
		}
	}

	visualize() {
		const { grid, start, target, algorithm } = this.state
		const startNode = grid[start[0]][start[1]]
		const targetNode = grid[target[0]][target[1]]
		const visited = algorithm(grid, startNode, targetNode)
		const shortestOrder = getShortestPath(visited[visited.length - 1])
		this.animateBFS(visited, shortestOrder)
	}

	generateMaze(algorithm) {
		const { start, target } = this.state

		const grid = getMaze(start, target, algorithm)

		this.setState({
			grid: grid
		})
	}

	genRecursiveMaze() {}

	render() {
		const { grid } = this.state
		return (
			<div className='container'>
				<Button
					variant='contained'
					color='secondary'
					onClick={() => this.resetGrid()}
				>
					reset
				</Button>

				<Button
					variant='contained'
					color='secondary'
					onClick={() => this.generateMaze(genRandomMaze)}
				>
					generate random maze
				</Button>
				<Button
					variant='contained'
					color='secondary'
					onClick={() => this.generateMaze(genRecursiveMaze)}
				>
					generate recursive maze
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={() => this.visualize()}
				>
					start
				</Button>
				<table id='board' className='grid'>
					{grid.map((row, rowIdx) => {
						return (
							<tr key={rowIdx}>
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
							</tr>
						)
					})}
				</table>
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

const getNewEndpoints = () => {
	var start_row = getRandomInt(1, TOTAL_ROWS - 2)
	var start_col = getRandomInt(1, TOTAL_COLS - 2)
	var target_row = getRandomInt(1, TOTAL_ROWS - 2)
	var target_col = getRandomInt(1, TOTAL_COLS - 2)
	while (start_row == target_row && start_col == target_col) {
		target_row = getRandomInt(1, TOTAL_ROWS - 2)
		target_col = getRandomInt(1, TOTAL_COLS - 2)
	}
	return { start_row, start_col, target_row, target_col }
}

const getNewGrid = (start, target) => {
	const grid = []
	for (let i = 0; i < TOTAL_ROWS; ++i) {
		const row = []
		for (let j = 0; j < TOTAL_COLS; ++j) {
			row.push(getEmptyNode(i, j))
			if (
				(i == start[0] && j == start[1]) ||
				(i == target[0] && j == target[1])
			) {
				continue
			}
			document.getElementById(`node-${i}-${j}`).className = 'node node-empty'
		}
		grid.push(row)
	}
	grid[start[0]][start[1]].isStart = true
	grid[target[0]][target[1]].isTarget = true

	return grid
}

const getMaze = (start, target, algorithm) => {
	const grid = getNewGrid(start, target)
	const walls = algorithm(TOTAL_ROWS, TOTAL_COLS, start, target)
	for (let i = 0; i < TOTAL_ROWS; ++i) {
		for (let j = 0; j < TOTAL_COLS; ++j) {
			if (
				(i == start[0] && j == start[1]) ||
				(i == target[0] && j == target[1])
			) {
				continue
			}
			if (walls[i][j]) {
				toggleWall(grid, i, j, start, target)
			}
		}
	}
	// for (let i = 0; i < TOTAL_ROWS; ++i) {
	// 	toggleWall(grid, i, 0)
	// 	toggleWall(grid, i, TOTAL_COLS - 1)
	// }
	// for (let j = 0; j < TOTAL_COLS; ++j) {
	// 	toggleWall(grid, 0, j)
	// 	toggleWall(grid, TOTAL_ROWS - 1, j)
	// }
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

const toggleWall = (grid, row, col) => {
	const newGrid = grid.slice()
	const node = newGrid[row][col]
	const newNode = {
		...node,
		isWall: true
	}
	newGrid[row][col] = newNode
	return newGrid
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export default Grid

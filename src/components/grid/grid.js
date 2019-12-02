import React from 'react'
import Node from './node/node'
import { Button, Slider } from '@material-ui/core'
import { dfs, bfs, getShortestPath } from '../../algorithms/bfs'
import './grid.css'

export const TOTAL_ROWS = 27
export const TOTAL_COLS = 70

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
		const grid = getNewGrid()
		const { start_row, start_col, target_row, target_col } = getNewEndpoints()

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

	generateMaze() {
		const grid = genMaze()

		const { start, target } = this.state

		grid[start[0]][start[1]].isWall = false
		grid[start[0]][start[1]].isStart = true

		grid[target[0]][target[1]].isWall = false
		grid[target[0]][target[1]].isTarget = true

		document.getElementById(`node-${start[0]}-${start[1]}`).className =
			'node node-start'
		document.getElementById(`node-${target[0]}-${target[1]}`).className =
			'node node-target'

		this.setState({
			grid: grid
		})
	}

	render() {
		const { grid } = this.state
		return (
			<div>
				<Button
					variant='contained'
					color='secondary'
					onClick={() => this.resetGrid()}
				>
					reset
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={() => this.visualize()}
				>
					start
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={() => this.generateMaze()}
				>
					generate maze
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

const getNewEndpoints = () => {
	var start_row = Math.floor(Math.random() * TOTAL_ROWS)
	var start_col = Math.floor(Math.random() * TOTAL_COLS)
	var target_row = Math.floor(Math.random() * TOTAL_ROWS)
	var target_col = Math.floor(Math.random() * TOTAL_COLS)
	while (start_row == target_row && start_col == target_col) {
		target_row = Math.floor(Math.random() * TOTAL_ROWS)
		target_col = Math.floor(Math.random() * TOTAL_COLS)
	}
	return { start_row, start_col, target_row, target_col }
}

const getNewGrid = () => {
	const grid = []
	for (let i = 0; i < TOTAL_ROWS; ++i) {
		const row = []
		for (let j = 0; j < TOTAL_COLS; ++j) {
			row.push(getEmptyNode(i, j))
			document.getElementById(`node-${i}-${j}`).className = 'node node-empty'
		}
		grid.push(row)
	}
	return grid
}

const genMaze = () => {
	const grid = getNewGrid()
	for (let i = 0; i < TOTAL_ROWS; ++i) {
		for (let j = 0; j < TOTAL_COLS; ++j) {
			if (probability(0.2)) {
				toggleWall(grid, i, j)
			}
		}
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

var probability = function(n) {
	return !!n && Math.random() <= n
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

export default Grid

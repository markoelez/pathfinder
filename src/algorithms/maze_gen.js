export function genRandomMaze(rows, cols, start, target) {
	const walls = []
	for (let i = 0; i < rows; ++i) {
		const row = []
		for (let j = 0; j < cols; ++j) {
			if (
				(i == start[0] && j == start[1]) ||
				(i == target[0] && j == target[1])
			) {
				row.push(1)
			} else {
				row.push(probability(0.2))
			}
		}
		walls.push(row)
	}
	return walls
}

function getBlankGrid(rows, cols) {
	const grid = []
	for (let i = 0; i < rows; ++i) {
		const row = []
		for (let j = 0; j < cols; ++j) {
			row.push(0)
		}
		grid.push(row)
	}
	return grid
}

var GLOBAL_GRID = []

export function genRecursiveMaze(rows, cols, start, target) {
	GLOBAL_GRID = getBlankGrid(rows, cols)
	console.log(GLOBAL_GRID)
	divide(0, 0, cols, rows)
	return GLOBAL_GRID
}

function divide(x, y, width, height) {
	if (width < 2 || height < 2) return

	var wx = x + 0
	var wy = y + randInt(height - 2)

	var px = wx + randInt(width)
	var py = wy + 0

	var dx = 1
	var dy = 0

	var len = width
	var dir = 1

	for (let i = 0; i < len; ++i) {
		if (wx != px || wy != py) {
			console.log(wy + ' -- ' + wx)
			GLOBAL_GRID[wy][wx] |= dir
		}
		wx += dx
		wy += dy
	}

	var nx = x
	var ny = y
	var w = width
	var h = wy - y + 1
	divide(nx, ny, w, h)
	console.log('BENCHMARK')
	nx = x
	ny = wy + 1
	w = w
	h = y + height - wy - 1
	divide(nx, ny, w, h)
}

var probability = function(n) {
	return !!n && Math.random() <= n
}

function randInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

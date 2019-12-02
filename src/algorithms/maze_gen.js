export function genRandomMaze(rows, cols, start, target) {
	const walls = []
	for (let i = 0; i < rows; ++i) {
		const row = []
		for (let j = 0; j < cols; ++j) {
			if (
				(i == start[0] && j == start[1]) ||
				(i == target[0] && j == target[1])
			) {
				row.push(false)
			} else {
				row.push(probability(0.2))
			}
		}
		walls.push(row)
	}
	return walls
}

export function genRecursizeMaze(rows, cols, start, target) {
	const walls = []
	for (let i = 0; i < rows; ++i) {
		const row = []
		for (let j = 0; j < cols; ++j) {
			row.push(probability(0.2))
		}
		walls.push(row)
	}
	return walls
}

var probability = function(n) {
	return !!n && Math.random() <= n
}

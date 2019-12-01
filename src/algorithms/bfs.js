export function bfs(grid, startNode, targetNode) {
	const visitedNodes = []
	let queue = []
	const dirs = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0]
	]
	queue.push(startNode)
	startNode.isVisited = true
	while (queue.length > 0) {
		let size = queue.length
		for (let i = 0; i < size; ++i) {
			let node = queue.shift()
			for (let j = 0; j < dirs.length; ++j) {
				const d = dirs[j]
				let nr = d[0] + node.row
				let nc = d[1] + node.col
				if (nr < 0 || nc < 0 || nr >= grid.length || nc >= grid[0].length)
					continue
				if (grid[nr][nc].isWall) continue
				if (grid[nr][nc].isVisited) continue
				if (nr == targetNode.row && nc == targetNode.col) return visitedNodes
				grid[nr][nc].isVisited = true
				grid[nr][nc].previousNode = grid[node.row][node.col]
				visitedNodes.push(grid[nr][nc])
				queue.push(grid[nr][nc])
			}
		}
	}
	return visitedNodes
}

export function getShortestPath(target) {
	const order = []
	let current = target
	while (current !== null) {
		console.log('tree')
		console.log(current.previousNode)
		order.unshift(current)
		current = current.previousNode
	}
	return order
}

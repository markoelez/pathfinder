import React from 'react'
import './node.css'

class Node extends React.Component {
	render() {
		const {
			row,
			col,
			isStart,
			isTarget,
			isWall,
			onMouseDown,
			onMouseEnter,
			onMouseUp
		} = this.props
		const type = isWall
			? 'wall'
			: isStart
			? 'node-start'
			: isTarget
			? 'node-target'
			: 'node-empty'
		return (
			<div
				id={`node-${row}-${col}`}
				className={`node ${type}`}
				onMouseDown={() => onMouseDown(row, col)}
				onMouseEnter={() => onMouseEnter(row, col)}
				onMouseUp={() => onMouseUp()}
			></div>
		)
	}
}

export default Node

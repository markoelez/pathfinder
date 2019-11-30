import React from 'react'
import './node.css'

class Node extends React.Component {
	render() {
		const { row, col, isStart, isTarget, isWall } = this.props
		const type = isWall
			? 'wall'
			: isStart
			? 'node-start'
			: isTarget
			? 'node-target'
			: 'node-empty'
		return <div id={`node-${row}-${col}`} className={`node ${type}`}></div>
	}
}

export default Node

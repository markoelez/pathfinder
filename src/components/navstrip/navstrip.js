import React from 'react'
import { Button } from '@material-ui/core'

export default class Navstrip extends React.Component {
	render() {
		return (
			<div className='rows'>
				<div className='row'>
					<h1>Pathfinder</h1>
				</div>
				<div className='row'>
					<Button>test</Button>
				</div>
			</div>
		)
	}
}

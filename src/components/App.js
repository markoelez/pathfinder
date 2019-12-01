import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../styles/mui_theme'
import Grid from './grid/grid'
import './App.css'
import Navstrip from './navstrip/navstrip'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Grid />
		</ThemeProvider>
	)
}

export default App

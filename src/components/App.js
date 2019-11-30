import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import NavBar from './navbar/navbar'
import { theme } from '../styles/mui_theme'
import Grid from './grid/grid'
import './App.css'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<NavBar />
			<Grid />
		</ThemeProvider>
	)
}

export default App

import { createMuiTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import green from '@material-ui/core/colors/green'

export const theme = createMuiTheme({
	overrides: {
		MuiButton: {
			root: {
				margin: '10px',
				padding: '10px'
			}
		}
	},
	palette: {
		primary: {
			light: '#62d2a2',
			main: '#62d2a2',
			dark: '#62d2a2',
			contrastText: '#eeeeee'
		},
		secondary: {
			light: '#e84a5f',
			main: '#e84a5f',
			dark: '#e84a5f',
			contrastText: '#eeeeee'
		}
	},
	status: {
		danger: 'orange'
	}
})

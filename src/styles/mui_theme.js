import { createMuiTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import green from '@material-ui/core/colors/green'

export const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#f95959',
			main: '#f95959',
			dark: '#f95959',
			contrastText: '#eeeeee'
		},
		secondary: green
	},
	status: {
		danger: 'orange'
	}
})

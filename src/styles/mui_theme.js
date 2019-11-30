import { createMuiTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import green from '@material-ui/core/colors/green'

export const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#00adb5',
			main: '#00adb5',
			dark: '#00adb5',
			contrastText: '#eeeeee'
		},
		secondary: green
	},
	status: {
		danger: 'orange'
	}
})

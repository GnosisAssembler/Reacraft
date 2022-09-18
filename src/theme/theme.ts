import { createTheme } from '@mui/material/styles';

export const DRAWER_WIDTH = 240;

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 360,
			sm: 414,
			md: 768,
			lg: 1366,
			xl: 1920
		}
	},
	typography: {
		fontFamily: ['Roboto-Condensed', 'sans-serif'].join(',')
	},
	palette: {
		mode: 'light',
		background: {
			default: '#F7FBFC'
		},
		primary: {
			main: '#5800FF'
		},
		secondary: {
			main: '#0096FF'
		},
		success: {
			main: '#6BCB77'
		},
		error: {
			main: '#FF6B6B'
		},
		info: {
			main: '#F07DEA'
		},
		warning: {
			main: '#FFD93D'
		},
		text: {
			primary: '#343a40'
		},
		common: {
			white: '#fff',
			black: '#000'
		},
		grey: {
			100: '#f8f9fa',
			200: '#f0f2f5',
			300: '#dee2e6',
			400: '#ced4da',
			500: '#adb5bd',
			600: '#6c757d',
			700: '#495057',
			800: '#343a40',
			900: '#212529'
		}
	}
});

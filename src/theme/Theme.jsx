import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
      contrastText: '#795548',
    },
    background: {
      default: 'maroon',
    },
    text: { primary: '#ff9800' },
  },
})

export default theme

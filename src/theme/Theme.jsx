import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffab40',
      contrastText: '#795548',
    },
    background: {
      default: 'maroon',
    },
    text: { primary: '#ff9800' },
  },
})

export default theme

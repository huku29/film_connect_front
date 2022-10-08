import { Router } from '@/router/Router'
import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/Theme'
import CssBaseline from '@mui/material/CssBaseline'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <CssBaseline />
    </ThemeProvider>
  )
}

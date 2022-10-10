import { Box } from '@mui/material'

export const Header = () => {
  return (
    <Box 
      component='div' 
      sx={{
        backgroundColor: 'black',
        height: '50px',
        color: '#fff',
        textAlign: 'center',
        width: '100%',
      }}
    />
  )
}

export default Header
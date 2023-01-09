import { Box, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        height: '50px',
        color: 'text.primary',
        textAlign: 'center',
        width: 1,
        bottom: 0,
        position: 'fixed',
        left: 0,
      }}
    >
      <Typography sx={{ mt: 3, textAlign: 'center' }}>
        © 2023 FilmConnect
      </Typography>
    </Box>
  )
}

export default Footer

import { Typography } from '@mui/material'

export const MovieList = () => {
  return (
    <>
      <Typography
        component={'div'}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          position: 'absolute',
          top: '40%',
          left: '40%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      ></Typography>
    </>
  )
}

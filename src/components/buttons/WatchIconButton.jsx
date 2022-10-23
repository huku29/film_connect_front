import { useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Typography from '@mui/material/Typography'

export function WatchIconButton() {
  const [clicked, setClicked] = useState(false)

  return (
    <Typography
      variant="contained"
      onClick={() => setClicked(!clicked)}
      sx={{
        position: 'absolute',
        top: '90%',
        left: '80%',
        transform: 'translate(-0%, -20%)',
        textAlign: 'center',
      }}
    >
      {clicked ? (
        <RemoveRedEyeIcon color="black" />
      ) : (
        <VisibilityOffIcon color="black" />
      )}
    </Typography>
  )
}

export default WatchIconButton

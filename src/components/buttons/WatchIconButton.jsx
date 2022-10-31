import { useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Typography from '@mui/material/Typography'

export const WatchIconButton = () => {
  const [clicked, setClicked] = useState(false)

  return (
    <Typography variant="contained" onClick={() => setClicked(!clicked)}>
      {clicked ? (
        <RemoveRedEyeIcon color="black" />
      ) : (
        <VisibilityOffIcon color="black" />
      )}
    </Typography>
  )
}

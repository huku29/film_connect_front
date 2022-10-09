import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SendIcon from '@mui/icons-material/Send'
import EmailIcon from '@mui/icons-material/Email'
import MovieIcon from '@mui/icons-material/Movie'
import { Link} from 'react-router-dom';


export default function Footer() {
  const [value, setValue] = React.useState(0)

  return (
    <Box
      sx={{
        width: 1,
        '& .MuiBottomNavigationAction-root, .Mui-selected, svg': {
          backgroundColor: 'black',
          color: '#ff9800',
        },
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        sx={[
          {
            backgroundColor: 'black',
            height: '50px',
            color: '#fff',
            textAlign: 'center',
            width: 1,
            position: 'absolute',
            bottom: 0,
          },
        ]}
      >
        {/* このLinkタグの書き方がどういう意味なのかまだわかっていない */}
        <BottomNavigationAction label="送る" icon={<SendIcon />}  component={Link}
        to={"/"} />
        <BottomNavigationAction label="受け取る" icon={<EmailIcon />} />
        <BottomNavigationAction label="鑑賞済み" icon={<MovieIcon />} />
      </BottomNavigation>
    </Box>
  )
}

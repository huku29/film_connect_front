import { useState } from 'react'
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material'

import { Link } from 'react-router-dom'

export const Footer = (props) => {
  const {menuList} = props
  const [value, setValue] = useState(0)

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
        {
          // このLinkタグの書き方がどういう意味なのかまだわかっていない
          menuList.map((menu, index) => (
            <BottomNavigationAction
              key={index}
              label={menu.label}
              icon={menu.icon}
              component={Link}
              to={menu.nextPage}
            />
          ))
        }
      </BottomNavigation>
    </Box>
  )
}

export default Footer

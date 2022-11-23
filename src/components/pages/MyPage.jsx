import { LoggedInLayout } from '@/components/layouts'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'

import { useContext } from 'react'
import { MyContext } from '@/App'

export const MyPage = () => {
  // const [userData, setUserDat  ] = useContext(UserCount)
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [user] = useContext(MyContext)
  return (
    <LoggedInLayout>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'background.default',
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          border: 'balck',
        }}
      >
        <Grid>
          <h2>{user.displayName ? user.displayName : null}</h2>
          <img
            alt=""
            src={user.photoURL && user.photoURL.replace('normal', 'bigger')}
          ></img>
        </Grid>
      </Box>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'background.default',
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          border: 'balck',
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="送信済みレター" />
          <Tab label="鑑賞済み映画" />
          <Tab label="受け取ったレター" />
        </Tabs>
      </Box>
    </LoggedInLayout>
  )
}

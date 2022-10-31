import { LoggedInLayout } from '@/components/layouts'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export const MyPage = () => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <LoggedInLayout>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'background.default',
          position: 'absolute',
          top: '30%',
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

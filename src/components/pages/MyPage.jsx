import { LoggedInLayout } from '@/components/layouts'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export const Mypage = () => {
  const [value, setValue] = useState(1)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <LoggedInLayout>
        <Box sx={{ width: '100%', bgcolor: 'background.default'}}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="送信済みレター" />
            <Tab label="鑑賞済み映画" />
            <Tab label="受け取ったレター" />
          </Tabs>
        </Box>
      </LoggedInLayout>
    </>
  )
}

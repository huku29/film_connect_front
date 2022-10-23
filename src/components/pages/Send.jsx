import { LoggedInLayout } from '@/components/layouts'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { Typography, Stack, Divider } from '@mui/material'
import WatchIconButton from '@/components/buttons/WatchIconButton'
import WriteALetter from '@/components/layouts/WriteALetter'

export const Send = () => {
  return (
    <>
      <LoggedInLayout>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            border: 'balck',
            backgroundColor: 'black',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="映画検索"
            type="text"
          />
          <IconButton type="button" sx={{ p: '10px', color: 'text.primary' }}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Typography
          component={'div'}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{
              position: 'absolute',
              top: '60%',
              transform: 'translate(-30%, -20%)',
              textAlign: 'center',
            }}
          >
            <WriteALetter />
            <WatchIconButton />
          </Stack>
        </Typography>
      </LoggedInLayout>
    </>
  )
}

export default Send

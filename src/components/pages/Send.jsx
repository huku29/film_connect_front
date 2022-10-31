import { useState } from 'react'
import { LoggedInLayout } from '@/components/layouts'
import { Typography, Stack, Divider } from '@mui/material'
import { WatchIconButton } from '@/components/buttons/WatchIconButton'
import { SendLetterModal } from '@/components/modals'
import Box from '@mui/material/Box'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'

export const Send = () => {
  const [isOpenModal, setIsOpenmodal] = useState(false)

  const onClickLetterButton = () => {
    setIsOpenmodal((state) => !state)
  }

  const handleCloseModal = () => {
    setIsOpenmodal(false)
  }

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  return (
    <LoggedInLayout>
      {/* <Paper
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
        </Paper> */}

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
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" />}
          spacing={2}
        >
          <Box
            sx={{
              width: 300,
              height: 300,
              backgroundColor: 'black',
              position: 'relative',
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ position: 'absolute', right: '10px', bottom: '10px' }}
            >
              <HistoryEduIcon onClick={onClickLetterButton} />
              <WatchIconButton />
            </Stack>
          </Box>

          <Box
            sx={{
              width: 300,
              height: 300,
              backgroundColor: 'black',
              position: 'relative',
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ position: 'absolute', right: '10px', bottom: '10px' }}
            >
              <HistoryEduIcon />
              <WatchIconButton />
            </Stack>
          </Box>

          <Box
            sx={{
              width: 300,
              height: 300,
              backgroundColor: 'black',
              position: 'relative',
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ position: 'absolute', right: '10px', bottom: '10px' }}
            >
              <HistoryEduIcon />
              <WatchIconButton />
            </Stack>
          </Box>
        </Stack>
      </Typography>

      <SendLetterModal open={isOpenModal} onClose={handleCloseModal} loading={loading} setLoading={setLoading} success={success} setSuccess={setSuccess} />
    </LoggedInLayout>
  )
}

export default Send

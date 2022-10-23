import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import LoadingButton from '@/components/buttons/LoadingButton'

export default function WriteALetter() {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'black',
        }}
      >
        <HistoryEduIcon
          onClick={handleClickOpen}
          sx={{
            position: 'absolute',
            top: '90%',
            right: '20%',
            transform: 'translate(-30%, -20%)',
            textAlign: 'center',
          }}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '720px!important',
          },
        }}
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            レター作成画面
            <TextField
              autoFocus
              margin="dense"
              id=""
              label="おすすめポイント"
              fullWidth
              variant="standard"
              multiline
              inputProps={{ style: { color: 'black' } }}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'black',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'orange',
                },
                style: {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                },
              }}
              //背景が見えるようにする
              PaperProps={{
                style: {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                },
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} sx={{ color: 'black' }}>
            レターを送信する
          </Button> */}
          <LoadingButton/>
        </DialogActions>
      </Dialog>
    </>
  )
}

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import { LoadingButton } from '@/components/buttons/LoadingButton'

export const SendLetterModal = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
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
        <LoadingButton loading={props.loading} setLoading={props.setLoading} success={props.success} setSuccess={props.setSuccess}/>
      </DialogActions>
    </Dialog>
  )
}

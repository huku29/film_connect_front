import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

import DialogTitle from '@mui/material/DialogTitle'

import Typography from '@mui/material/Typography'

//JOTAI
import { useAtom } from 'jotai'
import { recieveMovieDataAtom } from '@/jotai/atoms'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

function BootstrapDialogTitle(props) {
  const { children, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export const RecommendPoint = (props) => {
  const [movieData] = useAtom(recieveMovieDataAtom)

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={props.open}
        onClose={props.onClose}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          // onClose={handleClose}
          sx={{
            color: 'black',
            whiteSpace: 'pre-wrap',
            bgcolor: '#fff3e0',
          }}
        >
          おすすめポイント
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            color: 'black',
            whiteSpace: 'pre-wrap',
            bgcolor: '#fff3e0',
          }}
        >
          <Typography gutterBottom>{movieData.recommendPoint}</Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}

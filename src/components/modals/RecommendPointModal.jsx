import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

//JOTAI
import { useAtom } from 'jotai'
import { recieveMovieDataAtom } from '@/jotai/atoms'
import {useTranslation} from 'react-i18next'

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
}

export const RecommendPointModal = (props) => {
  const [movieData] = useAtom(recieveMovieDataAtom)

  const sendLetterNumber = props.index
  const {t, i18n} = useTranslation();

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
          {t('recommendPointTitle')}
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            color: 'black',
            whiteSpace: 'pre-wrap',
            bgcolor: '#fff3e0',
          }}
        >
          {props.recommendData ? (
            <Typography gutterBottom key={sendLetterNumber}>
              {props.recommendData}
            </Typography>
          ) : (
            <Typography gutterBottom>{movieData.recommendPoint}</Typography>
          )}
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}

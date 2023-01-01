import {
  Typography,
  Button,
  Stack,
  Backdrop,
  CircularProgress,
} from '@mui/material'

import Card from '@mui/material/Card'

import TextField from '@mui/material/TextField'

import Box from '@mui/material/Box'

import { useForm, Controller } from 'react-hook-form'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import { filmsImgSmall } from '@/urls'

import axios from 'axios'

import { useState } from 'react'

import { LoggedInLayout } from '@/components/layouts'

import { sendLetter } from '@/urls'

import { useContext } from 'react'
import { MyContext } from '@/App'

import Container from '@mui/material/Container'

import useMediaQuery from '@mui/material/useMediaQuery'

import { useAtom } from 'jotai'
import {
  
  handleSendFlashMessage

} from '@/jotai/atoms'

export const WriteLetterPage = () => {
  const { control, handleSubmit, register } = useForm()

  const validationRules = {
    recommendPoint: {
      required: 'おすすめポイントを入力してください。',
      minLength: { value: 30, message: '30文字以上で入力してください。' },
    },
  }

  const { state } = useLocation()
  const filmTitle = state && state.filmTitle
  const filmImg = state && state.filmImg
  const filmId = state && state.filmId
  const navigation = useNavigate()

  //CircleProgresの状態管理
  const [open, setOpen] = useState(false)
 
  //Flashメッセージの状態管理
  const [openFlash, setOpenFlash] = useAtom( handleSendFlashMessage)

  const [openModal, setOpenModal] = useState(false)

  const [searchFilm, setSearchFilm] = useState([])

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const [recommendData, setRecommendData] = useState('')

  const [status, setStatus] = useState({
    open: false,
    type: 'success',
    message: '成功しました。',
  })

  const [recommendPoint, setRecommendPoint] = useState()

  const [user] = useContext(MyContext)

  const handleOpenConfirmModal = (data) => {
    setRecommendData(data.recommendPoint)

    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const onSubmit = async (data) => {
    // e.preventDefault()
    setOpenModal(false)

    setOpen(!open)

    setTimeout(() => {
      setOpen(open)
    }, 5000)

    const params = {
      movie_id: filmId,
      recommend_point: recommendData,
    }
    const token = await user.getIdToken(true)

    const config = { headers: { authorization: `Bearer ${token}` } }

    axios
      .post(
        sendLetter,
        {
          letter: params,
        },
        config
      )
      .then((res) => {
        setTimeout(() => {
          navigation('/send', 
            setOpenFlash(true)
          )
        }, 5000)
      })
      .catch((error) => {
        setStatus({
          type: 'error',
          message: `送信できませんでした`,
        })
      })
      .finally(() => {
        setSearchFilm([])
      })
    setRecommendPoint('')
    setStatus('')
    setSnackbarOpen('')
  }
  

  const matches = useMediaQuery('(min-width:575px)')

  return (
    <LoggedInLayout>
      {matches ? (
        <>
          <Card
            sx={{
              mt:10,
              ml:'auto',
              mr:'auto',
              width: 700,
              height: 700,
              bgcolor: '#fff3e0',
              textAlign: 'center',
              border: 'balck',
              '@media screen and (max-width:820px)': {
                textAligh: 'center',
                mt: 25,
                ml:'auto',
                mr:'auto'
              },
              '@media screen and (width:912px)': {
                textAligh: 'center',
                mt: 40,
                ml:'auto',
                mr:'auto'
              },
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: 'black', textAlign: 'center', }}
            >
              {filmTitle}
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: 'black',
              
              
              }}
            >
              <img alt="" src={`${filmsImgSmall}/${filmImg}`}></img>
            </Typography>

            <Stack
              component="form"
              noValidate
              onSubmit={handleSubmit(handleOpenConfirmModal)}
              spacing={2}
              sx={{ textAlign: 'right' }}
            >
              <Box>
                <Container maxWidth="sm">
                  <Box>
                    <Controller
                      name="recommendPoint"
                      control={control}
                      rules={validationRules.recommendPoint}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          {...register('recommendPoint')}
                          value={recommendPoint}
                          onChange={(e) => setRecommendPoint(e.target.value)}
                          type="text"
                          label="おすすめポイント"
                          error={fieldState.invalid}
                          helperText={fieldState.error?.message}
                          multiline
                          rows={4}
                          defaultValue=""
                          sx={{
                            mt:3,
                            
                          
                            '& .MuiInputBase-input': {
                              color: 'black', // 入力文字の色
                            },
                          }}
                          inputProps={{
                            style: {
                              width: '500px',
                              height: '200px',
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                </Container>

                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{mt:3,mr:2, mb:2}}
                >
                  送信
                </Button>

                <Backdrop
                  sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Box>
            </Stack>
            {/* <LoggedInFooter /> */}
          </Card>
          {/* <ConfirmationModal open={openModal} onClose={handleCloseModal}/> */}
          <Box>
            <Dialog
              open={openModal}
              // onClose={props.onClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" sx={{ bgcolor: '#fff3e0' }}>
                {'あなたのツイッターユーザー名を確認することができます！'}
              </DialogTitle>
              <DialogContent sx={{ bgcolor: '#fff3e0' }}>
                <DialogContentText
                  id="alert-dialog-description"
                  sx={{ bgcolor: '#fff3e0' }}
                >
                  <p>
                    このおすすめ映画を送信すると、受け取ったユーザーがあなたのツイッターユーザー名と一緒におすすめ映画をシェアできることができます。
                  </p>
                  <p>よろしいですか？</p>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ bgcolor: '#fff3e0' }}>
                <Button onClick={handleCloseModal}>いいえ</Button>
                <Button onClick={onSubmit} autoFocus>
                  はい
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </>
      ) : (
        <Box >
          <Card
            sx={{
              mt:8,
              ml:5,
              mb:4,
              width: 300,
              height: 600,
              bgcolor: '#fff3e0',
              textAlign: 'center',
              border: 'balck',
              '@media screen and (min-width:400px)': {
                textAligh: 'center',
                mt: 10,
                // ml: 7,
                ml:'auto',
                mr:'auto'
              },
              '@media screen and (max-width:281px)': {
                textAligh: 'center',
                mt: 6,
                ml: 'auto',
                mr: 'auto',
              },
              '@media screen and (width:540px)': {
                textAligh: 'center',
                mt: 8,
                ml: 15,
                mb:7,
                mr: 'auto',
                height: 640,
              },
            }}
          >
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ color: 'black', textAlign: 'center', pt: 2 }}
            >
              {filmTitle}
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: 'black',
              }}
            >
              <img alt="" src={`${filmsImgSmall}/${filmImg}`}></img>
            </Typography>

            <Stack
              component="form"
              noValidate
              onSubmit={handleSubmit(handleOpenConfirmModal)}
              spacing={2}
              sx={{ textAlign: 'right' }}
            >
              <Box>
                <Container maxWidth="sm">
                  <Box>
                    <Controller
                      name="recommendPoint"
                      control={control}
                      rules={validationRules.recommendPoint}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          {...register('recommendPoint')}
                          value={recommendPoint}
                          onChange={(e) => setRecommendPoint(e.target.value)}
                          type="text"
                          label="おすすめポイント"
                          error={fieldState.invalid}
                          helperText={fieldState.error?.message}
                          multiline
                          rows={4}
                          defaultValue=""
                          sx={{
                            '& .MuiInputBase-input': {
                              color: 'black', // 入力文字の色
                            },
                            mr:3
                          }}
                          inputProps={{
                            style: {
                              width: '200px',
                              height: '130px',
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                </Container>

                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{mt:2, mr:1}}
                >
                  送信
                </Button>

                <Backdrop
                  sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Box>
            </Stack>
            {/* <LoggedInFooter /> */}
          </Card>
          {/* <ConfirmationModal open={openModal} onClose={handleCloseModal}/> */}
          <Box>
            <Dialog
              open={openModal}
              // onClose={props.onClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" sx={{ bgcolor: '#fff3e0' }}>
                {'あなたのツイッターユーザー名を確認することができます！'}
              </DialogTitle>
              <DialogContent sx={{ bgcolor: '#fff3e0' }}>
                <DialogContentText
                  id="alert-dialog-description"
                  sx={{ bgcolor: '#fff3e0' }}
                >
                  <p>
                    このおすすめ映画を送信すると、受け取ったユーザーがあなたのツイッターユーザー名と一緒におすすめ映画をシェアできることができます。
                  </p>
                  <p>よろしいですか？</p>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ bgcolor: '#fff3e0' }}>
                <Button onClick={handleCloseModal}>いいえ</Button>
                <Button onClick={onSubmit} autoFocus>
                  はい
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      )}
    </LoggedInLayout>
  )
}

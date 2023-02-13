import {
  Typography,
  Button,
  Stack,
  Backdrop,
  CircularProgress,
  Link,
  Card,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { filmsImgSmall, getFilmDetail } from '@/urls'
import axios from 'axios'
import { useState } from 'react'
import { LoggedInLayout } from '@/components/layouts'
import { sendLetter } from '@/urls'
import { useContext } from 'react'
import { MyContext } from '@/App'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAtom } from 'jotai'
import { handleSendFlashMessage, handleGetSearchWordAtom } from '@/jotai/atoms'
import { useTranslation } from 'react-i18next'

export const WriteLetterPage = () => {
  const { control, handleSubmit, register } = useForm()
  const { t, i18n } = useTranslation()

  const validationRules = {
    recommendPoint: {
      required: t('writeLetter.required'),
      minLength: { value: 30, message: t('writeLetter.minLength') },
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
  const [openFlash, setOpenFlash] = useAtom(handleSendFlashMessage)

  const [openModal, setOpenModal] = useState(false)

  const [searchFilm, setSearchFilm] = useState([])

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const [recommendData, setRecommendData] = useState('')

  const [status, setStatus] = useState({
    open: false,
    type: 'success',
    message: t('writeLetter.alert'),
  })

  const [searchWord, setSearchWord] = useAtom(handleGetSearchWordAtom)

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
      film_id: filmId,
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
          navigation('/search', setOpenFlash(true))
        }, 5000)
      })
      .catch((error) => {
        setStatus({
          type: 'error',
          message: t('writeLetter.canNotSend'),
        })
      })
      .finally(() => {
        setSearchFilm([])
        setSearchWord('')
      })
    setRecommendPoint('')
    setStatus('')
    setSnackbarOpen('')
  }

  const backSearchPage = () => {
    navigation('/search', setSearchWord(searchWord))
  }

  const matches = useMediaQuery('(min-width:575px)')

  return (
    <LoggedInLayout>
      {matches ? (
        <>
          <Card
            sx={{
              mt: 10,
              mb: 10,
              ml: 'auto',
              mr: 'auto',
              width: 700,
              height: 700,
              bgcolor: '#fff3e0',
              textAlign: 'center',
              border: 'balck',
              '@media screen and (max-width:820px)': {
                textAligh: 'center',
                mt: 25,
                ml: 'auto',
                mr: 'auto',
              },
              '@media screen and (width:912px)': {
                textAligh: 'center',
                mt: 40,
                ml: 'auto',
                mr: 'auto',
              },
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: 'black', textAlign: 'center' }}
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
              {i18n.language === 'ja' ? (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${getFilmDetail}/${filmId}`}
                  underline="hover"
                >
                  <img alt="" src={`${filmsImgSmall}/${filmImg}`}></img>
                </Link>
              ) : (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${getFilmDetail}/${filmId}/en`}
                  underline="hover"
                >
                  <img alt="" src={`${filmsImgSmall}/${filmImg}`}></img>
                </Link>
              )}
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
                          label={t('writeLetter.label')}
                          error={fieldState.invalid}
                          helperText={fieldState.error?.message}
                          multiline
                          rows={4}
                          defaultValue=""
                          sx={{
                            mt: 3,

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
                  sx={{ mt: 3, mr: 2, mb: 2 }}
                  onClick={backSearchPage}
                >
                  {t('writeLetter.backSearchPageButton')}
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ mt: 3, mr: 2, mb: 2 }}
                >
                  {t('writeLetter.sendButton')}
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
          </Card>

          <Box>
            <Dialog
              open={openModal}
              // onClose={props.onClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" sx={{ bgcolor: '#fff3e0' }}>
                {t('writeLetter.dialog.title')}
              </DialogTitle>
              <DialogContent sx={{ bgcolor: '#fff3e0' }}>
                <DialogContentText
                  id="alert-dialog-description"
                  sx={{ bgcolor: '#fff3e0' }}
                >
                  <p>{t('writeLetter.dialog.content1')}</p>
                  <p> {t('writeLetter.dialog.content2')}</p>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ bgcolor: '#fff3e0' }}>
                <Button onClick={handleCloseModal}>
                  {' '}
                  {t('writeLetter.dialog.noButton')}
                </Button>
                <Button onClick={onSubmit} autoFocus>
                  {t('writeLetter.dialog.yesButton')}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </>
      ) : (
        <Box>
          <Card
            sx={{
              mt: 8,
              ml: 5,
              mb: 10,
              width: 300,
              height: 600,
              bgcolor: '#fff3e0',
              textAlign: 'center',
              border: 'balck',
              '@media screen and (min-width:400px)': {
                textAligh: 'center',
                mt: 10,
                ml: 'auto',
                mr: 'auto',
              },
              '@media screen and (max-width:281px)': {
                textAligh: 'center',
                mt: 6,
                ml: 'auto',
                mr: 'auto',
                mb: 10,
              },
              '@media screen and (width:540px)': {
                textAligh: 'center',
                mt: 8,
                ml: 15,
                mb: 7,
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
              {i18n.language === 'ja' ? (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${getFilmDetail}/${filmId}`}
                  underline="hover"
                >
                  <img alt="" src={`${filmsImgSmall}/${filmImg}`}></img>
                </Link>
              ) : (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${getFilmDetail}/${filmId}/en`}
                  underline="hover"
                >
                  <img alt="" src={`${filmsImgSmall}/${filmImg}`}></img>
                </Link>
              )}
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
                          label={t('writeLetter.label')}
                          error={fieldState.invalid}
                          helperText={fieldState.error?.message}
                          multiline
                          rows={4}
                          defaultValue=""
                          sx={{
                            '& .MuiInputBase-input': {
                              color: 'black', // 入力文字の色
                            },
                            mr: 3,
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
                  sx={{ mt: 2, mr: 1 }}
                  onClick={backSearchPage}
                >
                  {t('writeLetter.backSearchPageButton')}
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ mt: 2, mr: 1 }}
                >
                  {t('writeLetter.sendButton')}
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
          </Card>

          <Box>
            <Dialog
              open={openModal}
              // onClose={props.onClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" sx={{ bgcolor: '#fff3e0' }}>
                {t('writeLetter.dialog.title')}
              </DialogTitle>
              <DialogContent sx={{ bgcolor: '#fff3e0' }}>
                <DialogContentText
                  id="alert-dialog-description"
                  sx={{ bgcolor: '#fff3e0' }}
                >
                  <p>{t('writeLetter.dialog.content1')}</p>
                  <p> {t('writeLetter.dialog.content2')}</p>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ bgcolor: '#fff3e0' }}>
                <Button onClick={handleCloseModal}>
                  {' '}
                  {t('writeLetter.dialog.noButton')}
                </Button>
                <Button onClick={onSubmit} autoFocus>
                  {t('writeLetter.dialog.yesButton')}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      )}
    </LoggedInLayout>
  )
}

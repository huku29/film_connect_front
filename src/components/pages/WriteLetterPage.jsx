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

import { useLocation } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import { filmsimg } from '@/urls'

import axios from 'axios'

import { useState } from 'react'

import { LoggedInLayout } from '@/components/layouts'

import { sendLetter } from '@/urls'

import { useContext } from 'react'
import { MyContext } from '@/App'

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

  const [open, setOpen] = useState(false)

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const [status, setStatus] = useState({
    open: false,
    type: 'success',
    message: '成功しました。',
  })

  const [recommendPoint, setRecommendPoint] = useState()

  console.log(filmId)
  const [user] = useContext(MyContext)
  console.log(user)

  const onSubmit = async (data, e) => {
    // const recommendPoint = []
    e.preventDefault()

    console.log(e.target.value)

    console.log(data.recommendPoint)

    //ここ
    setOpen(!open)

    setTimeout(() => {
      setOpen(open)
    }, 5000)

    const params = { movie_id: filmId, recommend_point: data.recommendPoint }
    const token = await user.getIdToken(true)
    // console.log(token)
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
          navigation('/send', {
            state: {
              alertOpen: !open,
            },
          })
        }, 5000)
      })
      .catch((error) => {
        setStatus({
          type: 'error',
          message: `送信できませんでした`,
        })
      })
    setRecommendPoint('')
    setStatus('')
    setSnackbarOpen('')
  }

  return (
    <>
      {/* <LoggedInHeader /> */}
      <Box sx={{ display: 'flex' }}>
        <LoggedInLayout>
          {/* <Stack
            sx={{
              width: '100%',
              position: 'absolute',
              top: '8%',
            }}
          >
            <Alert
              // onClose={handleClose}
              variant="filled"
              severity="success"
              sx={{}}
            >
              This is a success message!
            </Alert>
          </Stack> */}
          <Card
            sx={{
              width: 800,
              height: 700,
              bgcolor: '#fff3e0',
              position: 'absolute',
              top: '51%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              border: 'balck',
            }}
          >
            <Typography
              gutterBottom
              variant="h4"
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
                textAlign: 'left',
                position: 'fixed',
                pl: 3,
              }}
            >
              <img alt="" src={`${filmsimg}/${filmImg}`}></img>
              {console.log(filmImg)}
            </Typography>

            <Stack
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              spacing={2}
              sx={{ textAlign: 'right' }}
            >
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
                        position: 'fixed',
                        top: '55%',
                        left: '55%',
                        transform: 'translate(-20%, -50%)',
                        textAlign: 'center',
                        color: 'black',
                        '& .MuiInputBase-input': {
                          color: 'black', // 入力文字の色
                        },
                      }}
                      inputProps={{
                        style: {
                          width: '400px',
                          height: '500px',
                        },
                      }}
                    />
                  )}
                />

                {/* <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  sx={{
                    width: '100%',
                    top: '80%',
                    left: '10%',
                    transform: 'translate(-20%, -50%)',
                  }}
                  // onClose={handleClose}
                >
                  <Alert
                    // onClose={handleClose}
                    severity={status.type}
                    sx={{
                      width: '40%',
                      position: 'fixed',
                      top: '87%',
                      left: '20%',
                      transform: 'translate(-20%, -50%)',
                    }}
                  >
                    {status.message}
                  </Alert>
                </Snackbar> */}

                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ position: 'fixed', right: '20px', bottom: '15px' }}
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
        </LoggedInLayout>
      </Box>
    </>
  )
}

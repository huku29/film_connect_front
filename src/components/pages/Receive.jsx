import { LoggedInLayout } from '@/components/layouts'

import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { filmsImgSmall, registerReceivedLetter } from '@/urls'

import { TwitterShareButton, TwitterIcon } from 'react-share'

//JOTAI
import { useAtom } from 'jotai'
import {
  recieveMovieDataAtom,
  handleFadeModal,
  handleFlashMessageAtom,
  handleGetErrorMessageAtom,
} from '@/jotai/atoms'

import { RecommendPointModal } from '@/components/modals'

import { useContext } from 'react'
import { MyContext } from '@/App'

import axios from 'axios'

import { Alert, Snackbar, CardHeader, CardActions } from '@mui/material'

export const Receive = () => {
  const [movieData] = useAtom(recieveMovieDataAtom)
  const [open] = useAtom(handleFadeModal)
  const [openFlash, setOpenFlash] = useAtom(handleFlashMessageAtom)

  const [openModal, setOpenModal] = useState(false)

  const [user] = useContext(MyContext)

  const [errorMessage] = useAtom(handleGetErrorMessageAtom)


  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleGetReceiveLetters = async () => {
    const params = { letter_id: movieData.letterId }
    const token = await user.getIdToken(true)
    const config = { headers: { authorization: `Bearer ${token}` } }

    axios
      .post(
        registerReceivedLetter,
        {
          received_letter: params,
        },
        config
      )
      .then((res) => {
        setOpenFlash(true)
      })
      .catch(() => {})

    setOpenFlash(false)
  }

  //受け取るボタンを押すとフラッシュメッセージを消す
  useEffect(() => {
    setOpenFlash(false)
  }, [movieData])


  return (
    <>
      <LoggedInLayout>
        <Box mt={40} textAlign="center">
          {/* 受け取るレターがなければメッセージを表示して、あればコンテンツを表示 */}
          {errorMessage ? (
            <Typography sx={{ color: '#ff9800' }}>{errorMessage}</Typography>
          ) : (
            <Fade in={open}>
              <Card
                sx={{
                  width: 700,
                  height: 680,
                  textAlign: 'center',
                  bgcolor: '#fff3e0',
                  border: 'balck',
                  my: -30,
                  mx: 'auto',
                }}
              >
                <CardHeader
                  title={movieData.movieTitle}
                  titleTypographyProps={{ variant: 'h5' }}
                  sx={{ color: 'black', textAlign: 'center', pt: 2 }}
                  // title={
                  //   <Typography
                  //     gutterBottom
                  //     variant="h5"
                  //     sx={{ color: 'black', textAlign: 'center', pt: 2 }}
                  //   >
                  //     {sendLetter.movieTitle}
                  //   </Typography>
                  // }
                />
                <CardContent>
                  <CardMedia
                    height="400px"
                    component="img"
                    image={`${filmsImgSmall}/${movieData.movieImg}`}
                    sx={{ objectFit: 'contain' }}
                    alt=""
                  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    // disableElevation
                    sx={{ mt: 3, mx: 'auto' }}
                    onClick={handleOpenModal}
                  >
                    おすすめポイントを見る
                  </Button>
                </CardActions>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{ mt: 5, mx: 'auto', mr: 3 }}
                    onClick={handleGetReceiveLetters}
                  >
                    受け取る
                  </Button>
                </CardActions>
                <CardActions sx={{ml:3, my: -8, }}>
                  <TwitterShareButton
                    // url={}
                    via={movieData.twitterUserName}
                  >
                    <TwitterIcon size={'55px'} round />
                  </TwitterShareButton>
                </CardActions>

                {/*                 
                <Box
                  variant="contained"
                  sx={{
                    color: 'white',
                  }}
                >
                  <Button variant="contained" onClick={handleGetReceiveLetters}>
                    受け取る
                  </Button>
                </Box> */}

                <Box
                  sx={{ position: 'absolute', right: '250px', top: '400px' }}
                >
                  <Snackbar
                    //レター送信に成功したらalertで表示させる
                    open={openFlash}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    sx={{
                      height: '20%',
                      maxWidth: '100%',
                      bottom: { xs: 10, sm: 10 },
                    }}
                  >
                    <Alert
                      variant="filled"
                      severity="success"
                      sx={{ positon: 'fixed', bottom: '700px' }}
                    >
                      レターを受け取りました！
                    </Alert>
                  </Snackbar>
                </Box>

                {/* シェアボタン */}
                {/* <Box
                  sx={{
                    position: 'fixed',
                    left: '20px',
                    bottom: '15px',
                    color: 'white',
                  }}
                >
                  <TwitterShareButton
                    // url={}
                    via={movieData.twitterUserName}
                  >
                    <TwitterIcon size={'50px'} round />
                  </TwitterShareButton>
                </Box> */}
                {/* おすすめモーダル */}
                <RecommendPointModal
                  open={openModal}
                  onClose={handleCloseModal}
                />
              </Card>
            </Fade>
          )}
        </Box>
      </LoggedInLayout>
    </>
  )
}

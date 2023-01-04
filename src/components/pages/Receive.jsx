import { LoggedInLayout } from '@/components/layouts'

import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { filmsImgSmall, registerReceivedLetter, getFilmDetail } from '@/urls'

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

import { Alert, Snackbar, CardHeader, CardActions, Link } from '@mui/material'

import useMediaQuery from '@mui/material/useMediaQuery'

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

  const matches = useMediaQuery('(min-width:575px)')


  return (
    <LoggedInLayout>
      {matches ? (
        <>
          <Box mt={10} textAlign="center">
            {/* 受け取るレターがなければメッセージを表示して、あればコンテンツを表示 */}
            {errorMessage ? (
              <Typography sx={{ color: '#ff9800', mt: 40 }}>
                {errorMessage}
              </Typography>
            ) : (
              <Fade in={open}>
                <Card
                  sx={{
                    width: 700,
                    height: 680,
                    // textAlign: 'center',
                    bgcolor: '#fff3e0',
                    border: 'balck',
                    mt: 1,
                    mr: 'auto',
                    ml: 'auto',
                    '@media screen and (max-width:915px)': {
                      textAligh: 'center',
                      mt: 25,
                    },
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
                    <Link
                      target="_blank"
                      rel="noopener"
                      href={`${getFilmDetail}/${movieData.movieId}`}
                      underline="hover"
                    >
                      <CardMedia
                        height="400px"
                        component="img"
                        image={`${filmsImgSmall}/${movieData.movieImg}`}
                        sx={{ objectFit: 'contain' }}
                        alt=""
                      />
                    </Link>
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
                      sx={{ mx: 'auto', mr: 3 }}
                      onClick={handleGetReceiveLetters}
                    >
                      受け取る
                    </Button>
                  </CardActions>
                  <CardActions sx={{ ml: 3, my: -8 }}>
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
                        mb: 5,
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
        </>
      ) : (
        <>
          <Box mt={40} textAlign="center">
            {/* 受け取るレターがなければメッセージを表示して、あればコンテンツを表示 */}
            {errorMessage ? (
              <Typography sx={{ color: '#ff9800' }}>{errorMessage}</Typography>
            ) : (
              <Fade in={open}>
                <Card
                  sx={{
                    width: 300,
                    height: 680,
                    textAlign: 'center',
                    bgcolor: '#fff3e0',
                    border: 'balck',
                    my: -32,
                    mx: 'auto',
                  }}
                >
                  <CardHeader
                    title={movieData.movieTitle}
                    titleTypographyProps={{ variant: 'h7' }}
                    sx={{ color: 'black', textAlign: 'center' }}
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
                    <Link
                      target="_blank"
                      rel="noopener"
                      href={`${getFilmDetail}/${movieData.movieId}`}
                      underline="hover"
                    >
                      <CardMedia
                        height="400px"
                        component="img"
                        image={`${filmsImgSmall}/${movieData.movieImg}`}
                        sx={{ objectFit: 'contain' }}
                        alt=""
                      />
                    </Link>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      // disableElevation
                      sx={{ mt: 5, mx: 'auto', my: 1 }}
                      onClick={handleOpenModal}
                    >
                      おすすめポイントを見る
                    </Button>
                  </CardActions>
                  <CardActions>
                    <Button
                      variant="contained"
                      sx={{ mt: 5, mx: 'auto', mr: 3, my: 1 }}
                      onClick={handleGetReceiveLetters}
                    >
                      受け取る
                    </Button>
                  </CardActions>
                  <CardActions sx={{ ml: 3, my: -9 }}>
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
                        vertical: 'top',
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
        </>
      )}
    </LoggedInLayout>
  )
}

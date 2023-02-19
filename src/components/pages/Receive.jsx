import { LoggedInLayout } from '@/components/layouts'
import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Fade,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Alert,
  Snackbar,
  CardHeader,
  CardActions,
  Link,
} from '@mui/material'

import {
  filmsImgSmall,
  registerReceivedLetter,
  getFilmDetail,
  registerNotWatchFilmLetter,
  getFilmsDetails,
} from '@/urls'
import { TwitterShareButton, TwitterIcon } from 'react-share'
//JOTAI
import { useAtom } from 'jotai'
import {
  recieveMovieDataAtom,
  handleFadeModal,
  handleFlashMessageAtom,
  handleGetErrorMessageAtom,
  handleRegistNotWatchFilmAtom,
  handleGetFirstSawFilmLettersIdAtom,
} from '@/jotai/atoms'
import { RecommendPointModal } from '@/components/modals'
import { useContext } from 'react'
import { MyContext } from '@/App'
import axios from 'axios'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'

export const Receive = () => {
  const [movieData] = useAtom(recieveMovieDataAtom)
  const [open] = useAtom(handleFadeModal)
  const [openFlash, setOpenFlash] = useAtom(handleFlashMessageAtom)

  const [openModal, setOpenModal] = useState(false)

  const [user] = useContext(MyContext)

  const [errorMessage] = useAtom(handleGetErrorMessageAtom)

  const { t, i18n } = useTranslation()

  const [getFirstSawFilmLettersId, setGetFirstSawFilmLettersId] = useAtom(
    handleGetFirstSawFilmLettersIdAtom
  )

  const match_first_saw_letter_id = getFirstSawFilmLettersId.find(
    (getFirstSawFilmLetterId) => getFirstSawFilmLetterId === movieData.letterId
  )

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
        setTimeout(() => {
          setOpenFlash(false)
        }, 2000)
      })
      .catch(() => {})

    setDisable(true)
    setOpenFlash(false)
  }

  //受け取るボタンを押すとフラッシュメッセージを消す

  //レスポンシブ
  const matches = useMediaQuery('(min-width:575px)')
  const [registNotWatchFilm, setRegistNotWatchFilm] = useAtom(
    handleRegistNotWatchFilmAtom
  )
  const [openFlashAlert, setOpenFlashAlert] = useState(false)
  const [disable, setDisable] = useState(false)

  const handleRegistNotWatchMovie = async () => {
    const params = { letter_id: movieData.letterId }
    const token = await user.getIdToken(true)
    const config = { headers: { authorization: `Bearer ${token}` } }

    await axios
      .post(
        registerNotWatchFilmLetter,
        {
          not_watch_film_letter: params,
        },
        config
      )
      .then((res) => {
        //驚きの顔文字
        setRegistNotWatchFilm(true)
        //アラートが表示
        setOpenFlashAlert(true)
        setTimeout(() => {
          setOpenFlashAlert(false)
          setOpenFlash(false)
        }, 2000)
      })
      .catch((error) => {})
      .finally(() => {
        setRegistNotWatchFilm(false)
      })
  }

  const handleGetFilmDataFromId = async () => {
    const params = { film_id: movieData.film_id }
    await axios
      .get(getFilmsDetails, {
        film_id: params,
      })
      .then((res) => {})
  }

  useEffect(() => {
    setDisable(false)
    setOpenFlash(false)
  }, [movieData])

  // useEffect(() => {
  //   handleGetFilmDataFromId()
  // }, [])

  return (
    <LoggedInLayout>
      {matches ? (
        <>
          <Box mt={10} textAlign="center">
            {/* 受け取るレターがなければメッセージを表示して、あればコンテンツを表示 */}
            {errorMessage ? (
              <Typography sx={{ color: '#ff9800', mt: 40 }}>
                {/* {errorMessage} */}
                {t('receive.erroMessage')}
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
                    mb: 5,
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
                  />
                  {i18n.language === 'ja' ? (
                    <CardContent>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
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
                  ) : (
                    <CardContent>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${getFilmDetail}/${movieData.movieId}/en`}
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
                  )}

                  <CardActions>
                    <Button
                      variant="contained"
                      // disableElevation
                      sx={{ mt: 3, mx: 'auto' }}
                      onClick={handleOpenModal}
                    >
                      {t('recommendPoint')}
                    </Button>
                  </CardActions>
                  <CardActions>
                    <Button
                      variant="contained"
                      sx={{ mx: 'auto', mr: 3 }}
                      onClick={handleGetReceiveLetters}
                      disabled={disable}
                    >
                      {t('receive.button')}
                    </Button>
                  </CardActions>
                  <CardActions sx={{ ml: 3, my: -8 }}>
                    <TwitterShareButton
                      title={t(`twitterShareContent`, {
                        film: movieData.movieTitle,
                        twitterUser: movieData.twitterUserName,
                      })}
                      // title={`「${movieData.movieTitle}」は@${movieData.twitterUserName}さんのおすすめ映画です！`}
                      hashtags={['映画','映画で人と繋がりたい', 'FilmConnect']}
                      url={'https://filmconnect.jp'}
                    >
                      <TwitterIcon size={'55px'} round />
                    </TwitterShareButton>
                  </CardActions>
                  <CardActions sx={{ ml: 12, my: -9.5 }}>
                    {match_first_saw_letter_id ===
                    movieData.letterId ? null : registNotWatchFilm ? ( // </Button> //   <FontAwesomeIcon icon={faFaceSurprise} size="3x" /> // <Button onClick={handleChangeFaceIcon}>
                      <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 23 }}
                        onClick={handleRegistNotWatchMovie}
                      >
                        {t('neverSeen')}
                      </Button>
                    ) : null}
                  </CardActions>

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
                        {t('receive.receivedAlert')}
                      </Alert>
                    </Snackbar>
                    <Snackbar
                      //レター送信に成功したらalertで表示させる
                      open={openFlashAlert}
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
                        {t('receive.addNeverSeenFilmList')}
                      </Alert>
                    </Snackbar>
                  </Box>

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
              <Typography sx={{ color: '#ff9800' }}>
                {t('receive.erroMessage')}
              </Typography>
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
                    mb: 8,
                  }}
                >
                  <CardHeader
                    title={movieData.movieTitle}
                    titleTypographyProps={{ variant: 'h7' }}
                    sx={{ color: 'black', textAlign: 'center' }}
                  />
                  {i18n.language === 'ja' ? (
                    <CardContent>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
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
                  ) : (
                    <CardContent>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${getFilmDetail}/${movieData.movieId}/en`}
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
                  )}

                  <CardActions>
                    <Button
                      variant="contained"
                      // disableElevation
                      sx={{ ml: 5 }}
                      onClick={handleOpenModal}
                    >
                      {t('recommendPoint')}
                    </Button>
                  </CardActions>
                  <CardActions sx={{}}>
                    {match_first_saw_letter_id ===
                    movieData.letterId ? null : registNotWatchFilm ? (
                      <Button
                        variant="contained"
                        sx={{ ml: 5, textAlign: 'center', width: '190px' }}
                        onClick={handleRegistNotWatchMovie}
                      >
                        {t('neverSeen')}
                      </Button>
                    ) : null}
                  </CardActions>
                  <CardActions sx={{ mb: -7, ml: 20 }}>
                    <Button
                      variant="contained"
                      sx={{}}
                      onClick={handleGetReceiveLetters}
                      disabled={disable}
                    >
                      {t('receive.button')}
                    </Button>
                  </CardActions>
                  <CardActions sx={{ ml: 5 }}>
                    <TwitterShareButton
                      title={t(`twitterShareContent`, {
                        film: movieData.movieTitle,
                        twitterUser: movieData.twitterUserName,
                      })}
                      // title={`「${movieData.movieTitle}」は@${movieData.twitterUserName}さんのおすすめ映画です！`}
                      hashtags={['映画','映画で人と繋がりたい', 'FilmConnect']}
                      url={'https://filmconnect.jp'}
                    >
                      <TwitterIcon size={'55px'} round />
                    </TwitterShareButton>
                  </CardActions>
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
                        top: 80,
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
                        {t('receive.receivedAlert')}
                      </Alert>
                    </Snackbar>
                    <Snackbar
                      //レター送信に成功したらalertで表示させる
                      open={openFlashAlert}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      sx={{
                        top: 50,
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
                        {t('receive.addNeverSeenFilmList')}
                      </Alert>
                    </Snackbar>
                  </Box>

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

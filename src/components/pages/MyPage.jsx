import { LoggedInLayout } from '@/components/layouts'
import { useState, useEffect, useContext } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Grid,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  CircularProgress,
  Link,
} from '@mui/material'
import { MyContext } from '@/App'
import axios from 'axios'

import {
  getMadeLetters,
  getFilmsDetails,
  getFilmsDetailsByEnglish,
  getReceivedLetters,
  getReceivedLettersData,
  filmsImgSmall,
  getUsersName,
  getFilmDetail,
  getNotWatchFilmLetters,
  getNotWatchFilmLetterDetails,
} from '@/urls'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { RecommendPointModal } from '../modals'
import { useCallback } from 'react'

import { TwitterShareButton, TwitterIcon } from 'react-share'

import useMediaQuery from '@mui/material/useMediaQuery'

import { useAtom } from 'jotai'
import { handleSendFlashMessage } from '@/jotai/atoms'
import { useTranslation } from 'react-i18next'

export const MyPage = () => {
  const [swiper, setSwiper] = useState(null)
  const [value, setValue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [openFlash, setOpenFlash] = useAtom(handleSendFlashMessage)
  const { t, i18n } = useTranslation()

  const slideChange = (index) => {
    setValue(index)
  }

  const [user] = useContext(MyContext)

  const [sendLetters, setSendLetters] = useState([])

  const [receivedLetterDetails, setReceivedLetterDetails] = useState([])

  const [notWatchfilmLetterDetails, setNotWatchfilmLetterDetails] = useState([])

  const matches = useMediaQuery('(min-width:575px)')

  const matchLowWidth = useMediaQuery('(max-width:280px)')

  function TabPanel(props) {
    const { children, value, index } = props

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={index}
        aria-labelledby={index}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    )
  }

  const handleOpenModal = useCallback((film) => {
    setRecommendData(film.recommend_point)
    setOpenModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
  }, [])

  const [openModal, setOpenModal] = useState(false)

  const [recommendData, setRecommendData] = useState('おすすめポイント！')

  const getSendLetters = async () => {
    if (sendLetters.length !== 0) return
    setIsLoading(true)
    const token = await user.getIdToken(true)
    const config = { headers: { authorization: `Bearer ${token}` } }
    const res = await axios.get(getMadeLetters, config)
    //letterの情報
    const letters = res.data.letter
    if (i18n.language === 'ja') {
      const newLetters = await Promise.all(
        letters.map(async (letter) => {
          const result = await axios.get(getFilmsDetails, {
            params: {
              film_id: letter.film_id,
            },
          })
          const { title, poster_path } = result.data
          letter.filmTitle = title
          letter.filmImage = poster_path
          return letter
        })
      )
      setSendLetters(newLetters)
      setIsLoading(false)
    } else {
      //英語版のバックエンドのpathに変更
      const newLetters = await Promise.all(
        letters.map(async (letter) => {
          const result = await axios.get(getFilmsDetailsByEnglish, {
            params: {
              film_id: letter.film_id,
            },
          })
          const { title, poster_path } = result.data
          letter.filmTitle = title
          letter.filmImage = poster_path
          return letter
        })
      )
      setSendLetters(newLetters)
      setIsLoading(false)
    }
  }

  const handleGetReceivedLetters = async () => {
    if (receivedLetterDetails.length !== 0) return
    setIsLoading(true)
    const token = await user.getIdToken(true)
    const config = { headers: { authorization: `Bearer ${token}` } }

    const res = await axios.get(getReceivedLetters, config)
    const receivedletters = res.data.received_letters
    const newReceivedLetters = await Promise.all(
      receivedletters.map(async (receivedletter) => {
        const receivedData = await axios.get(getReceivedLettersData, {
          params: {
            letter_id: receivedletter.letter_id,
          },
        })

        return receivedData.data.received_letters[0]
      })
    )

    if (i18n.language === 'ja') {
      const newGetReceivedLetters = await Promise.all(
        newReceivedLetters.map(async (receivedLetterData) => {
          const result = await axios.get(getFilmsDetails, {
            params: {
              film_id: receivedLetterData.film_id,
            },
          })
          const { title, poster_path } = result.data
          receivedLetterData.filmTitle = title
          receivedLetterData.filmImage = poster_path
          return receivedLetterData
        })
      )

      const newGetReceivedLettersWithUserInfo = await Promise.all(
        newGetReceivedLetters.map(async (receivedLetterDataWithUserInfo) => {
          const newResult = await axios.get(getUsersName, {
            params: {
              user_id: receivedLetterDataWithUserInfo.user_id,
            },
          })
          const { name } = newResult.data[0]
          receivedLetterDataWithUserInfo.twitterName = name
          return receivedLetterDataWithUserInfo
        })
      )

      setReceivedLetterDetails(newGetReceivedLettersWithUserInfo)
      setIsLoading(false)
    } else {
      //英語版
      const newGetReceivedLetters = await Promise.all(
        newReceivedLetters.map(async (receivedLetterData) => {
          const result = await axios.get(getFilmsDetailsByEnglish, {
            params: {
              film_id: receivedLetterData.film_id,
            },
          })
          const { title, poster_path } = result.data
          receivedLetterData.filmTitle = title
          receivedLetterData.filmImage = poster_path
          return receivedLetterData
        })
      )

      const newGetReceivedLettersWithUserInfo = await Promise.all(
        newGetReceivedLetters.map(async (receivedLetterDataWithUserInfo) => {
          const newResult = await axios.get(getUsersName, {
            params: {
              user_id: receivedLetterDataWithUserInfo.user_id,
            },
          })
          const { name } = newResult.data[0]
          receivedLetterDataWithUserInfo.twitterName = name
          return receivedLetterDataWithUserInfo
        })
      )

      setReceivedLetterDetails(newGetReceivedLettersWithUserInfo)
      setIsLoading(false)
    }
  }

  const handleGetNotWatchFilmLetters = async () => {
    if (notWatchfilmLetterDetails.length !== 0) return
    setIsLoading(true)

    const token = await user.getIdToken(true)
    const config = { headers: { authorization: `Bearer ${token}` } }

    const res = await axios.get(getNotWatchFilmLetters, config)

    const resNotWatchFilmLetterDatas = res.data.not_watch_films
    const notWatchFilmLetterDatas = await Promise.all(
      resNotWatchFilmLetterDatas.map(async (notWatchFilmLetterData) => {
        const notWatchFilmDetails = await axios.get(
          getNotWatchFilmLetterDetails,
          {
            params: {
              letter_id: notWatchFilmLetterData.letter_id,
            },
          }
        )

        return notWatchFilmDetails.data.not_watch_film_letters_detail[0]
      })
    )

    if (i18n.language === 'ja') {
      const getNotWatchFilmDatas = await Promise.all(
        notWatchFilmLetterDatas.map(async (notWatchFilmData) => {
          const result = await axios.get(getFilmsDetails, {
            params: {
              film_id: notWatchFilmData.film_id,
            },
          })
          const { title, poster_path } = result.data
          notWatchFilmData.filmTitle = title
          notWatchFilmData.filmImage = poster_path
          return notWatchFilmData
        })
      )
      const getNotWatchFilmLetterDatasWithUserInfo = await Promise.all(
        getNotWatchFilmDatas.map(async (receivedLetterDataWithUserInfo) => {
          const newResult = await axios.get(getUsersName, {
            params: {
              user_id: receivedLetterDataWithUserInfo.user_id,
            },
          })
          const { name } = newResult.data[0]
          receivedLetterDataWithUserInfo.twitterName = name
          return receivedLetterDataWithUserInfo
        })
      )
      setNotWatchfilmLetterDetails(getNotWatchFilmLetterDatasWithUserInfo)
      setIsLoading(false)
    } else {
      //英語版
      const getNotWatchFilmDatas = await Promise.all(
        notWatchFilmLetterDatas.map(async (notWatchFilmData) => {
          const result = await axios.get(getFilmsDetailsByEnglish, {
            params: {
              film_id: notWatchFilmData.film_id,
            },
          })
          const { title, poster_path } = result.data
          notWatchFilmData.filmTitle = title
          notWatchFilmData.filmImage = poster_path
          return notWatchFilmData
        })
      )
      const getNotWatchFilmLetterDatasWithUserInfo = await Promise.all(
        getNotWatchFilmDatas.map(async (receivedLetterDataWithUserInfo) => {
          const newResult = await axios.get(getUsersName, {
            params: {
              user_id: receivedLetterDataWithUserInfo.user_id,
            },
          })
          const { name } = newResult.data[0]
          receivedLetterDataWithUserInfo.twitterName = name
          return receivedLetterDataWithUserInfo
        })
      )
      setNotWatchfilmLetterDetails(getNotWatchFilmLetterDatasWithUserInfo)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSendLetters()
    setOpenFlash(false)
  }, [])

  //タブを押すとアニメーションで動きをつける
  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue)

      swiper.slideTo(newValue)
    },
    [swiper]
  )

  return (
    <LoggedInLayout>
      {matches ? (
        <>
          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.default',
              mt: '96px',
              textAlign: 'center',
              border: 'balck',
            }}
          >
            <Grid>
              <h2>{user.displayName ? user.displayName : null}</h2>
              <img
                alt=""
                src={user.photoURL && user.photoURL.replace('normal', 'bigger')}
              />
            </Grid>
          </Box>

          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.default',
              textAlign: 'center',
              border: 'balck',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              sx={{ ml: 10 }}
            >
              <Tab
                label={t('mypage.sentFilmLetters')}
                sx={{ color: '#ff9800' }}
                onClick={getSendLetters}
                value={0}
              />

              <Tab
                label={t('mypage.receivedFilmLetters')}
                sx={{ color: '#ff9800' }}
                onClick={handleGetReceivedLetters}
                value={1}
              />
              <Tab
                label={t('mypage.neverSeenFilmLetters')}
                sx={{ color: '#ff9800' }}
                onClick={handleGetNotWatchFilmLetters}
                value={2}
              />
            </Tabs>
          </Box>

          <Swiper
            //スライドコンテンツの間隔
            spaceBetween={50}
            //スライドされるコンテンツの数
            slidesPerView={1}
            //配列の番号に動きがあればその番号の要素をスライドさせる
            onSlideChange={(index) => {
              slideChange(index.activeIndex)
            }}
            // スライドが表示された最初の1回に実行されます。
            onSwiper={(swiper) => {
              const swiperInstance = swiper
              setSwiper(swiperInstance)
            }}
            //手動のスライドをなくす
            allowTouchMove={false}
          >
            <SwiperSlide>
              <TabPanel value={value} index={0}>
                <Grid columns={{ xs: 4, sm: 8, md: 12 }}>
                  {isLoading && (
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                      <CircularProgress />
                    </Box>
                  )}

                  {!isLoading && sendLetters.length === 0 ? (
                    <Box
                      sx={{
                        mt: 4,
                        textAlign: 'center',
                      }}
                    >
                      {t('mypage.noSentFilmLetters')}
                    </Box>
                  ) : (
                    sendLetters.map((sendLetter, index) => (
                      <Card
                        sx={{
                          width: 700,
                          height: 700,
                          bgcolor: '#fff3e0',
                          textAlign: 'center',
                          border: 'balck',
                          my: 6,
                          mx: 'auto',
                        }}
                        key={index}
                      >
                        <CardHeader
                          title={sendLetter.filmTitle}
                          titleTypographyProps={{ variant: 'h5' }}
                          sx={{ color: 'black', textAlign: 'center', pt: 2 }}
                        />
                        {i18n.language === 'ja' ? (
                          <CardContent>
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`${getFilmDetail}/${sendLetter.film_id}`}
                              underline="hover"
                            >
                              <CardMedia
                                height="400px"
                                component="img"
                                image={`${filmsImgSmall}/${sendLetter.filmImage}`}
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
                              href={`${getFilmDetail}/${sendLetter.film_id}/en`}
                              underline="hover"
                            >
                              <CardMedia
                                height="400px"
                                component="img"
                                image={`${filmsImgSmall}/${sendLetter.filmImage}`}
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
                            sx={{ mt: 5, mx: 'auto' }}
                            onClick={() => handleOpenModal(sendLetter)}
                          >
                            {t('recommendPoint')}
                          </Button>
                        </CardActions>
                      </Card>
                    ))
                  )}
                </Grid>
              </TabPanel>
            </SwiperSlide>

            <SwiperSlide>
              <TabPanel value={value} index={1}>
                <Grid columns={{ xs: 4, sm: 8, md: 12 }}>
                  {isLoading && (
                    <Box sx={{ textAlign: 'center', mt: 10 }}>
                      <CircularProgress />
                    </Box>
                  )}

                  {!isLoading && receivedLetterDetails.length === 0 ? (
                    <Box
                      sx={{
                        mt: 4,
                        textAlign: 'center',
                      }}
                    >
                      {t('mypage.noReceivedFilmLetters')}
                    </Box>
                  ) : (
                    receivedLetterDetails.map((receivedLetterDetail, index) => (
                      <Card
                        sx={{
                          width: 700,
                          height: 700,
                          bgcolor: '#fff3e0',
                          textAlign: 'center',
                          border: 'balck',
                          my: 6,
                          mx: 'auto',
                        }}
                        key={index}
                      >
                        <CardHeader
                          title={receivedLetterDetail.filmTitle}
                          titleTypographyProps={{ variant: 'h5' }}
                          sx={{ color: 'black', textAlign: 'center', pt: 2 }}
                        />
                        {i18n.language === 'ja' ? (
                          <CardContent>
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`${getFilmDetail}/${receivedLetterDetail.film_id}`}
                              underline="hover"
                            >
                              <CardMedia
                                height="400px"
                                component="img"
                                image={`${filmsImgSmall}/${receivedLetterDetail.filmImage}`}
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
                              href={`${getFilmDetail}/${receivedLetterDetail.film_id}/en`}
                              underline="hover"
                            >
                              <CardMedia
                                height="400px"
                                component="img"
                                image={`${filmsImgSmall}/${receivedLetterDetail.filmImage}`}
                                sx={{ objectFit: 'contain' }}
                                alt=""
                              />
                            </Link>
                          </CardContent>
                        )}

                        <CardActions>
                          <Button
                            variant="contained"
                            disableElevation
                            sx={{ mt: 5, mx: 'auto' }}
                            onClick={() =>
                              handleOpenModal(receivedLetterDetail)
                            }
                          >
                            {t('recommendPoint')}
                          </Button>
                        </CardActions>
                        <CardActions sx={{ ml: 3, my: 1 }}>
                          <TwitterShareButton
                            title={t(`twitterShareContent`, {
                              film: receivedLetterDetail.filmTitle,
                              twitterUser: receivedLetterDetail.twitterName,
                            })}
                            // title={`「${movieData.movieTitle}」は@${movieData.twitterUserName}さんのおすすめ映画です！`}
                            hashtags={['映画で人と繋がりたい', 'FilmConnect']}
                            url={'https://filmconnect.jp'}
                          >
                            <TwitterIcon size={'55px'} round />
                          </TwitterShareButton>
                        </CardActions>
                      </Card>
                    ))
                  )}
                </Grid>
              </TabPanel>
            </SwiperSlide>

            {/* 観たことない映画レター一覧 */}
            <SwiperSlide>
              <TabPanel value={value} index={2}>
                <Grid columns={{ xs: 4, sm: 8, md: 12 }}>
                  {isLoading && (
                    <Box sx={{ textAlign: 'center', mt: 10 }}>
                      <CircularProgress />
                    </Box>
                  )}

                  {!isLoading && notWatchfilmLetterDetails.length === 0 ? (
                    <Box
                      sx={{
                        mt: 4,
                        textAlign: 'center',
                      }}
                    >
                      {t('mypage.neverSeenFilmLettersDescription')}
                    </Box>
                  ) : (
                    notWatchfilmLetterDetails.map(
                      (notWatchfilmLetterDetail, index) => (
                        <Card
                          sx={{
                            width: 700,
                            height: 700,
                            bgcolor: '#fff3e0',
                            textAlign: 'center',
                            border: 'balck',
                            my: 6,
                            mx: 'auto',
                          }}
                          key={index}
                        >
                          <CardHeader
                            title={notWatchfilmLetterDetail.filmTitle}
                            titleTypographyProps={{ variant: 'h5' }}
                            sx={{ color: 'black', textAlign: 'center', pt: 2 }}
                          />
                          {i18n.language === 'ja' ? (
                            <CardContent>
                              <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${getFilmDetail}/${notWatchfilmLetterDetail.film_id}`}
                                underline="hover"
                              >
                                <CardMedia
                                  height="400px"
                                  component="img"
                                  image={`${filmsImgSmall}/${notWatchfilmLetterDetail.filmImage}`}
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
                                href={`${getFilmDetail}/${notWatchfilmLetterDetail.film_id}/en`}
                                underline="hover"
                              >
                                <CardMedia
                                  height="400px"
                                  component="img"
                                  image={`${filmsImgSmall}/${notWatchfilmLetterDetail.filmImage}`}
                                  sx={{ objectFit: 'contain' }}
                                  alt=""
                                />
                              </Link>
                            </CardContent>
                          )}

                          <CardActions>
                            <Button
                              variant="contained"
                              disableElevation
                              sx={{ mt: 5, mx: 'auto' }}
                              onClick={() =>
                                handleOpenModal(notWatchfilmLetterDetail)
                              }
                            >
                              {t(`recommendPoint`)}
                            </Button>
                          </CardActions>
                          <CardActions sx={{ ml: 3, my: 1 }}>
                            <TwitterShareButton
                              title={t(`twitterShareContent`, {
                                film: notWatchfilmLetterDetail.filmTitle,
                                twitterUser:
                                  notWatchfilmLetterDetail.twitterName,
                              })}
                              // title={`「${movieData.movieTitle}」は@${movieData.twitterUserName}さんのおすすめ映画です！`}
                              hashtags={['映画で人と繋がりたい', 'FilmConnect']}
                              url={'https://filmconnect.jp'}
                            >
                              <TwitterIcon size={'55px'} round />
                            </TwitterShareButton>
                          </CardActions>
                        </Card>
                      )
                    )
                  )}
                </Grid>
              </TabPanel>
            </SwiperSlide>
          </Swiper>
          <RecommendPointModal
            open={openModal}
            onClose={handleCloseModal}
            recommendData={recommendData}
          />
        </>
      ) : (
        <>
          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.default',
              mt: '96px',
              textAlign: 'center',
              border: 'balck',
            }}
          >
            <Grid>
              <h2>{user.displayName ? user.displayName : null}</h2>
              <img
                alt=""
                src={user.photoURL && user.photoURL.replace('normal', 'bigger')}
              />
            </Grid>
          </Box>

          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.default',
              textAlign: 'center',
              border: 'balck',
            }}
          >
            {matchLowWidth ? (
              <Tabs value={value} onChange={handleChange}>
                <Tab
                  label={t('mypage.sentFilmLetters')}
                  sx={{
                    color: '#ff9800',
                    fontSize: '11px',
                    '@media screen and (width:280px)': {
                      fontSize: '0.3px',
                    },
                  }}
                  onClick={getSendLetters}
                  value={0}
                />

                <Tab
                  label={t('mypage.receivedFilmLetters')}
                  sx={{
                    color: '#ff9800',
                    fontSize: '11px',
                    '@media screen and (width:280px)': {
                      fontSize: '1px',
                    },
                  }}
                  onClick={handleGetReceivedLetters}
                  value={1}
                />
                <Tab
                  label={t('mypage.neverSeenFilmLetters')}
                  sx={{
                    color: '#ff9800',
                    fontSize: '11px',
                    '@media screen and (width:280px)': {
                      fontSize: '0.5px',
                    },
                  }}
                  onClick={handleGetNotWatchFilmLetters}
                  value={2}
                />
              </Tabs>
            ) : (
              <Tabs value={value} onChange={handleChange} centered>
                <Tab
                  label={t('mypage.sentFilmLetters')}
                  sx={{ color: '#ff9800', fontSize: '11px' }}
                  onClick={getSendLetters}
                  value={0}
                />

                <Tab
                  label={t('mypage.receivedFilmLetters')}
                  sx={{ color: '#ff9800', fontSize: '11px' }}
                  onClick={handleGetReceivedLetters}
                  value={1}
                />
                <Tab
                  label={t('mypage.neverSeenFilmLetters')}
                  sx={{ color: '#ff9800', fontSize: '11px' }}
                  onClick={handleGetNotWatchFilmLetters}
                  value={2}
                />
              </Tabs>
            )}
          </Box>

          <Swiper
            //スライドコンテンツの間隔
            spaceBetween={50}
            //スライドされるコンテンツの数
            slidesPerView={1}
            //配列の番号に動きがあればその番号の要素をスライドさせる
            onSlideChange={(index) => {
              slideChange(index.activeIndex)
            }}
            // スライドが表示された最初の1回に実行されます。
            onSwiper={(swiper) => {
              const swiperInstance = swiper
              setSwiper(swiperInstance)
            }}
            //手動のスライドをなくす
            allowTouchMove={false}
          >
            <SwiperSlide>
              <TabPanel value={value} index={0}>
                <Grid columns={{ xs: 4, sm: 8, md: 12 }}>
                  {isLoading && (
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                      <CircularProgress />
                    </Box>
                  )}

                  {!isLoading && sendLetters.length === 0 ? (
                    <Box
                      sx={{
                        mt: 4,
                        textAlign: 'center',
                      }}
                    >
                      {t('mypage.noSentFilmLetters')}
                    </Box>
                  ) : (
                    sendLetters.map((sendLetter, index) => (
                      <Card
                        sx={{
                          width: 300,
                          height: 670,
                          bgcolor: '#fff3e0',
                          textAlign: 'center',
                          border: 'balck',
                          my: 6,
                          mx: 'auto',
                          '@media screen and (max-width:280px)': {
                            my: 6,
                            mx: -4,
                          },
                        }}
                        key={index}
                      >
                        <CardHeader
                          title={sendLetter.filmTitle}
                          titleTypographyProps={{ variant: 'h7' }}
                          sx={{ color: 'black', textAlign: 'center', pt: 2 }}
                        />
                        {i18n.language === 'ja' ? (
                          <CardContent>
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`${getFilmDetail}/${sendLetter.film_id}`}
                              underline="hover"
                            >
                              <CardMedia
                                height="400px"
                                component="img"
                                image={`${filmsImgSmall}/${sendLetter.filmImage}`}
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
                              href={`${getFilmDetail}/${sendLetter.film_id}/en`}
                              underline="hover"
                            >
                              <CardMedia
                                height="400px"
                                component="img"
                                image={`${filmsImgSmall}/${sendLetter.filmImage}`}
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
                            sx={{ mt: 5, mx: 'auto' }}
                            onClick={() => handleOpenModal(sendLetter)}
                          >
                            {t('recommendPoint')}
                          </Button>
                        </CardActions>
                      </Card>
                    ))
                  )}
                </Grid>
              </TabPanel>
            </SwiperSlide>

            <SwiperSlide>
              <TabPanel value={value} index={1}>
                <Grid columns={{ xs: 4, sm: 8, md: 12 }}>
                  {isLoading && (
                    <Box sx={{ textAlign: 'center', mt: 10 }}>
                      <CircularProgress />
                    </Box>
                  )}

                  {!isLoading && receivedLetterDetails.length === 0 ? (
                    <Box
                      sx={{
                        mt: 4,
                        textAlign: 'center',
                      }}
                    >
                      {t('mypage.noReceivedFilmLetters')}
                    </Box>
                  ) : (
                    receivedLetterDetails.map((receivedLetterDetail, index) => (
                      <Card
                        sx={{
                          width: 300,
                          height: 670,
                          bgcolor: '#fff3e0',
                          textAlign: 'center',
                          border: 'balck',
                          my: 6,
                          mx: 'auto',
                          '@media screen and (max-width:280px)': {
                            my: 6,
                            mx: -4,
                          },
                        }}
                        key={index}
                      >
                        <CardHeader
                          title={receivedLetterDetail.filmTitle}
                          titleTypographyProps={{ variant: 'h7' }}
                          sx={{ color: 'black', textAlign: 'center', pt: 2 }}
                        />
                        {i18n.language === 'ja' ? (
                          <CardContent>
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`${getFilmDetail}/${receivedLetterDetail.film_id}`}
                              underline="hover"
                            >
                              <CardMedia
                                height="400px"
                                component="img"
                                image={`${filmsImgSmall}/${receivedLetterDetail.filmImage}`}
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
                              href={`${getFilmDetail}/${receivedLetterDetail.film_id}/en`}
                              underline="hover"
                            >
                              <CardMedia
                                height="400px"
                                component="img"
                                image={`${filmsImgSmall}/${receivedLetterDetail.filmImage}`}
                                sx={{ objectFit: 'contain' }}
                                alt=""
                              />
                            </Link>
                          </CardContent>
                        )}

                        <CardActions>
                          <Button
                            variant="contained"
                            disableElevation
                            sx={{ mt: 1, mx: 'auto', width: '200px' }}
                            onClick={() =>
                              handleOpenModal(receivedLetterDetail)
                            }
                          >
                            {t('recommendPoint')}
                          </Button>
                        </CardActions>
                        <CardActions sx={{ my: 1 }}>
                          <TwitterShareButton
                            title={t(`twitterShareContent`, {
                              film: receivedLetterDetail.filmTitle,
                              twitterUser: receivedLetterDetail.twitterName,
                            })}
                            // title={`「${movieData.movieTitle}」は@${movieData.twitterUserName}さんのおすすめ映画です！`}
                            hashtags={['映画で人と繋がりたい', 'FilmConnect']}
                            url={'https://filmconnect.jp'}
                          >
                            <TwitterIcon size={'55px'} round />
                          </TwitterShareButton>
                        </CardActions>
                      </Card>
                    ))
                  )}
                </Grid>
              </TabPanel>
            </SwiperSlide>
            <SwiperSlide>
              <TabPanel value={value} index={2}>
                <Grid columns={{ xs: 4, sm: 8, md: 12 }}>
                  {isLoading && (
                    <Box sx={{ textAlign: 'center', mt: 10 }}>
                      <CircularProgress />
                    </Box>
                  )}

                  {!isLoading && notWatchfilmLetterDetails.length === 0 ? (
                    <Box
                      sx={{
                        mt: 4,
                        textAlign: 'center',
                      }}
                    >
                      {t('mypage.neverSeenFilmLettersDescription')}
                    </Box>
                  ) : (
                    notWatchfilmLetterDetails.map(
                      (notWatchfilmLetterDetail, index) => (
                        <Card
                          sx={{
                            width: 300,
                            height: 700,
                            bgcolor: '#fff3e0',
                            textAlign: 'center',
                            border: 'balck',
                            my: 6,
                            mx: 'auto',
                            '@media screen and (max-width:280px)': {
                              my: 6,
                              mx: -4,
                            },
                          }}
                          key={index}
                        >
                          <CardHeader
                            title={notWatchfilmLetterDetail.filmTitle}
                            titleTypographyProps={{ variant: 'h5' }}
                            sx={{ color: 'black', textAlign: 'center', pt: 2 }}
                          />
                          {i18n.language === 'ja' ? (
                            <CardContent>
                              <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${getFilmDetail}/${notWatchfilmLetterDetail.film_id}`}
                                underline="hover"
                              >
                                <CardMedia
                                  height="400px"
                                  component="img"
                                  image={`${filmsImgSmall}/${notWatchfilmLetterDetail.filmImage}`}
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
                                href={`${getFilmDetail}/${notWatchfilmLetterDetail.film_id}/en`}
                                underline="hover"
                              >
                                <CardMedia
                                  height="400px"
                                  component="img"
                                  image={`${filmsImgSmall}/${notWatchfilmLetterDetail.filmImage}`}
                                  sx={{ objectFit: 'contain' }}
                                  alt=""
                                />
                              </Link>
                            </CardContent>
                          )}

                          <CardActions>
                            <Button
                              variant="contained"
                              disableElevation
                              sx={{ mt: 1, mx: 'auto' }}
                              onClick={() =>
                                handleOpenModal(notWatchfilmLetterDetail)
                              }
                            >
                              {t('recommendPoint')}
                            </Button>
                          </CardActions>
                          <CardActions sx={{ my: 1 }}>
                            <TwitterShareButton
                              title={t(`twitterShareContent`, {
                                film: notWatchfilmLetterDetail.filmTitle,
                                twitterUser:
                                  notWatchfilmLetterDetail.twitterName,
                              })}
                              // title={`「${movieData.movieTitle}」は@${movieData.twitterUserName}さんのおすすめ映画です！`}
                              hashtags={['映画で人と繋がりたい', 'FilmConnect']}
                              url={'https://filmconnect.jp'}
                            >
                              <TwitterIcon size={'55px'} round />
                            </TwitterShareButton>
                          </CardActions>
                        </Card>
                      )
                    )
                  )}
                </Grid>
              </TabPanel>
            </SwiperSlide>
          </Swiper>
          <RecommendPointModal
            open={openModal}
            onClose={handleCloseModal}
            recommendData={recommendData}
          />
        </>
      )}
    </LoggedInLayout>
  )
}

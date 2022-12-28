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
  Typography,
  CircularProgress,
} from '@mui/material'
import { MyContext } from '@/App'
import axios from 'axios'

import {
  getMadeLetters,
  getFilmsDetails,
  getReceivedLetters,
  getReceivedLettersData,
  filmsImgSmall,
} from '@/urls'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { RecommendPointModal } from '../modals'
import { useCallback } from 'react'

// import Typography from '@mui/material/Typography'

export const MyPage = () => {
  const [swiper, setSwiper] = useState(null)
  const [value, setValue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const slideChange = (index) => {
    setValue(index)
  }

  const [user] = useContext(MyContext)

  const [sendLetters, setSendLetters] = useState([])

  const [receivedLetterDetails, setReceivedLetterDetails] = useState([])

  // const [open] = useAtom(handleFadeModal)
  // const [movieData] = useAtom(recieveMovieDataAtom)

  // const [open, setOpen] = useState(false)

  // const [checked, setChecked] = useState(false)

  function TabPanel(props) {
    const { children, value, index } = props

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={index}
        aria-labelledby={index}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </Box>
    )
  }

  const handleOpenModal = useCallback((film) => {
    setRecommendData(film.recommend_point)
    setOpenModal(true)
  },[])

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
  },[])

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

    const newGetReceivedLetters = await Promise.all(
      newReceivedLetters.map(async (receivedLetterData) => {
        //これを一つの配列にまとめたい

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
    setReceivedLetterDetails(newGetReceivedLetters)
    setIsLoading(false)
  }

  useEffect(() => {
    getSendLetters()
    
  }, [])

  //タブを押すとアニメーションで動きをつける
  const handleChange = useCallback((event, newValue) => {
    setValue(newValue)

    swiper.slideTo(newValue)
  }, [swiper] )

  return (
    <LoggedInLayout>
      {/* アイコンと名前 */}

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

      {/* タブの表示 */}
      <Box
        sx={{
          width: '100%',
          bgcolor: 'background.default',
          textAlign: 'center',
          border: 'balck',
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label="送信済みレター"
            sx={{ color: '#ff9800' }}
            onClick={getSendLetters}
            value={0}
          />

          <Tab
            label="受け取ったレター"
            sx={{ color: '#ff9800' }}
            onClick={handleGetReceivedLetters}
            value={1}
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
        allowTouchMove ={false}
      >
        {/* sendLetter */}

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
                  送信したレターはありません
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
                      titleTypographyProps = {{variant:"h5"}}
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
                        image={`${filmsImgSmall}/${sendLetter.filmImage}`}
                        sx={{ objectFit: 'contain' }}
                        alt=""
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        // disableElevation
                        sx={{ mt: 5, mx: 'auto' }}
                        onClick={() => handleOpenModal(sendLetter)}
                      >
                        おすすめポイントを見る
                      </Button>
                    </CardActions>
                  </Card>
                ))
              )}
            </Grid>
          </TabPanel>
        </SwiperSlide>

        {/* recievedLetter */}

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
                  受け取ったレターはありません
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
                      titleTypographyProps = {{variant:"h5"}}
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
                        image={`${filmsImgSmall}/${receivedLetterDetail.filmImage}`}
                        sx={{ objectFit: 'contain' }}
                        alt=""
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{ mt: 5, mx: 'auto' }}
                        onClick={() => handleOpenModal(receivedLetterDetail)}
                      >
                        おすすめポイントを見る
                      </Button>
                    </CardActions>

                  </Card>
                ))
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
    </LoggedInLayout>
  )
}

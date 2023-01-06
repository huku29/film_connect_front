import { LoggedInLayout } from '@/components/layouts'
import {
  Box,
  Grid,
  List,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Link,
} from '@mui/material'
import { filmsimg, getFilmDetail } from '@/urls'
//JOTAI
import { useAtom } from 'jotai'
import {
  handleGetCreatedLettersRankingAtom,
  handleGetFirstSawFilmsRankingAtom,
} from '@/jotai/atoms'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { useState, useCallback, useEffect } from 'react'

import axios from 'axios'
import {
  getFilmsDetails,
  getCreatedLettersRanking,
  firstSawFilmLettersRanking,
} from '@/urls'

import useMediaQuery from '@mui/material/useMediaQuery'

export const Ranking = () => {
  const [filmRank, setFilmRank] = useAtom(handleGetCreatedLettersRankingAtom)
  const [swiper, setSwiper] = useState(null)
  const [value, setValue] = useState(0)
  const [sawFilmRank, setSawFilmRank] = useAtom(
    handleGetFirstSawFilmsRankingAtom
  )
  const [isLoading, setIsLoading] = useState(false)

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

  const handleChange = useCallback(
    (event, newValue) => {
      setValue(newValue)

      swiper.slideTo(newValue)
    },

    [swiper]
  )

  const getCreatedLettersRank = async () => {
    if (filmRank.length !== 0) return
    setIsLoading(true)
    const res = await axios.get(getCreatedLettersRanking)
    const filmsRankingData = res.data

    const rankingDatas = await Promise.all(
      filmsRankingData.map(async (rankingData) => {
        const result = await axios.get(getFilmsDetails, {
          params: {
            movie_id: rankingData,
          },
        })
        return result.data
      })
    )
    setFilmRank(rankingDatas)
    setIsLoading(false)
  }

  const slideChange = (index) => {
    setValue(index)
  }

  const getFirstSawFilmsRank = async () => {
    if (sawFilmRank.length !== 0) return
    setIsLoading(true)
    const res = await axios.get(firstSawFilmLettersRanking)
    const firstSawRankingDatas = res.data

    const firstSaeFilmsRankDatas = await Promise.all(
      firstSawRankingDatas.map(async (firseSawFilmData) => {
        const result = await axios.get(getFilmsDetails, {
          params: {
            movie_id: firseSawFilmData,
          },
        })
        return result.data
      })
    )

    setSawFilmRank(firstSaeFilmsRankDatas)
    setIsLoading(false)
  }

  useEffect(() => {
    getCreatedLettersRank()
  }, [])

  const matches = useMediaQuery('(min-width:575px)')

  return (
    <LoggedInLayout>
      {matches ? (
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.default',
            textAlign: 'center',
            border: 'balck',
          }}
        >
          <Typography variant="h4" sx={{ mt: 15, mb: 5, textAlign: 'center' }}>
            映画ランキング
          </Typography>
          <Tabs value={value} onChange={handleChange} centered sx={{ mb: 5 }}>
            <Tab
              label="おすすめされた映画ランキング"
              // icon={}
              sx={{ color: '#ff9800' }}
              onClick={getCreatedLettersRank}
              value={0}
            />

            <Tab
              label="観たことない映画ランキング"
              // icon={<EqualizerIcon />}
              sx={{ color: '#ff9800' }}
              onClick={getFirstSawFilmsRank}
              value={1}
            />
          </Tabs>

          <Box>
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
                  {filmRank.map((film, index) =>
                    film.poster_path ? (
                      <Grid
                        item
                        xs={2}
                        sm={4}
                        md={4}
                        key={index}
                        sx={{ textAlign: 'center' }}
                      >
                        {isLoading && (
                          <Box sx={{ textAlign: 'center', mt: 6 }}>
                            <CircularProgress />
                          </Box>
                        )}
                        {!isLoading && film.length === 0 ? (
                          <Box
                            sx={{
                              mt: 4,
                              textAlign: 'center',
                            }}
                          >
                            作成された映画ランキングがありません
                          </Box>
                        ) : (
                          <>
                            <Typography
                              variant="h4"
                              sx={{ textAlign: 'center' }}
                            >
                              {`--${index + 1}位--`}
                            </Typography>
                            <Box
                              key={index}
                              sx={{
                                textAligh: 'center',
                              }}
                            >
                              <List>
                                <Link
                                  target="_blank"
                                  rel="noopener"
                                  href={`${getFilmDetail}/${film.id}`}
                                  underline="hover"
                                >
                                  <img
                                    alt=""
                                    src={`${filmsimg}/${film.poster_path}`}
                                  ></img>
                                </Link>
                              </List>
                              <Box sx={{ mb: 7 }}>{film.title}</Box>
                            </Box>
                          </>
                        )}
                      </Grid>
                    ) : null
                  )}
                </TabPanel>
              </SwiperSlide>
              <SwiperSlide>
                <TabPanel value={value} index={1}>
                  {sawFilmRank.map((film, index) =>
                    film.poster_path ? (
                      <Grid
                        item
                        xs={2}
                        sm={4}
                        md={4}
                        key={index}
                        sx={{ textAlign: 'center' }}
                      >
                        {isLoading && (
                          <Box sx={{ textAlign: 'center', mt: 10 }}>
                            <CircularProgress />
                          </Box>
                        )}

                        {!isLoading && film.length === 0 ? (
                          <Box
                            sx={{
                              mt: 4,
                              textAlign: 'center',
                            }}
                          >
                            観たことない映画ランキングはありません
                          </Box>
                        ) : (
                          <>
                            <Typography
                              variant="h4"
                              sx={{ textAlign: 'center' }}
                            >
                              {`--${index + 1}位--`}
                            </Typography>
                            <Box
                              key={index}
                              sx={{
                                textAligh: 'center',
                              }}
                            >
                              <List
                                sx={{
                                  '@media screen and (width:280px)': {
                                    textAligh: 'center',
                                  },
                                }}
                              >
                                <Link
                                  target="_blank"
                                  rel="noopener"
                                  href={`${getFilmDetail}/${film.id}`}
                                  underline="hover"
                                >
                                  <img
                                    alt=""
                                    src={`${filmsimg}/${film.poster_path}`}
                                  ></img>
                                </Link>
                              </List>
                              <Box sx={{ mb: 7 }}>{film.title}</Box>
                            </Box>
                          </>
                        )}
                      </Grid>
                    ) : null
                  )}
                </TabPanel>
              </SwiperSlide>
            </Swiper>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.default',
            textAlign: 'center',
            border: 'balck',
          }}
        >
          <Typography variant="h4" sx={{ mt: 15, mb: 5, textAlign: 'center' }}>
            映画ランキング
          </Typography>
          <Tabs value={value} onChange={handleChange} centered sx={{ mb: 5 }}>
            <Tab
              label="おすすめされた映画"
              // icon={}
              sx={{
                color: '#ff9800',
                fontSize: '11px',
                '@media screen and (width:280px)': {
                  fontSize: '0.px',
                },
              }}
              onClick={getCreatedLettersRank}
              value={0}
            />

            <Tab
              label="観たことない映画"
              // icon={<EqualizerIcon />}
              sx={{
                color: '#ff9800',
                fontSize: '11px',
                '@media screen and (width:280px)': {
                  fontSize: '1px',
                },
              }}
              onClick={getFirstSawFilmsRank}
              value={1}
            />
          </Tabs>

          <Box>
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
                  {filmRank.map((film, index) =>
                    film.poster_path ? (
                      <Grid
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        item
                        key={index}
                        sx={{ textAlign: 'center' }}
                      >
                        {isLoading && (
                          <Box sx={{ textAlign: 'center', mt: 6 }}>
                            <CircularProgress />
                          </Box>
                        )}
                        {!isLoading && film.length === 0 ? (
                          <Box
                            sx={{
                              mt: 4,
                              textAlign: 'center',
                            }}
                          >
                            作成された映画レターランキングがありません
                          </Box>
                        ) : (
                          <>
                            <Typography
                              variant="h4"
                              sx={{ textAlign: 'center' }}
                            >
                              {`--${index + 1}位--`}
                            </Typography>
                            <Box
                              key={index}
                              sx={{
                                textAligh: 'center',
                              }}
                            >
                              <List
                                sx={{
                                  textAlign: 'center',
                                  '@media screen and (width:280px)': {
                                    ml: -4,
                                    width: '100%',
                                  },
                                }}
                              >
                                <Link
                                  target="_blank"
                                  rel="noopener"
                                  href={`${getFilmDetail}/${film.id}`}
                                  underline="hover"
                                >
                                  <img
                                    alt=""
                                    src={`${filmsimg}/${film.poster_path}`}
                                  ></img>
                                </Link>
                              </List>
                              <Box sx={{ mb: 7 }}>{film.title}</Box>
                            </Box>
                          </>
                        )}
                      </Grid>
                    ) : null
                  )}
                </TabPanel>
              </SwiperSlide>
              <SwiperSlide>
                <TabPanel value={value} index={1}>
                  {sawFilmRank.map((film, index) =>
                    film.poster_path ? (
                      <Grid item key={index} sx={{ textAlign: 'center' }}>
                        {isLoading && (
                          <Box sx={{ textAlign: 'center', mt: 10 }}>
                            <CircularProgress />
                          </Box>
                        )}

                        {!isLoading && film.length === 0 ? (
                          <Box
                            sx={{
                              mt: 4,
                              textAlign: 'center',
                            }}
                          >
                            観たことない映画ランキングがありません
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              textAlign: 'center',
                              '@media screen and (width:280px)': {
                                width: '100%',
                              },
                            }}
                          >
                            <Typography
                              variant="h4"
                              sx={{ textAlign: 'center' }}
                            >
                              {`--${index + 1}位--`}
                            </Typography>
                            <Box
                              key={index}
                              sx={{
                                textAligh: 'center',
                              }}
                            >
                              <List
                                sx={{
                                  textAlign: 'center',
                                  '@media screen and (width:280px)': {
                                    ml: -4,
                                    width: '100%',
                                  },
                                }}
                              >
                                <Link
                                  target="_blank"
                                  rel="noopener"
                                  href={`${getFilmDetail}/${film.id}`}
                                  underline="hover"
                                >
                                  <img
                                    alt=""
                                    src={`${filmsimg}/${film.poster_path}`}
                                  ></img>
                                </Link>
                              </List>

                              <Box sx={{ mb: 7 }}>{film.title}</Box>
                            </Box>
                          </Box>
                        )}
                      </Grid>
                    ) : null
                  )}
                </TabPanel>
              </SwiperSlide>
            </Swiper>
          </Box>
        </Box>
      )}
    </LoggedInLayout>
  )
}
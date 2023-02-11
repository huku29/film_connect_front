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
  handleSendFlashMessage,
} from '@/jotai/atoms'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { useState, useCallback, useEffect } from 'react'

import axios from 'axios'
import {
  getFilmsDetails,
  getCreatedLettersRanking,
  notWatchFilmLettersRanking,
  getFilmsDetailsByEnglish,
} from '@/urls'

import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'

export const Ranking = () => {
  const [filmRank, setFilmRank] = useAtom(handleGetCreatedLettersRankingAtom)
  const [swiper, setSwiper] = useState(null)
  const [value, setValue] = useState(0)
  const [sawFilmRank, setSawFilmRank] = useAtom(
    handleGetFirstSawFilmsRankingAtom
  )
  const [openFlash, setOpenFlash] = useAtom(handleSendFlashMessage)
  const [isLoading, setIsLoading] = useState(false)
  const matches = useMediaQuery('(min-width:575px)')
  const { t, i18n } = useTranslation()

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
    const res = await axios.get(getCreatedLettersRanking)
    const filmsRankingData = res.data


    if (i18n.language === 'ja') {
      const rankingDatas = await Promise.all(
        filmsRankingData.map(async (rankingData) => {
          const result = await axios.get(getFilmsDetails, {
            params: {
              film_id: rankingData,
            },
          })
          return result.data
        })
      )

      setFilmRank(rankingDatas)
      // setIsLoading(false)
    } else {
      const rankingDatas = await Promise.all(
        filmsRankingData.map(async (rankingData) => {
          const result = await axios.get(getFilmsDetailsByEnglish, {
            params: {
              film_id: rankingData,
            },
          })
          return result.data
        })
      )

      setFilmRank(rankingDatas)
      // setIsLoading(false)
    }
  }

  const slideChange = (index) => {
    setValue(index)
  }

  const getFirstSawFilmsRank = async () => {
    // if (sawFilmRank.length !== 0) return
    // setIsLoading(true)
    const res = await axios.get(notWatchFilmLettersRanking)
    const firstSawRankingDatas = res.data

    if (i18n.language === 'ja') {
      const firstSawFilmsRankDatas = await Promise.all(
        firstSawRankingDatas.map(async (firseSawFilmData) => {
          const result = await axios.get(getFilmsDetails, {
            params: {
              film_id: firseSawFilmData,
            },
          })
          return result.data
        })
      )
      setSawFilmRank(firstSawFilmsRankDatas)
      // setIsLoading(false)
    } else {
      const firstSawFilmsRankDatas = await Promise.all(
        firstSawRankingDatas.map(async (firseSawFilmData) => {
          const result = await axios.get(getFilmsDetailsByEnglish, {
            params: {
              film_id: firseSawFilmData,
            },
          })
          return result.data
        })
      )

      setSawFilmRank(firstSawFilmsRankDatas)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getCreatedLettersRank()
    getFirstSawFilmsRank()
    setOpenFlash(false)
  }, [])

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
            {t('ranking.title')}
          </Typography>
          <Tabs value={value} onChange={handleChange} centered sx={{ mb: 5 }}>
            <Tab
              label={t('ranking.recommendedFilmRanking')}
              // icon={}
              sx={{ color: '#ff9800' }}
              onClick={getCreatedLettersRank}
              value={0}
            />

            <Tab
              label={t('ranking.neverSeenFilmRanking')}
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
                  <Grid item xs={2} sm={4} md={4} sx={{ textAlign: 'center' }}>
                    {isLoading && (
                      <Box sx={{ textAlign: 'center', mt: 10 }}>
                        <CircularProgress />
                      </Box>
                    )}

                    {!isLoading && filmRank.length === 0 ? (
                      <Box
                        sx={{
                          mt: 4,
                          textAlign: 'center',
                        }}
                      >
                        {/* {t('ranking.noRecommendedFilmRanking')} */}
                      </Box>
                    ) : (
                      filmRank.map((film, index) => (
                        <Box key={index}>
                          <Typography variant="h4" sx={{ textAlign: 'center' }}>
                            {t('ranking.rank', { rank: index + 1 })}
                          </Typography>
                          <Box
                            sx={{
                              textAligh: 'center',
                            }}
                          >
                            <List>
                              <img
                                alt=""
                                src={`${filmsimg}/${film.poster_path}`}
                              ></img>
                              <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${getFilmDetail}/${film.id}`}
                                underline="hover"
                              >
                                <Box sx={{ mb: 7 }}>
                                  {' '}
                                  {t(`search.details`, { title: film.title })}
                                </Box>
                              </Link>
                            </List>
                          </Box>
                        </Box>
                      ))
                    )}
                  </Grid>
                </TabPanel>
              </SwiperSlide>
              <SwiperSlide>
                <TabPanel value={value} index={1}>
                  <Grid item xs={2} sm={4} md={4} sx={{ textAlign: 'center' }}>
                    {isLoading && (
                      <Box sx={{ textAlign: 'center', mt: 10 }}>
                        <CircularProgress />
                      </Box>
                    )}

                    {!isLoading && sawFilmRank.length === 0 ? (
                      <Box
                        sx={{
                          mt: 4,
                          textAlign: 'center',
                        }}
                      >
                        {/* {t('ranking.neverSeenFilmRankingDescription')} */}
                      </Box>
                    ) : (
                      sawFilmRank.map((film, index) => (
                        <Box key={index}>
                          <Typography variant="h4" sx={{ textAlign: 'center' }}>
                            {/* {`--${index + 1}位--`} */}
                            {t('ranking.rank', { rank: index + 1 })}
                          </Typography>
                          <Box
                            sx={{
                              textAligh: 'center',
                            }}
                          >
                            <List>
                              <img
                                alt=""
                                src={`${filmsimg}/${film.poster_path}`}
                              ></img>
                              <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${getFilmDetail}/${film.id}`}
                                underline="hover"
                              >
                                <Box sx={{ mb: 7 }}>
                                  {' '}
                                  {t(`search.details`, { title: film.title })}
                                </Box>
                              </Link>
                            </List>
                          </Box>
                        </Box>
                      ))
                    )}
                  </Grid>
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
            {t('ranking.title')}
          </Typography>
          <Tabs value={value} onChange={handleChange} centered sx={{ mb: 5 }}>
            <Tab
              label={t('ranking.recommendedFilmRanking')}
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
              label={t('ranking.neverSeenFilmRanking')}
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
                  <Grid item xs={2} sm={4} md={4} sx={{ textAlign: 'center' }}>
                    {isLoading && (
                      <Box sx={{ textAlign: 'center', mt: 10 }}>
                        <CircularProgress />
                      </Box>
                    )}

                    {!isLoading && filmRank.length === 0 ? (
                      <Box
                        sx={{
                          mt: 4,
                          textAlign: 'center',
                        }}
                      >
                        {/* {t('ranking.noRecommendFilmRanking')} */}
                      </Box>
                    ) : (
                      filmRank.map((film, index) => (
                        <Box key={index}>
                          <Typography variant="h4" sx={{ textAlign: 'center' }}>
                            {/* {`--${index + 1}位--`} */}
                            {t('ranking.rank', { rank: index + 1 })}
                          </Typography>
                          <Box
                            sx={{
                              textAligh: 'center',
                            }}
                          >
                            <List
                              sx={{
                                '@media screen and (width:280px)': {
                                  ml: -4,
                                  width: '100%',
                                },
                              }}
                            >
                              <img
                                alt=""
                                src={`${filmsimg}/${film.poster_path}`}
                              ></img>
                              <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${getFilmDetail}/${film.id}`}
                                underline="hover"
                              >
                                <Box sx={{ mb: 7 }}>
                                  {' '}
                                  {t(`search.details`, { title: film.title })}
                                </Box>
                              </Link>
                            </List>
                          </Box>
                        </Box>
                      ))
                    )}
                  </Grid>
                </TabPanel>
              </SwiperSlide>
              <SwiperSlide>
                <TabPanel value={value} index={1}>
                  <Grid item xs={2} sm={4} md={4} sx={{ textAlign: 'center' }}>
                    {isLoading && (
                      <Box sx={{ textAlign: 'center', mt: 10 }}>
                        <CircularProgress />
                      </Box>
                    )}

                    {!isLoading && sawFilmRank.length === 0 ? (
                      <Box
                        sx={{
                          mt: 4,
                          textAlign: 'center',
                        }}
                      >
                        {/* {t('ranking.neverSeenFilmRankingDescription')} */}
                      </Box>
                    ) : (
                      sawFilmRank.map((film, index) => (
                        <Box key={index}>
                          <Typography variant="h4" sx={{ textAlign: 'center' }}>
                            {t('ranking.rank', { rank: index + 1 })}
                          </Typography>
                          <Box
                            sx={{
                              textAligh: 'center',
                            }}
                          >
                            <List
                              sx={{
                                '@media screen and (width:280px)': {
                                  ml: -4,
                                  width: '100%',
                                },
                              }}
                            >
                              <img
                                alt=""
                                src={`${filmsimg}/${film.poster_path}`}
                              ></img>
                              <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${getFilmDetail}/${film.id}`}
                                underline="hover"
                              >
                                <Box sx={{ mb: 7 }}>
                                  {' '}
                                  {t(`search.details`, { title: film.title })}
                                </Box>
                              </Link>
                            </List>
                          </Box>
                        </Box>
                      ))
                    )}
                  </Grid>
                </TabPanel>
              </SwiperSlide>
            </Swiper>
          </Box>
        </Box>
      )}
    </LoggedInLayout>
  )
}

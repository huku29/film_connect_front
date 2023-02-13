import { useState, useEffect } from 'react'
import { LoggedInLayout } from '@/components/layouts'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import {
  Alert,
  Snackbar,
  Link,
  Button,
  InputBase,
  IconButton,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { filmsimg, getFilmDetail, filmsSearchByEnglish } from '@/urls'
import InfiniteScroll from 'react-infinite-scroller'
import List from '@mui/material/List'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAtom } from 'jotai'
import { handleSendFlashMessage, handleGetSearchWordAtom } from '@/jotai/atoms'

export const SearchEnglish = () => {
  const [searchWord, setSearchWord] = useAtom(handleGetSearchWordAtom)

  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const [open, setOpen] = useAtom(handleSendFlashMessage)

  const navigation = useNavigate()

  const [searchFilm, setSearchFilm] = useState([])

  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  
  const loadMore = () => {
    axios
      .get(filmsSearchByEnglish, {
        params: {
          search_word: searchWord,
          //getMovieApi関数を実行した段階でpageが1の状態だから、ロードしたら＋1しないと最初のスクロール時点では同じ1ページが表示されてしまう
          page: page + 1,
        },
      })
      .then((res) => {
        setSearchFilm([
          ...searchFilm,
          ...(res.data.results ? res.data.results : []),
        ])

        //ページがトータルページの数と同じならsetHasMoreをfalseにする
        if (page === res.data.total_pages) {
          setHasMore(false)
          //
          return
        }

        //もしsetPageの引数にpageだけだと、初回のローディングしかページ数が1づつ増えなくて、2回目以降は2ページのままになってしまう
        setPage(page + 1)
      })
  }

  const getFilmApi = (event) => {
    //エンター押してもリロードされないようにする。標準の動きを止める
    if (event) {
      event.preventDefault()
    }

    axios
      .get(filmsSearchByEnglish, {
        params: {
          search_word: searchWord,
          //getMovieの関数が発火すれば1ページがはじめに出るようにする
          page: 1,
        },
      })
      .then((res) => {
        setSearchFilm(res.data.results ? res.data.results : [])
        //setPageを1にすることでloadMoreの際にpageが1になるようにしている
        setPage(1)
      })
  }

  //画面遷移時に検索結果を初期化する
  useEffect(() => {
    getFilmApi()
    setSearchFilm([])
  }, [])

  const handleChange = (e) => {
    setOpen(false)
    if (e) {
      setSearchWord(e.target.value)
    }
  }

  // const loader = (
  //   <div className="loader" key={0}>
  //     Loading ...
  //   </div>
  // )

  const handleWriteLetter = (film) => {
    const filmTitle = film.title
    const filmImg = film.poster_path
    const filmId = film.id

    navigation('/writeletter', {
      state: {
        filmTitle: filmTitle,
        filmImg: filmImg,
        filmId: filmId,
      },
    })
  }

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(timer)
      }
    }, [value, delay])

    return debouncedValue
  }

  const debouncedInputText = useDebounce(searchWord, 200)

  useEffect(() => {
    getFilmApi()
  }, [debouncedInputText])

  const matches = useMediaQuery('(min-width:575px)')

  return (
    <LoggedInLayout>
      {matches ? (
        <>
          <Paper
            component="form"
            onSubmit={getFilmApi}
            sx={{
              mt: 20,
              ml: 'auto',
              mr: 'auto',
              width: 400,
              textAlign: 'center',
              border: 'balck',
              backgroundColor: 'black',
              position: 'relative',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, width: 330 }}
              placeholder={t('search.field')}
              type="text"
              value={searchWord}
              onChange={handleChange}
            />
            <IconButton type="submit" sx={{ p: '10px', color: 'text.primary' }}>
              <SearchIcon />
            </IconButton>
          </Paper>

          <Box
            sx={{
              flexGrow: 1,
              mt: '5%',
              mb: '5%',
              ml: 'auto',
              mr: 'auto',
              textAlign: 'center',
              display: 'block',
            }}
          >
            <InfiniteScroll
              initialLoad={false}
              loadMore={loadMore} //項目を読み込む際に処理するコールバック関数
              hasMore={hasMore} //読み込みを行うかどうかの判定
              // loader={searchFilm.length > 1 ? loader : null}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Snackbar
                  //レター送信に成功したらalertで表示させる
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  open={open}
                  sx={{ mb: 30, position: 'absolute' }}
                >
                  <Alert variant="filled" severity="success">
                    {t(`search.alert`)}
                  </Alert>
                </Snackbar>

                {searchFilm.length === 0 ? (
                  <>
                    <Box
                      sx={{
                        mt: 20,
                        ml: 'auto',
                        mr: 'auto',
                        textAlign: 'center',
                      }}
                    >
                      {t(`search.searchResults`)}
                    </Box>
                  </>
                ) : (
                  searchFilm.map((film, index) =>
                    film.poster_path ? (
                      <Grid item xs={2} sm={4} md={4} key={index}>
                        <Box sx={{ textAligh: 'center', pt: 5 }}>
                          {film.title}
                        </Box>
                        <Box
                          key={index}
                          sx={{ textAligh: 'center' }}
                          onClick={() => handleWriteLetter(film)}
                        >
                          <List>
                            <Button>
                              <img
                                alt=""
                                src={`${filmsimg}/${film.poster_path}`}
                              ></img>
                            </Button>
                          </List>
                        </Box>

                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${getFilmDetail}/${film.id}/en`}
                          underline="hover"
                        >
                          {/* {`${film.title}の詳細を見る`} */}
                          {/* {`${film.title}${t('search.details')}`} */}
                          {t(`search.details`, { title: film.title })}
                        </Link>
                      </Grid>
                    ) : null
                  )
                )}
              </Grid>
            </InfiniteScroll>
          </Box>
        </>
      ) : (
        <>
          <Snackbar
            //レター送信に成功したらalertで表示させる
            open={open}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            sx={{ top: '470px' }}
          >
            <Alert variant="filled" severity="success" sx={{}}>
              {t(`search.alert`)}
            </Alert>
          </Snackbar>

          <Paper
            component="form"
            onSubmit={getFilmApi}
            sx={{
              mt: '40%',
              ml: 'auto',
              mr: 'auto',
              width: 250,
              textAlign: 'center',
              border: 'balck',
              backgroundColor: 'black',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="映画検索"
              type="text"
              value={searchWord}
              onChange={handleChange}
            />
            <IconButton type="submit" sx={{ p: '10px', color: 'text.primary' }}>
              <SearchIcon />
            </IconButton>
          </Paper>

          <Box sx={{ flexGrow: 1, mt: '5%', ml: 'auto', mr: 'auto' }}>
            <InfiniteScroll
              initialLoad={false}
              loadMore={loadMore} //項目を読み込む際に処理するコールバック関数
              hasMore={hasMore} //読み込みを行うかどうかの判定
              // loader={searchFilm.length > 1 ? loader : null}
            >
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{}}>
                {searchFilm.length === 0 ? (
                  <Box
                    sx={{
                      mt: 20,
                      ml: 'auto',
                      mr: 'auto',
                      textAlign: 'center',
                    }}
                  >
                    {t(`search.searchResults`)}
                  </Box>
                ) : (
                  searchFilm.map((film, index) =>
                    film.poster_path ? (
                      <Grid item xs={2} sm={4} md={4} key={index}>
                        <Box
                          key={index}
                          sx={{
                            textAligh: 'center',
                            ml: 3,
                            pt: 5,
                            mb: '18%',
                            maxWidth: '340px',
                            '@media screen and (min-width:400px)': {
                              textAligh: 'center',
                              mt: 5,
                              ml: 7,
                            },
                            '@media screen and (max-width:281px)': {
                              textAligh: 'center',
                              mt: 5,
                              ml: 'auto',
                              mr: 'auto',
                            },
                            '@media screen and (width:540px)': {
                              textAligh: 'center',
                              mt: 5,
                              ml: 15,
                              mr: 'auto',
                            },
                          }}
                        >
                          <Box sx={{textAlign: 'center'  }}>{film.title}</Box>
                          <List>
                            <Button
                              sx={{ mb: 3,textAlign: 'center'}}
                              onClick={() => handleWriteLetter(film)}
                            >
                              <img
                                alt=""
                                src={`${filmsimg}/${film.poster_path}`}
                              ></img>
                            </Button>
                          </List>
                          <Box sx={{textAlign: 'center'}}>
                          <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`${getFilmDetail}/${film.id}/en`}
                            underline="hover"
                          >
                            {t(`search.details`, { title: film.title })}
                          </Link>
                          </Box>
                        </Box>
                      </Grid>
                    ) : null
                  )
                )}
              </Grid>
            </InfiniteScroll>
          </Box>
        </>
      )}
    </LoggedInLayout>
  )
}

export default SearchEnglish

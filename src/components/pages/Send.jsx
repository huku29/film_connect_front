import { useState, useEffect } from 'react'
import { LoggedInLayout } from '@/components/layouts'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

import { Alert, Snackbar } from '@mui/material'

import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

import axios from 'axios'
import { filmsSearch, filmsimg } from '@/urls'
import InfiniteScroll from 'react-infinite-scroller'
import List from '@mui/material/List'
import { useNavigate, useLocation } from 'react-router-dom'

import { useContext } from 'react'
import { MovieContext } from '@/App'

export const Send = () => {
  const [searchWord, setSearchWord] = useState('')

  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const { state } = useLocation()
  const alertOpen = state && state.alertOpen

  const navigation = useNavigate()

  

  const [searchFilm, setSearchFilm] = useContext(MovieContext)

  const loadMore = () => {
    axios
      .get(filmsSearch, {
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

    event.preventDefault()

    axios
      .get(filmsSearch, {
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
    setSearchFilm([])
  }, [setSearchFilm])

  const handleChange = (e) => {
    setSearchWord(e.target.value)
  }

  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  )

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

  return (
    <LoggedInLayout>
      <Snackbar
        //レター送信に成功したらalertで表示させる
        open={alertOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ height: '20%', maxWidth: '100%', position: 'absolute' }}
      >
        <Alert variant="filled" severity="success" sx={{}}>
          レターが送信されました！
        </Alert>
      </Snackbar>

      <Paper
        component="form"
        onSubmit={getFilmApi}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          position: 'absolute',
          top: '22%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
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

      {/* filterメソッドでも可能？でもまだ書き方が見出せない */}
      <Box
        sx={{
          flexGrow: 1,
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: '80%',
        }}
      >
        <InfiniteScroll
          initialLoad={false}
          loadMore={loadMore} //項目を読み込む際に処理するコールバック関数
          hasMore={hasMore} //読み込みを行うかどうかの判定
          loader={searchFilm.length > 1 ? loader : null}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {searchFilm.map((film, index) =>
              film.poster_path ? (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Box
                    key={index}
                    sx={{ textAligh: 'center' }}
                    onClick={() => handleWriteLetter(film)}
                  >
                    <Box sx={{ textAligh: 'center' }}>{film.title}</Box>

                    <List>
                      <img alt="" src={`${filmsimg}/${film.poster_path}`}></img>
                    </List>
                  </Box>
                </Grid>
              ) : null
            )}
          </Grid>
        </InfiniteScroll>
      </Box>
    </LoggedInLayout>
  )
}

export default Send

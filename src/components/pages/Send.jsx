import { useState, useEffect } from 'react'
import { LoggedInLayout } from '@/components/layouts'
import { Typography, Stack } from '@mui/material'
import { WatchIconButton } from '@/components/buttons/WatchIconButton'
import { SendLetterModal } from '@/components/modals'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

import axios from 'axios'
import {filmsSearch, filmsimg, filmsCheck } from '@/urls'
import InfiniteScroll from 'react-infinite-scroller'
import List from '@mui/material/List'

export const Send = () => {
  const [isOpenModal, setIsOpenmodal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [searchFilm, setSearchFilm] = useState([])
  const [searchWord, setSearchWord] = useState('')

  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  // const onClickLetterButton = () => {
  //   setIsOpenmodal((state) => !state)
  // }

  const handleCloseModal = () => {
    setIsOpenmodal(false)
  }

  const loadMore = () => {
    console.log('loadMore')
    axios
      .get(filmsSearch, {
        params: {
          search_word: searchWord,
          //getMovieApi関数を実行した段階でpageが1の状態だから、ロードしたら＋1しないと最初のスクロール時点では同じ1ページが表示されてしまう
          page: page + 1,
        },
      })
      .then((res) => {
        // setSearchMovie(res.data.results ? res.data.results : [])

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
        console.log(res.data)
        setSearchFilm(res.data.results ? res.data.results : [])
        //setPageを1にすることでloadMoreの際にpageが1になるようにしている
        setPage(1)
      })
  }

  const handleChange = (e) => {
    setSearchWord(e.target.value)
  }

  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  )

  return (
    <LoggedInLayout>
      {/* <SearchForm/> */}
      {/* 映画の検索欄 */}
      {/* formだと画面遷移してしまいデータなくなるから、onSubmitとtypeをsubmitに指定すると画面遷移せずに情報を取ってくる。 */}
      <Paper
        component="form"
        onSubmit={getFilmApi}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          position: 'absolute',
          top: '20%',
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
                  <Box sx={{}}>{film.title}</Box>
                  <div key={index}>
                    <List>
                      <img alt="" src={`${filmsimg}/${film.poster_path}`}></img>
                    </List>
                  </div>
                </Grid>
              ) : null
            )}
          </Grid>
        </InfiniteScroll>
      </Box>

      <SendLetterModal
        open={isOpenModal}
        onClose={handleCloseModal}
        loading={loading}
        setLoading={setLoading}
        success={success}
        setSuccess={setSuccess}
      />
    </LoggedInLayout>
  )
}

export default Send

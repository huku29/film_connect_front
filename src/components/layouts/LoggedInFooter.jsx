import { useState, useContext } from 'react'
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import SearchIcon from '@mui/icons-material/Search'
import RoofingIcon from '@mui/icons-material/Roofing'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getLetter, getNotWatchFilmLetterDatas } from '@/urls'
import { MyContext } from '@/App'
//JOTAI
import { useAtom } from 'jotai'
import {
  recieveMovieDataAtom,
  handleFadeModal,
  handleGetErrorMessageAtom,
  handleSendFlashMessage,
  handleRegistNotWatchFilmAtom,
  handleGetFirstSawFilmLettersIdAtom,
  handleGetSearchWordAtom,
} from '@/jotai/atoms'

export const LoggedInFooter = () => {
  const [value, setValue] = useState(0)

  const navigation = useNavigate()

  const [user] = useContext(MyContext)

  const [, setMovieData] = useAtom(recieveMovieDataAtom)

  const [, setOpenFlash] = useAtom(handleSendFlashMessage)

  const [, setOpen] = useAtom(handleFadeModal)

  const [, setSearchWord] = useAtom(handleGetSearchWordAtom)

  const [, setErrorMessage] = useAtom(handleGetErrorMessageAtom)

  const [, setRegistNotWatchFilm] = useAtom(handleRegistNotWatchFilmAtom)

  const [, setGetFirstSawFilmLettersId] = useAtom(
    handleGetFirstSawFilmLettersIdAtom
  )

  const handleGetLetter = async () => {
    const token = await user.getIdToken(true)
    const config = { headers: { authorization: `Bearer ${token}` } }

    axios.get(getLetter, config).then(async (res) => {
      //受け取れるレターがなければ、メッセージを渡す
      if (res.data.message) {
        setErrorMessage(res.data.message)
        return navigation('/receive')
      } else {
        //エラーメッセージがない場合は空にする
        setErrorMessage('')
      }

      const json = res.data.detail
      const obj = JSON.parse(json)

      setMovieData({
        movieTitle: obj.title,
        movieImg: obj.poster_path,
        movieId: obj.id,
        receiverId: res.data.current_user_id,
        letterId: res.data.letter.id,
        userId: res.data.letter.user_id,
        recommendPoint: res.data.letter.recommend_point,
        twitterUserName: res.data.user.name,
      })

      const resSawFilmLetters = await axios.get(
        getNotWatchFilmLetterDatas,
        config
      )

      setGetFirstSawFilmLettersId(resSawFilmLetters.data)

      setOpen(true)

      navigation('/receive')
    })

    setOpen(false)
    setOpenFlash(false)
    setRegistNotWatchFilm(true)
  }

  return (
    <Box
      sx={{
        width: 1,
        '& .MuiBottomNavigationAction-root, .Mui-selected, svg': {
          backgroundColor: 'black',
          color: '#ff9800',
        },
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        sx={[
          {
            backgroundColor: 'black',
            height: '50px',
            color: '#fff',
            textAlign: 'center',
            width: 1,
            bottom: 0,
            zIndex: 5,
            position: 'fixed',
            left: 0,
          },
        ]}
      >
        <BottomNavigationAction
          label="検索"
          icon={<SearchIcon />}
          onClick={() => navigation('/search', setSearchWord(''))}
        />
        <BottomNavigationAction
          label="マイページ"
          icon={<RoofingIcon />}
          component={Link}
          to={'/mypage'}
        />
        <BottomNavigationAction
          label="ランダム"
          icon={<EmailIcon />}
          onClick={handleGetLetter}
        />
        <BottomNavigationAction
          label="ランキング"
          icon={<EqualizerIcon />}
          component={Link}
          to={'/ranking'}
        />
      </BottomNavigation>
    </Box>
  )
}

export default LoggedInFooter

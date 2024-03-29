import { useState, useContext } from 'react'
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  getLetter,
  getNotWatchFilmLetterDatas,
  getFilmsDetails,
  getFilmsDetailsByEnglish,
} from '@/urls'
import { MyContext } from '@/App'
import { useTranslation } from 'react-i18next'
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
import { useEffect } from 'react'

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

  const { t, i18n } = useTranslation()

  const [, setGetFirstSawFilmLettersId] = useAtom(
    handleGetFirstSawFilmLettersIdAtom
  )

  const handleGetLetter = async () => {
    const token = await user.getIdToken(true)
    const config = { headers: { authorization: `Bearer ${token}` } }
    //ランダムで映画レターの情報を取得
    axios.get(getLetter, config).then(async (res) => {
      //受け取れるレターがなければ、メッセージを渡す
      if (res.data.message) {
        setErrorMessage(res.data.message)
      } else {
        //エラーメッセージがない場合は空にする
        setErrorMessage('')
      }
      const json = res.data.detail
      const obj = JSON.parse(json)
      const filmId = obj.id

      if (i18n.language === 'ja') {
        axios
          .get(getFilmsDetails, {
            params: {
              film_id: filmId,
            },
          })
          .then((res2) => {

            setMovieData({
              movieTitle: res2.data.title,
              movieImg: res2.data.poster_path,

              movieId: obj.id,
              receiverId: res.data.current_user_id,
              letterId: res.data.letter.id,
              userId: res.data.letter.user_id,
              recommendPoint: res.data.letter.recommend_point,
              twitterUserName: res.data.user.name,
            })
          })
      } else {
        axios
          .get(getFilmsDetailsByEnglish, {
            params: {
              film_id: filmId,
            },
          })
          .then((res2) => {

            setMovieData({
              movieTitle: res2.data.title,
              movieImg: res2.data.poster_path,
              movieId: obj.id,
              receiverId: res.data.current_user_id,
              letterId: res.data.letter.id,
              userId: res.data.letter.user_id,
              recommendPoint: res.data.letter.recommend_point,
              twitterUserName: res.data.user.name,
            })
          })
      }

      const resSawFilmLetters = await axios.get(
        getNotWatchFilmLetterDatas,
        config
      )
      setGetFirstSawFilmLettersId(resSawFilmLetters.data)
      setOpen(true)
    })

    setOpen(false)
    //フラッシュメッセージを表示させない
    setTimeout(() => {
      setOpenFlash(false)
    }, 2000)
    // setOpenFlash(false)
    setRegistNotWatchFilm(true)
  }

  //日本語・英語ボタン押してもランダムが走ってしまう
  useEffect(() => {
    handleGetLetter()
  }, [])

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
            height: '70px',
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
          label={t('footer.search')}
          icon={<SearchIcon />}
          onClick={() => navigation('/search', setSearchWord(''))}
        />
        <BottomNavigationAction
          label={t('footer.mypage')}
          icon={<AccountCircleIcon />}
          component={Link}
          to={'/mypage'}
        />
        <BottomNavigationAction
          label={t('footer.random')}
          icon={<EmailIcon />}
          component={Link}
          to={'/receive'}
          onClick={handleGetLetter}
        />
        <BottomNavigationAction
          label={t('footer.ranking')}
          icon={<EqualizerIcon />}
          component={Link}
          to={'/ranking'}
        />
      </BottomNavigation>
    </Box>
  )
}

export default LoggedInFooter
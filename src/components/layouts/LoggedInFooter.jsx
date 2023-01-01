import { useState } from 'react'
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

import { Link } from 'react-router-dom'

import axios from 'axios'
import { getLetter } from '@/urls'

import { useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { MyContext } from '@/App'

//JOTAI
import { useAtom } from 'jotai'
import {
  recieveMovieDataAtom,
  handleFadeModal,
  handleGetErrorMessageAtom,
  handleSendFlashMessage
} from '@/jotai/atoms'

export const LoggedInFooter = (props) => {
  const { menuList } = props
  const [value, setValue] = useState(0)

  const navigation = useNavigate()

  const [user] = useContext(MyContext)

  const [, setMovieData] = useAtom(recieveMovieDataAtom)

  const [openFlash, setOpenFlash] = useAtom( handleSendFlashMessage)

  const [, setOpen] = useAtom(handleFadeModal)

  const [, setErrorMessage] = useAtom(handleGetErrorMessageAtom)

  const handleGetLetter = async () => {
    const token = await user.getIdToken(true)
    const config = { headers: { authorization: `Bearer ${token}` } }

    axios.get(getLetter, config).then((res) => {
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
        receiverId: res.data.current_user_id,
        letterId: res.data.letter.id,
        userId: res.data.letter.user_id,
        recommendPoint: res.data.letter.recommend_point,
        twitterUserName: res.data.user.name,
      })

      setOpen(true)

      navigation('/receive')
    })
    setOpen(false)
    setOpenFlash(false)
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
        {
          // このLinkタグの書き方がどういう意味なのかまだわかっていない
          menuList.map((menu, index) => (
            <BottomNavigationAction
              key={index}
              label={menu.label}
              icon={menu.icon}
              component={Link}
              to={menu.nextPage}
            />
          ))
        }
        <BottomNavigationAction
          label="Random"
          icon={<EmailIcon />}
          onClick={handleGetLetter}
        />
      </BottomNavigation>
    </Box>
  )
}

export default LoggedInFooter

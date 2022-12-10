import { useState } from 'react'
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

import { Link } from 'react-router-dom'

import axios from 'axios'
import { getLetter, filmsRandomUrl } from '@/urls'

import { useNavigate, useLocation } from 'react-router-dom'

import { useContext } from 'react'
import { MyContext } from '@/App'
import { MovieContext } from '@/App'

//JOTAI
import { useAtom } from 'jotai'
import { recieveMovieDataAtom } from '@/jotai/atoms'

export const LoggedInFooter = (props) => {
  const { menuList } = props
  const [value, setValue] = useState(0)

  const { state } = useLocation()
  const navigation = useNavigate()

  const [user] = useContext(MyContext)
  const [searchFilm, setSearchFilm] = useContext(MovieContext)

  const [movieData, setMovieData] = useAtom(recieveMovieDataAtom)

  const handleGetLetter = async () => {
    const token = await user.getIdToken(true)
    const config = { headers: { authorization: `Bearer ${token}` } }

    

    axios.get(filmsRandomUrl, config).then(async (res) => {
      

      const json = res.data.detail
      const obj = JSON.parse(json)
      

      const movieId = res.data.letter.movie_id


      setMovieData({
        movieTitle: obj.title,
        movieImg: obj.poster_path,
        recommendPoint: res.data.letter.recommend_point,
        twitterUserName: res.data.user.name,
      })

      navigation('/receive')
    })
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
          label="受け取る"
          icon={<EmailIcon />}
          onClick={handleGetLetter}
        />
      </BottomNavigation>
    </Box>
  )
}

export default LoggedInFooter

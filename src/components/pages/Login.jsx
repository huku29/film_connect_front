import { BaseLayout } from '@/components/layouts'
import { Stack, Typography, Button, Box } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import { signInWithPopup } from 'firebase/auth'
import { provider } from '@/firebase'
import { auth } from '@/firebase'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginCheck } from '@/urls'
import useMediaQuery from '@mui/material/useMediaQuery'

//Appで定義した読み込みたい値を取得するためにuseContextとMyContextをインポートしてあげる

export const Login = () => {
  const [success, setSuccess] = useState('')
  const navigation = useNavigate()
  const matches = useMediaQuery('(min-width:575px)')
  //使用したい値を使う

  // const value = useContext(MyContext)

  //twitterログインの処理
  const handleTwitterLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = await result.user
        const userName = user.reloadUserInfo.providerUserInfo[0].screenName
        const token = await user.getIdToken(true)
        const config = { headers: { authorization: `Bearer ${token}` } }

        axios.post(
          loginCheck,
          {
            twitterUserName: userName,
          },
          config
        )
        navigation('/mypage')
      })
      .catch((error) => {
        setSuccess('アカウントの作成に失敗しました')
      })
  }

  return (
    <BaseLayout>
      {matches ? (
        <Box>
          <Stack
            sx={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              border: 'balck',
            }}
          >
            <Typography variant="h4">ログイン</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'black ',
                color: '#ff9800',
                borderRadius: '5%',
                width: '200px',
                padding: '10px',
                mt: 5,
              }}
              onClick={handleTwitterLogin}
            >
              <TwitterIcon />
              Twitterログイン
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box>
          <Stack
            sx={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              border: 'balck',
            }}
          >
            <Typography variant="h4">ログイン</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'black ',
                color: '#ff9800',
                borderRadius: '5%',
                width: '200px',
                padding: '10px',
                mt: 5,
              }}
              onClick={handleTwitterLogin}
            >
              <TwitterIcon />
              Twitterログイン
            </Button>
          </Stack>
        </Box>
      )}
    </BaseLayout>
  )
}

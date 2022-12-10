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

//Appで定義した読み込みたい値を取得するためにuseContextとMyContextをインポートしてあげる

export const Login = () => {
  const [success, setSuccess] = useState('')
  const navigation = useNavigate()
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
        //ユーザアカウント名
        console.log(user)
        console.log(token)
        // console.log(user.reloadUserInfo.providerUserInfo[0].screenName)

        try {
          axios.post(
            loginCheck,
            {
              twitterUserName: userName,
            },
            config
          )
          navigation('/mypage')
        } catch (error) {
          // console.log(error)
        }
        // console.log(user)
        setSuccess('アカウントの作成に成功しました。')
      })
      .catch((error) => {
        setSuccess('アカウントの作成に失敗しました')
      })
  }

  return (
    <BaseLayout>
      <Box border={1} borderColor="primary.main">
        <Stack
          spacing={2}
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            border: 'balck',
          }}
        >
          <Typography variant="h4">ログイン</Typography>
        </Stack>

        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            border: 'balck',
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'black ',
              color: '#ff9800',
              borderRadius: '5%',
              width: '300px',
              padding: '10px',
            }}
            onClick={handleTwitterLogin}
          >
            <TwitterIcon />
            Twitterログイン
          </Button>
        </Stack>

        {/* <Stack
          sx={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            border: 'balck',
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'black ',
              color: '#ff9800',
              borderRadius: '5%',
              width: '300px',
              padding: '10px',
            }}
          >
            ゲストログイン
          </Button>
        </Stack> */}
      </Box>
    </BaseLayout>
  )
}

import { BaseLayout } from '@/components/layouts'
import { Stack, Typography, Button, Box, Link,ListItemButton} from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import { signInWithPopup } from 'firebase/auth'
import { provider, auth } from '@/firebase'
// import { auth } from '@/firebase'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginCheck } from '@/urls'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'

//Appで定義した読み込みたい値を取得するためにuseContextとMyContextをインポートしてあげる

export const Login = () => {
  const [success, setSuccess] = useState('')
  const navigation = useNavigate()
  const { t, i18n } = useTranslation()
  const matches = useMediaQuery('(min-width:575px)')
  //使用したい値を使う

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
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              border: 'balck',
            }}
          >
            <Typography variant="h4">{t('login.title')}</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'black ',
                color: '#ff9800',
                borderRadius: '5%',
                width: '300px',
                padding: '10px',
                mt: 7,
              }}
              onClick={handleTwitterLogin}
            >
              <TwitterIcon />
              {t('login.button')}
            </Button>

            <Typography
              variant="contained2"
              sx={{
                color: '#ff9800',
                width: '310px',

                mt: 5,
                inherit: 'p',
              }}
            >
              ユーザーが本サービスへの登録申込をしたことをもって
              <Link href="/useterms">利用規約</Link>および
              <Link href="/privacypolicy">プライバシーポリシー</Link>
              のすべての条項に同意したものとみなします。
            </Typography>

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
            <Typography variant="h4">{t('login.title')}</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'black ',
                color: '#ff9800',
                borderRadius: '5%',
                width: '230px',
                padding: '10px',
                mt: 7,
                mr: "auto",
                ml: "auto"
              }}
              onClick={handleTwitterLogin}
            >
              <TwitterIcon />
              {t('login.button')}
            </Button>
            <Typography
              variant="contained2"
              sx={{
                color: '#ff9800',
                width: '285px',
                mt: 5,
                inherit: 'p',
              }}
            >
              ユーザーが本サービスへの登録申込をしたことをもって
              <Link href="/useterms">利用規約</Link>および
              <Link href="/privacypolicy">プライバシーポリシー</Link>
              のすべての条項に同意したものとみなします。
            </Typography>
          </Stack>
        </Box>
      )}
    </BaseLayout>
  )
}

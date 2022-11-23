import { BaseLayout } from '@/components/layouts'
import { Stack, Typography, Button } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth'
import { provider } from '@/firebase'
import { auth } from '@/firebase'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from "axios";
import {loginCheck } from '@/urls'

//Appで定義した読み込みたい値を取得するためにuseContextとMyContextをインポートしてあげる
// import { useContext } from 'react'
// import { MyContext } from '@/App'



export const Top = () => {
  const [success, setSuccess] = useState('')
  const navigation = useNavigate()
  //使用したい値を使う
  // const [,setUserData] = useContext(MyContext);
  // const value = useContext(MyContext)

  //twitterログインの処理
  // const handleTwitterLogin = () => {
  //   signInWithPopup(auth, provider)
  //   .then(async(result) => {
  //       // const credential = await TwitterAuthProvider.credentialFromResult(result)
  //       // const token =  await credential.accessToken
  //       // const secret = await credential.secret

  //       // The signed-in user info.
  //       const user = await result.user
  //       // setUserData(user)
  //       const token = await user.getIdToken(true);
  //     const config = { headers: { authorization: `Bearer ${token}` } };
  //     console.log(token)
  //     try {
  //       axios.get(loginCheck, config);
  //       navigation('/mypage')
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     console.log(user)
  //       setSuccess('アカウントの作成に成功しました。')
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       // const errorCode = error.code
  //       // const errorMessage = error.message
  //       // The email of the user's account used.
        
  //       // The AuthCredential type that was used.
       
  //       console.log("失敗")
  //       // ...
  //       setSuccess('アカウントの作成に失敗しました')
  //     })
  // }

  return (
    <BaseLayout>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4">Film Connect</Typography>
        <Typography variant="subtitle1" sx={{ p: 1 }}>
          映画ライフを楽しもう
        </Typography>
        {/* <Button
          variant="contained"
          sx={{
            backgroundColor: 'black ',
            color: '#ff9800',
            borderRadius: '5%',
            width: '200px',
            padding: '10px',
            mt: '10px',
          }}
          //twitterログインボタンを押したら走る挙動
          onClick={handleTwitterLogin}
        >
          <TwitterIcon />
          Twitterログイン
        </Button> */}
      </Stack>
    </BaseLayout>
  )
}

import { Router } from '@/router/Router'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/Theme'
import CssBaseline from '@mui/material/CssBaseline'
import { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

//他のコンポーネントで渡したい値を定義
export const MyContext = createContext()

export const App = () => {
  //どちらも読み込まれている値（user）をここで定義してあげる。その値をProviderタグのvalueにセットしてあげる
  // const [userData, setUserData] = useState();
  const [user, setUser] = useState({})

  const [mounted, setMounted] = useState(false)

  const handleLogin = (user) => {
    setUser(user)
  }

  const handleLogout = () => {
    setUser()
  }

  useEffect(() => {
    //auth(ユーザー情報)を監視している。authが(ユーザー情報を保持していれば、ログインの助湯体を保持できてログアウトすればhandleLogoutの処理になる。)
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleLogin(user)
      } else {
        handleLogout()
      }
      //リロードしたときに認証情報が表示するコンポーネント先に渡っているように挟む
      setMounted(true)
    })
    //クリーンアップ処理
    return () => {
      unsubscribed()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyContext.Provider value={[user]}>
        {
          //mountedがtrueならコンポーネント表示
          mounted && <Router />
        }
      </MyContext.Provider>
    </ThemeProvider>
  )
}

import { Router } from '@/router/Router'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/Theme'
import CssBaseline from '@mui/material/CssBaseline'
import { createContext ,useState, useEffect} from 'react'
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

//他のコンポーネントで渡したい値を定義
export const MyContext = createContext("")
export const MovieContext = createContext("")






export const App = () => {
  //どちらも読み込まれている値（user）をここで定義してあげる。その値をProviderタグのvalueにセットしてあげる
    // const [userData, setUserData] = useState();
    const [user, setUser] = useState({})
    const [searchFilm,setSearchFilm] = useState([])
  

    const handleLogin = (user) => {
      console.log("ログイン完")
      setUser(user)
      // console.log(user.displayName)


    }

    const handleLogout = () => {
      console.log("未ログイン")
      setUser({})
    }

    useEffect(() => {
      //auth(ユーザー情報)を監視している。authが(ユーザー情報を保持していれば、ログインの助湯体を保持できてログアウトすればhandleLogoutの処理になる。)
      onAuthStateChanged(auth, (user) => {
      
        if (user) {
        
          handleLogin(user)
        } else {
        handleLogout()
        }
      });
      
    },[]);

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <MyContext.Provider value ={[user]}>
      <MovieContext.Provider value = {[searchFilm,setSearchFilm]}>
         {/* {console.log(searchFilm)} */}
         {/* {console.log(searchFilm)} */}
      <Router />
      </MovieContext.Provider>
      </MyContext.Provider>
    </ThemeProvider>
  )
}

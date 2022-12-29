import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import {
  Top,
  Show,
  Login,
  MyPage,
  Send,
  Receive,
  WriteLetterPage,
} from '@/components/pages'
import { MyContext } from '@/App'
import { useContext } from 'react'

export const Router = () => {
  const [user] = useContext(MyContext)


  const Private = (props) => {
    if (user) {
      return props.component
    } else {
      return <Navigate to="/login" />
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/show" element={<Private component={<Show />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Private component={<MyPage />} />} />
        <Route path="/send" element={<Private component={<Send />} />} />
        <Route path="/receive" element={<Private component={<Receive />} />} />
        <Route
          path="/writeletter"
          element={<Private component={<WriteLetterPage />} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

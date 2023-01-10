import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import {
  Top,
  Login,
  MyPage,
  Search,
  Receive,
  WriteLetterPage,
  Ranking,
  PrivacyPolicy,
  UseTerms,
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
        <Route path="/login" element={<Login />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/useterms" element={<UseTerms />} />
        <Route path="/mypage" element={<Private component={<MyPage />} />} />
        <Route path="/search" element={<Private component={<Search />} />} />
        <Route path="/receive" element={<Private component={<Receive />} />} />
        <Route
          path="/writeletter"
          element={<Private component={<WriteLetterPage />} />}
        />
        <Route path="/ranking" element={<Private component={<Ranking />} />} />
      </Routes>
    </BrowserRouter>
  )
}

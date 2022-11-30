import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Top, Show, Login, MyPage, Send, Receive, WriteLetterPage } from '@/components/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/show" element={<Show />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/send" element={<Send />} />
        <Route path="/receive" element={<Receive />} />
        <Route path="/writeletter" element={<WriteLetterPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

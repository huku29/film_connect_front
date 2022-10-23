import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Top, Show, Login, Mypage} from '@/components/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/show" element={<Show />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

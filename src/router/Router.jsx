import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Top, Show, Login } from '@/components/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/show" element={<Show />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

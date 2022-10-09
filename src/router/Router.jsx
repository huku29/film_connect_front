import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Top, Show } from '@/components/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/show" element={<Show />} />
      </Routes>
    </BrowserRouter>
  )
}

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Top, News } from '@/components/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  )
}

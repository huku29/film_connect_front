import { Header } from '../layouts/Header'
import { Footer } from '../layouts/Footer'
import './Top.css'

export const Top = () => {
  return (
    <>
      <Header />
      <h1 className="title">Movie Connect</h1>
      <p className="subtitle">さあ、映画ライフを楽しもう</p>
      <p className="explainapp">アプリの説明</p>
      <Footer />
    </>
  )
}

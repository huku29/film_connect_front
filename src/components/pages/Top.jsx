import { Header } from '../layouts/Header'
import { TopFooter } from '../layouts/TopFooter'
import './Top.css'

export const Top = () => {
  return (
    <>
      <Header />
      <h1 className="title">Movie Connect</h1>
      <p className="subtitle">さあ、映画ライフを楽しもう</p>
      <p className="explainapp">アプリの説明</p>
      <TopFooter />
    </>
  )
}

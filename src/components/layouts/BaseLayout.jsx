import Header from './Header'
import { Footer } from './Footer'

export const BaseLayout = (props) => {
  const { children } = props

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

import { LoggedInHeader } from './LoggedInHeader'
import { LoggedInFooter } from './LoggedInFooter'

export const LoggedInLayout = (props) => {
  const { children } = props

  return (
    <>
      <LoggedInHeader />
      {children}
      <LoggedInFooter />
    </>
  )
}

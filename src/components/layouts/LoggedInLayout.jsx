import { LoggedInHeader } from './LoggedInHeader'
import { Footer } from './Footer'
import SendIcon from '@mui/icons-material/Send'
import EmailIcon from '@mui/icons-material/Email'
import RoofingIcon from '@mui/icons-material/Roofing'

const FOOTER_MENU_LIST = [
  {
    label: '送る',
    icon: <SendIcon />,
    nextPage: '/send',
  },
  {
    label: 'マイページ',
    icon: <RoofingIcon />,
    nextPage: '/mypage',
  },
  {
    label: '受け取る',
    icon: <EmailIcon />,
    nextPage: '/receive',
  },
]

export const LoggedInLayout = (props) => {
  const { children } = props

  return (
    <>
      <LoggedInHeader />
      {children}
      <Footer menuList={FOOTER_MENU_LIST} />
    </>
  )
}

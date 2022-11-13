import { LoggedInHeader } from './LoggedInHeader'
import { LoggedInFooter } from './LoggedInFooter'
import SendIcon from '@mui/icons-material/Send'
import EmailIcon from '@mui/icons-material/Email'
import RoofingIcon from '@mui/icons-material/Roofing'
import { Box } from '@mui/material'

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
      <LoggedInFooter menuList={FOOTER_MENU_LIST} />
    </>
  )
}

import { LoggedInHeader } from './LoggedInHeader'
import { LoggedInFooter } from './LoggedInFooter'
import SendIcon from '@mui/icons-material/Send'
import RoofingIcon from '@mui/icons-material/Roofing'

// const FOOTER_MENU_LIST = [
//   {
//     label: '送る',
//     icon: <SendIcon />,
//     nextPage: '/send',
//   },
//   {
//     label: 'マイページ',
//     icon: <RoofingIcon />,
//     nextPage: '/mypage',
//   },
//   {
//     label: '受け取る',
//     icon: <EmailIcon />,
//     nextPage: '/receive',
//   },
// ]

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

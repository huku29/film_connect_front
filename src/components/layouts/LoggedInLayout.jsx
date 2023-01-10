import { LoggedInHeader } from './LoggedInHeader'
import { LoggedInFooter } from './LoggedInFooter'
import SearchIcon from '@mui/icons-material/Search'
import RoofingIcon from '@mui/icons-material/Roofing'

const FOOTER_MENU_LIST = [
  {
    label: 'Search',
    icon: <SearchIcon />,
    nextPage: '/search',
  },
  {
    label: 'MyPage',
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

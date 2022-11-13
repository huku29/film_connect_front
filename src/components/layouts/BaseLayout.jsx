import Header from './Header'
import { Footer } from './Footer'
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

// const FOOTER_MENU_LIST = [
//   {
//     label: 'プライバシー',
//     icon: <EnhancedEncryptionIcon />,
//     nextPage: '/show',
//   },
//   {
//     label: '利用規約',
//     icon: <TextSnippetIcon />,
//     nextPage: '/',
//   },
//   {
//     label: 'お問合せ',
//     icon: <SupportAgentIcon />,
//     nextPage: '/',
//   },
// ]

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

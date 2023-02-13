import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material'

import MuiAppBar from '@mui/material/AppBar'
import TwitterIcon from '@mui/icons-material/Twitter'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import RoofingIcon from '@mui/icons-material/Roofing'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption'
import ArticleIcon from '@mui/icons-material/Article'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { contact, twitterOfficial } from '@/urls'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    //開いた時にMovieConnectという文字がずれるようにする
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

//矢印の位置を調整
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

//exportしているコンポーネント
export const LoggedInHeader = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  /*ドロワーを開けるアニメーション*/
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  /*ドロワーを閉めるアニメーション*/
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }

  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const matches = useMediaQuery('(min-width:575px)')

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: 'black', color: '#ff9800' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }), right: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                pt: 1
              }}
            >
              {matches ? (
                <img
                  src="https://filmconnect.jp/logo.png"
                  className="header-logo"
                  alt="header-logo"
                  width="200"
                  height="40"
                />
              ) : (
                <img
                  src="https://filmconnect.jp/logo.png"
                  className="header-logo"
                  alt="header-logo"
                  width="120"
                  height="40"
                />
              )}
            </Typography>
          </Typography>
          {matches ? (
            <Typography sx={{ ml: 'auto' }}>
              <Button onClick={() => changeLanguage('ja')}>日本語</Button>
              <Button onClick={() => changeLanguage('en')}>English</Button>
            </Typography>
          ) : (
            <Typography sx={{ ml: 'auto' }}>
              <Button
                sx={{ fontSize: '3px'}}
                onClick={() => changeLanguage('ja')}
              >
                日本語
              </Button>
              <Button
                sx={{ fontSize: '3px' }}
                onClick={() => changeLanguage('en')}
              >
                English
              </Button>
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            //ハンバーガメニューを押すと幅が変わる
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'black',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/*横のスライドの矢印マーク*/}
        <DrawerHeader>
          {/* /*矢印を押したら閉まる*/}
          <IconButton
            onClick={handleDrawerClose}
            sx={{ color: 'text.primary' }}
          >
            {/* themeのdirectionがltrの場合、左書きのげんとといういみ */}
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          <ListItem>
            <ListItemButton component={Link} to="/" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'text.primary' }} />
              </ListItemIcon>
              <ListItemText
                primary={t('header.logout')}
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/mypage">
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: 'text.primary' }} />
              </ListItemIcon>
              <ListItemText
                primary={t('header.myPage')}
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <RoofingIcon sx={{ color: 'text.primary' }} />
              </ListItemIcon>
              <ListItemText
                primary={t('header.homePage')}
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/useterms">
              <ListItemIcon>
                <ArticleIcon sx={{ color: 'text.primary' }} />
              </ListItemIcon>
              <ListItemText
                primary={t('termsOfUse')}
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/privacypolicy">
              <ListItemIcon>
                <EnhancedEncryptionIcon sx={{ color: 'text.primary' }} />
              </ListItemIcon>
              <ListItemText
                primary={t('privacyPolicy')}
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <MailOutlineIcon sx={{ color: 'text.primary' }} />
              </ListItemIcon>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${contact}`}
                style={{ textDecoration: 'none', color: '#ff9800' }}
              >
                {t('header.contact')}
              </a>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <TwitterIcon sx={{ color: 'text.primary' }} />
              </ListItemIcon>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${twitterOfficial}`}
                style={{ textDecoration: 'none', color: '#ff9800' }}
              >
                {t('header.official')}
              </a>
            </ListItemButton>
          </ListItem>
          <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <TwitterIcon sx={{ color: 'text.primary' }} />
                  </ListItemIcon>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href= "https://twitter.com/intent/tweet?text=%20%23FilmConnect%0ahttps://filmconnect.jp/"
                    style={{ textDecoration: 'none', color: '#ff9800' }}
                  >
                    {t('header.share')}
                  </a>
                </ListItemButton>
              </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}

export default LoggedInHeader

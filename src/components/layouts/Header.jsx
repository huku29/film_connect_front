import { useState, useContext } from 'react'
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
import TwitterIcon from '@mui/icons-material/Twitter'
import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import RoofingIcon from '@mui/icons-material/Roofing'
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption'
import ArticleIcon from '@mui/icons-material/Article'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { MyContext } from '@/App'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { contact, twitterOfficial } from '@/urls'
import { useTranslation } from 'react-i18next'

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
export const Header = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const matches = useMediaQuery('(min-width:575px)')

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

  const [user] = useContext(MyContext)

  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {matches ? (
        <>
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
              <Typography variant="h6" noWrap component="div" sx={{ pt: 1 }}>
                <img
                  src="https://film-connect.web.app/logo.png"
                  className="header-logo"
                  alt="header-logo"
                  width="200"
                  height="40"
                />
              </Typography>
              <Typography sx={{ ml: 'auto' }}>
                <Button onClick={() => changeLanguage('ja')}>日本語</Button>
                <Button onClick={() => changeLanguage('en')}>English</Button>
              </Typography>
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
              {user ? (
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to="/"
                    onClick={handleLogout}
                  >
                    <ListItemIcon>
                      <LogoutIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('header.logout')}
                      sx={{ color: 'text.primary' }}
                    />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem>
                  <ListItemButton component={Link} to="/login">
                    <ListItemIcon>
                      <LoginIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('header.login')}
                      sx={{ color: 'text.primary' }}
                    />
                  </ListItemButton>
                </ListItem>
              )}

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

              {user ? (
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
              ) : null}

              <ListItem>
                <ListItemButton component={Link} to="/useterms">
                  <ListItemIcon>
                    <ArticleIcon sx={{ color: 'text.primary' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('termsOfUse')}
                    sx={{ color: 'text.primary' }}
                    to={'/mypage'}
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
            </List>
          </Drawer>
        </>
      ) : (
        <>
          <CssBaseline />
          <AppBar
            position="fixed"
            open={open}
            sx={{ backgroundColor: 'black', color: '#ff9800', height: '60px' }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }), right: 0 }}
              >
                <MenuIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <Typography variant="h8" noWrap component="div" sx={{ ml: -2 }}>
                <img
                  src="https://film-connect.web.app/logo.png"
                  className="header-logo"
                  alt="header-logo"
                  width="150"
                  height="40"
                />
              </Typography>
              <Typography sx={{ ml: 'auto' }}>
                <Button onClick={() => changeLanguage('ja')}>日本語</Button>
                <Button onClick={() => changeLanguage('en')}>English</Button>
              </Typography>
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
              {user ? (
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to="/"
                    onClick={handleLogout}
                  >
                    <ListItemIcon>
                      <LogoutIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('header.logout')}
                      sx={{ color: 'text.primary' }}
                    />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem>
                  <ListItemButton component={Link} to="/login">
                    <ListItemIcon>
                      <LoginIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('header.login')}
                      sx={{ color: 'text.primary' }}
                    />
                  </ListItemButton>
                </ListItem>
              )}

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

              {user ? (
                <ListItem>
                  <ListItemButton component={Link} to="/mypage">
                    <ListItemIcon>
                      <ArticleIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('header.myPage')}
                      sx={{ color: 'text.primary' }}
                    />
                  </ListItemButton>
                </ListItem>
              ) : null}

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
            </List>
          </Drawer>
        </>
      )}
    </Box>
  )
}

export default Header

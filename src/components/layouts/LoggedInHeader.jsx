import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Box, Drawer } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

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
          <Typography variant="h6" noWrap component="div" sx={{pt:1}}>
            <img
                src="https://film-connect.web.app/logo.png"
                className="header-logo"
                alt="header-logo"
                width="200"
                height="40"
                
              />
            </Typography>
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
          <ListItem>
            <ListItemButton component={Link} to="/" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'text.primary' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: 'text.primary' }} />
            </ListItemButton>
          </ListItem>

          
          <ListItem>
            <ListItemButton component={Link} to="/mypage">
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primary="マイページ"
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/">
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primary="トップページ"
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/useterms">
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primary="利用規約"
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/privacypolicy">
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primary="プライバシーポリシー"
                sx={{ color: 'text.primary' }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/privacypolicy">
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="お問合せ" sx={{ color: 'text.primary' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}

export default LoggedInHeader

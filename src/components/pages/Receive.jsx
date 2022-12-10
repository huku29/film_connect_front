import { LoggedInLayout } from '@/components/layouts'

import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { filmsImgSmall } from '@/urls'

import { TwitterShareButton, TwitterIcon } from 'react-share'

//JOTAI
import { useAtom } from 'jotai'
import { recieveMovieDataAtom } from '@/jotai/atoms'

import { RecommendPoint } from '@/components/modals'

export const Receive = () => {
  // const styles = { whiteSpace: 'pre-line' }

  const [movieData] = useAtom(recieveMovieDataAtom)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <LoggedInLayout>
        <Card
          sx={{
            width: 750,
            height: 700,
            bgcolor: '#fff3e0',
            position: 'absolute',
            top: '51%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            border: 'balck',
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: 'black', textAlign: 'center', pt: 2 }}
            >
              {movieData.movieTitle}
            </Typography>
          </CardContent>

          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: 'black',
              position: 'absolute',
              left: '33%',
              mt: 3,
              pl: 3,
            }}
          >
            <CardMedia
              component="img"
              image={`${filmsImgSmall}/${movieData.movieImg}`}
              alt=""
            />
          </Typography>

          <Box
            sx={{
              my: 2,
              p: 2,
              position: 'absolute',
              right: '250px',
              top: '400px',
              // bottom: '50px',
              color: 'black',
              whiteSpace: 'pre-wrap',
            }}
          >
            <CardContent>
              <Button
                variant="contained"
                disableElevation
                sx={{ mt: 5 }}
                onClick={handleOpenModal}
              >
                おすすめポイントを見る
              </Button>
            </CardContent>
          </Box>

          <Box
            sx={{
              position: 'fixed',
              right: '20px',
              bottom: '15px',
              color: 'white',
            }}
          >
            <TwitterShareButton
              // url={}
              via={movieData.twitterUserName}
            >
              <TwitterIcon size={'50px'} round />
            </TwitterShareButton>
          </Box>
        </Card>
        <RecommendPoint open={openModal} onClose={handleCloseModal} />
      </LoggedInLayout>
    </>
  )
}

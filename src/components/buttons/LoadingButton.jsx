import { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import Button from '@mui/material/Button'

export default function LoadingButton() {
  //useStateについて
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  //userRefについて
  const timer = useRef()
  console.log(timer)

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[300],
      },
    }),
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleButtonClick = () => {
    //びっくりマークがなければローディングしたままの状態になる
    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = window.setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 5000)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* 一つのアイコンのデザインとクリックした時のアニメーション */}

        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={loading}
            onClick={handleButtonClick}
          >
            {loading ? '送信中' : '送信する'}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
    </>
  )
}

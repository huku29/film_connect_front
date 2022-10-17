import { BaseLayout } from '@/components/layouts'
import { Stack, Typography, Button, Box } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter';

export const Login = () => {
  return (
    <>
      <BaseLayout>
      <Box border={1} borderColor="primary.main">
        <Stack
          spacing={2}
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            border: 'balck',
          }}
        >
          <Typography variant="h4">ログイン</Typography>
        </Stack>
        
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            border: 'balck',
          }}
        >
          <Button variant="contained" sx={{ backgroundColor: 'black ' ,color:'#ff9800', borderRadius:'5%',width: '300px',padding: '10px'}}>
          <TwitterIcon/>
            Twitterログイン
          </Button>
        </Stack>

        <Stack
          sx={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            border: 'balck',
          }}
        >
          <Button variant="contained" sx={{ backgroundColor: 'black ' ,color:'#ff9800', borderRadius:'5%', width: '300px',padding: '10px'}}>
            ゲストログイン
          </Button>
        </Stack>
      </Box>
      </BaseLayout>
    </>
  )
}

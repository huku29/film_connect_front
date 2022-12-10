import { BaseLayout } from '@/components/layouts'
import { Stack, Typography } from '@mui/material'

export const Top = () => {
  return (
    <BaseLayout>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4">Film Connect</Typography>
        <Typography variant="subtitle1" sx={{ p: 1 }}>
          映画ライフを楽しもう
        </Typography>
      </Stack>
    </BaseLayout>
  )
}

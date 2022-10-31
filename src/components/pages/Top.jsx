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
        <Typography variant="subtitle1">さあ、映画ライフを楽しもう</Typography>
        <Typography
          variant="subtitle1"
          sx={{ padding: '5px', cursor: 'pointer' }}
        >
          アプリの説明
        </Typography>
      </Stack>
    </BaseLayout>
  )
}

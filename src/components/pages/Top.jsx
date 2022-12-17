import { BaseLayout } from '@/components/layouts'
import { Stack, Typography, Button } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'

export const Top = () => {
  return (
    <BaseLayout sx={{ maxHeight: '5000px' }}>
      <Stack
        sx={{
          position: 'absolute',
          top: '400px',
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
      <Stack
        sx={{
          position: 'absolute',
          top: '765px',
          left: '51%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4">-- 使い方 --</Typography>
      </Stack>
      <Stack
        sx={{
          position: 'absolute',
          top: '960px',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
          Twitterでログイン
        </Typography>
        <Typography variant="subtitle1" sx={{ p: 1, mt: 1, width: '800px' }}>
          ログインをするとあなたのおすすめ映画を送り、誰かのおすすめ映画を受け取ることができます！
          <br />
          映画ライフを楽しみましょう！
        </Typography>
      </Stack>
      <Stack
        sx={{
          position: 'absolute',
          top: '1300px',
          right: '10%',
          transform: 'translate(10%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5">おすすめ映画を作成する</Typography>
        <Typography variant="subtitle1" sx={{ p: 1, mt: 1, width: '700px' }}>
          匿名でおすすめ映画を作成し、ランダムに誰かの元へ送られます！
          <br />
          映画検索で表示されたおすすめ映画の画像を押すと作成画面が表示されます！
          <br />
          あなたのおすすめ映画を多くの人に共有しよう！
        </Typography>
      </Stack>
      <Stack
        sx={{
          position: 'absolute',
          top: '1600px',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5">おすすめ映画を受け取る</Typography>
        <Typography variant="subtitle1" sx={{ p: 1, mt: 1, width: '700px' }}>
          受け取るボタンを押すとランダムに誰かがおすすめしてくれた映画が表示されます！
          <br />
          Twitterシェアをすることで受け取ったレターが誰から送られてきたかわかります!
          <br />
          この機会にTwitterで映画の感想や感謝の言葉を伝え交流の輪を広げましょう!
        </Typography>
      </Stack>
      <Stack
        sx={{
          position: 'absolute',
          top: '1800px',
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black ',
            color: '#ff9800',
            borderRadius: '5%',
            width: '300px',
            padding: '10px',
            left: '100%',
            transform: 'translate(90%)',
            mb: 20
          }}
        >
          <TwitterIcon />
          Twitterログイン
        </Button>
      </Stack>
    </BaseLayout>
  )
}

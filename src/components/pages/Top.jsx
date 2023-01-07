import { BaseLayout } from '@/components/layouts'
import { Stack, Typography, Box, Button } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import TwitterIcon from '@mui/icons-material/Twitter'

export const Top = () => {
  const matches = useMediaQuery('(min-width:575px)')

  return (
    <BaseLayout sx={{}}>
      {matches ? (
        <Box>
          <Stack
            sx={{
              mt: 38,
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
              ml: 1,
              mt: 35,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4"> How to use ? </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 10,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              Twitterでログイン
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              ログインをするとあなたのおすすめ映画を送り、誰かのおすすめ映画を受け取ることができます！
              <br />
              映画ライフを楽しみましょう！
            </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 10,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              おすすめ映画を作成する
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              匿名でおすすめ映画を作成し、ランダムに誰かの元へ送られます！
              <br />
              映画検索で表示されたおすすめ映画の画像を押すと作成画面が表示されます！
              <br />
              あなたのおすすめ映画を多くの人に共有しよう！
            </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 10,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              おすすめ映画を受け取る
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              受け取るボタンを押すとランダムに誰かがおすすめしてくれた映画が表示されます！
              <br />
              Twitterシェアをすることで受け取ったレターが誰から送られてきたかわかります!
              <br />
              この機会にTwitterで映画の感想や感謝の言葉を伝え交流の輪を広げましょう!
            </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 10,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              映画ランキング
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              どの映画が多く作成されたかランキングページで一目でわかります！
              <br />
              また多くの方が観たことない映画ランキングも見ることができ、あなたの知っているマニアックな映画もこの機会におすすめましょう！
              <br />
              多くの映画レターを作成し、ランキングに入りましょう！
            </Typography>
          </Stack>
      
      </Box>
      ) : (
        // スマホ版
        <Box>
          <Stack
            sx={{
              mt: 35,
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
              mt: 30,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4"> How to use ? </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 10,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              Twitterでログイン
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              ログインをするとあなたのおすすめ映画を送り、誰かのおすすめ映画を受け取ることができます！
              <br />
              映画ライフを楽しみましょう！
            </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 10,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              おすすめ映画を作成する
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              匿名でおすすめ映画を作成し、ランダムに誰かの元へ送られます！
              <br />
              映画検索で表示されたおすすめ映画の画像を押すと作成画面が表示されます！
              <br />
              あなたのおすすめ映画を多くの人に共有しよう！
            </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 10,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              おすすめ映画を受け取る
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              受け取るボタンを押すとランダムに誰かがおすすめしてくれた映画が表示されます！
              <br />
              Twitterシェアをすることで受け取ったレターが誰から送られてきたかわかります!
              <br />
              この機会にTwitterで映画の感想や感謝の言葉を伝え交流の輪を広げましょう!
            </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 10,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              映画ランキング
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              どの映画が多く作成されたかランキングページで一目でわかります！
              <br />
              また多くの方が観たことない映画ランキングも見ることができ、あなたの知っているマニアックな映画もこの機会におすすめましょう！
              <br />
              多くの映画レターを作成し、ランキングに入りましょう！
            </Typography>
          </Stack>
        </Box>
      )}
    </BaseLayout>
  )
}

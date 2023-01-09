import { BaseLayout } from '@/components/layouts'
import { Stack, Typography, Box } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import useMediaQuery from '@mui/material/useMediaQuery'

export const Top = () => {
  const matches = useMediaQuery('(min-width:825px)')

  return (
    <BaseLayout>
      {matches ? (
        <Box>
          <Box
            sx={{
              textAlign: 'center',
              mt: 15,
              '@media screen and (max-width:1035px)': {
                mt: 1,
              },
            }}
          >
            <img
              src="https://film-connect.web.app/top_img.png"
              className="top-img-logo"
              alt="top-img-logo"
              width="600"
            />
          </Box>
          <Stack
            sx={{
              ml: 1,
              mt: 25,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4"> How to use ? </Typography>
          </Stack>
          <Stack
            sx={{
              textAlign: 'center',
            }}
          >
            <TwitterIcon
              sx={{ fontSize: '100px', mr: 'auto', ml: 'auto', mt: 8,mb:5}}
            />
            <Typography variant="h5" sx={{ p: 1, mt: 1 }}>
              Twitterでログイン
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 7 }}>
              ログインをするとあなたのおすすめ映画を送り、誰かのおすすめ映画をレター形式で受け取ることができます！
              <br />
              映画ライフを楽しみましょう！
            </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 2,
              textAlign: 'center',
            }}
          >
            <Typography>
              <img
                src="https://film-connect.web.app/write_letter.png"
                className="write-letter-logo"
                alt="write-letter-logo"
                width="320"
              />
            </Typography>
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              おすすめ映画レターを作成する
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              匿名でおすすめ映画レターを作成し、ランダムに誰かの元へ送られます！
              <br />
              映画検索で表示されたおすすめ映画の画像を押すと作成画面が表示されます！
              <br />
              あなたのおすすめ映画を多くの人に共有しよう！
            </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 2,
              textAlign: 'center',
            }}
          >
            <Typography>
              <img
                src="https://film-connect.web.app/receive_img.png"
                className="receive-logo"
                alt="receive-logo"
                width="350"
              />
            </Typography>
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              おすすめ映画レターを受け取る
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              受け取るボタンを押すとランダムに誰かがおすすめしてくれた映画レターが表示されます！
              <br />
              Twitterシェアをすることで受け取ったレターが誰から送られてきたかわかります!
              <br />
              この機会にTwitterで映画の感想や感謝の言葉を伝え交流の輪を広げましょう!
            </Typography>
          </Stack>
          <Stack
            sx={{
              mt: 2,
              textAlign: 'center',
            }}
          >
            <Typography>
              <img
                src="https://film-connect.web.app/ranking.png"
                className="ranking-logo"
                alt="ranking-logo"
                width="350"
              />
            </Typography>
            <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
              映画ランキング
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              どの映画がレター形式で多く作成されたかランキングページで一目でわかります！
              <br />
              また多くの方が観たことない映画ランキングも見ることができます！
              <br />
              あなたの知っているマニアックな映画もこの機会におすすめましょう！
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
              mt: 25,
              ml: 5,
              '@media screen and (min-width:600px)': {
                ml: 30,
                mt: 40,
              },
              '@media screen and (min-width:420px) and (max-width:600px)': {
                ml: 13,
                mt: 20,
                textAlign: 'center',
              },
              '@media screen and (max-width:285px)': {
                mr: 25,
                ml: 1,
              },
            }}
          >
            <img
              src="https://film-connect.web.app/top_img.png"
              className="top-img-logo"
              alt="top-img-logo"
              width="300"
            />
          </Stack>

          <Box
            sx={{
              textAlign: 'center',
              '@media screen and (max-width:285px)': {
                ml: 5,
              },
            }}
          >
            <Stack
              sx={{
                mt: 30,
              }}
            >
              <Typography variant="h4"> How to use ? </Typography>
            </Stack>
            <Stack
              sx={{
                mt: 10,
                // textAlign: 'center',
              }}
            >
              <TwitterIcon sx={{ fontSize: '80px', mr: 'auto', ml: 'auto',mb:5 }} />
              <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
                Twitterでログイン
              </Typography>
              <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              ログインをするとあなたのおすすめ映画を送り、誰かのおすすめ映画をレター形式で受け取ることができます！
              <br />
              映画ライフを楽しみましょう！
              </Typography>
            </Stack>
            <Stack
              sx={{
                mt: 2,
                // textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  '@media screen and (max-width:285px)': {
                    mr: 25,
                    ml: 1,
                  },
                }}
              >
                <img
                  src="https://film-connect.web.app/write_letter.png"
                  className="write-letter-logo"
                  alt="write-letter-logo"
                  width="200"
                  height="250"
                />
              </Typography>
              <Typography variant="h5" sx={{ p: 1 }}>
                おすすめ映画レターを作成する
              </Typography>
              <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              匿名でおすすめ映画レターを作成し、ランダムに誰かの元へ送られます！
              <br />
              映画検索で表示されたおすすめ映画の画像を押すと作成画面が表示されます！
              <br />
              あなたのおすすめ映画を多くの人に共有しよう！
              </Typography>
            </Stack>
            <Stack
              sx={{
                mt: 2,
                // textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  '@media screen and (max-width:285px)': {
                    mr: 25,
                    ml: 1,
                  },
                }}
              >
                <img
                  src="https://film-connect.web.app/receive_img.png"
                  className="receive-letter-logo"
                  alt="receive-letter-logo"
                  width="200"
                  height="250"
                />
              </Typography>
              <Typography variant="h5" sx={{ p: 1 }}>
                おすすめ映画レターを受け取る
              </Typography>
              <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              受け取るボタンを押すとランダムに誰かがおすすめしてくれた映画レターが表示されます！
              <br />
              Twitterシェアをすることで受け取ったレターが誰から送られてきたかわかります!
              <br />
              この機会にTwitterで映画の感想や感謝の言葉を伝え交流の輪を広げましょう!
              </Typography>
            </Stack>
            <Stack
              sx={{
                mt: 2,
                // textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  '@media screen and (max-width:285px)': {
                    mr: 25,
                    ml: 1,
                  },
                }}
              >
                <img
                  src="https://film-connect.web.app/ranking.png"
                  className="ranking-logo"
                  alt="ranking-logo"
                  width="200"
                  height="300"
                />
              </Typography>
              <Typography variant="h5" sx={{ p: 1 }}>
                映画ランキング
              </Typography>
              <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              どの映画がレター形式で多く作成されたかランキングページで一目でわかります！
              <br />
              また多くの方が観たことない映画ランキングも見ることができます！
              <br />
              あなたの知っているマニアックな映画もこの機会におすすめましょう！
              <br />
              多くの映画レターを作成し、ランキングに入りましょう！
              </Typography>
            </Stack>
          </Box>
        </Box>
      )}
    </BaseLayout>
  )
}

import { BaseLayout } from '@/components/layouts'
import { Stack, Typography, Box } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'

export const Top = () => {
  const matches = useMediaQuery('(min-width:825px)')
  const { t, i18n } = useTranslation()

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
            <Typography variant="h4"> {t('top.useage')} </Typography>
          </Stack>
          <Stack
            sx={{
              textAlign: 'center',
            }}
          >
            <TwitterIcon
              sx={{ fontSize: '100px', mr: 'auto', ml: 'auto', mt: 8, mb: 5 }}
            />
            <Typography variant="h5" sx={{ p: 1, mt: 1 }}>
              {t('top.loginWithTwitter')}
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 7 }}>
              {t('top.loginDescription1')}
              <br />
              {t('top.loginDescription2')}
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
              {t('top.writeRecommendedFilmLetters')}
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              {t('top.writeRecommendedFilmLettersDescription1')}
              <br />
              {t('top.writeRecommendedFilmLettersDescription2')}
              <br />
              {t('top.writeRecommendedFilmLettersDescription3')}
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
              {t('top.receiveSomeoneRecommendedFilmLetters')}
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              {t('top.receiveSomeoneRecommendedFilmLettersDescription1')}
              <br />
              {t('top.receiveSomeoneRecommendedFilmLettersDescription2')}
              <br />
              {t('top.receiveSomeoneRecommendedFilmLettersDescription3')}
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
              {t('top.ranking')}
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              {t('top.rankingDescription1')}
              <br />
              {t('top.rankingDescription2')}
              <br />
              {t('top.rankingDescription3')}
              <br />
              {t('top.rankingDescription4')}
            </Typography>
            <Typography sx={{ mb: 5, textAlign: 'right' }}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                className="tmdb-logo"
                alt="tmdb-logo"
                width="20"
                height="20"
              />
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
              <Typography variant="h4"> {t('top.useage')} </Typography>
            </Stack>
            <Stack
              sx={{
                mt: 10,
              }}
            >
              <TwitterIcon
                sx={{ fontSize: '80px', mr: 'auto', ml: 'auto', mb: 5 }}
              />
              <Typography variant="h5" sx={{ p: 1, mt: 3 }}>
                {t('top.loginWithTwitter')}
              </Typography>
              <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
                {t('top.loginDescription1')}
                <br />
                {t('top.loginDescription2')}
              </Typography>
            </Stack>
            <Stack
              sx={{
                mt: 2,
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
                {t('top.writeRecommendedFilmLetters')}
              </Typography>
              <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
                {t('top.writeRecommendedFilmLettersDescription1')}
                <br />
                {t('top.writeRecommendedFilmLettersDescription2')}
                <br />
                {t('top.writeRecommendedFilmLettersDescription3')}
              </Typography>
            </Stack>
            <Stack
              sx={{
                mt: 2,
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
              {t('top.receiveSomeoneRecommendedFilmLetters')}
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              {t('top.receiveSomeoneRecommendedFilmLettersDescription1')}
              <br />
              {t('top.receiveSomeoneRecommendedFilmLettersDescription2')}
              <br />
              {t('top.receiveSomeoneRecommendedFilmLettersDescription3')}
            </Typography>
            </Stack>
            <Stack
              sx={{
                mt: 2,
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
              {t('top.ranking')}
            </Typography>
            <Typography variant="subtitle1" sx={{ p: 1, mt: 1, mb: 10 }}>
              {t('top.rankingDescription1')}
              <br />
              {t('top.rankingDescription2')}
              <br />
              {t('top.rankingDescription3')}
              <br />
              {t('top.rankingDescription4')}
              </Typography>
              <Typography sx={{ mb: 5, textAlign: 'right' }}>
                <img
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                  className="tmdb-logo"
                  alt="tmdb-logo"
                  width="20"
                  height="20"
                />
              </Typography>
            </Stack>
          </Box>
        </Box>
      )}
    </BaseLayout>
  )
}

import { BaseLayout } from '../layouts'
import { Typography, Box, List, ListItem, Link } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'

export const PrivacyPolicyEnglish = () => {
  const { t } = useTranslation()
  const matches = useMediaQuery('(min-width:575px)')

  return (
    <BaseLayout>
      {matches ? (
        <>
          <Typography
            variant="h4"
            sx={{ mt: 12, textAlign: 'center', mb: 5, fontWeight: 'bold' }}
          >
            Privacy Policy
          </Typography>
          <Box sx={{ ml: 5, mb: 8, mt: 5 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                User Information to be Acquired
              </Typography>
              the Site may acquire from the user(s) (the “User(s)) the following
              information (the “User Information”):
              <List>
                <ListItem>・Name (including nicknames and pen names)</ListItem>
                <ListItem>・Photos and videos</ListItem>
                <ListItem>
                  ・ID used by the Users for external services or any other
                  information which the Users authorize the service providers of
                  such external services to disclose by privacy settings of such
                  external services
                </ListItem>
                <ListItem>
                  ・Identification information generated by using cookies
                </ListItem>
                <ListItem>
                  ・Information regarding the OS and the terminal used by the
                  User, such as ID generated by the OS, the type of the
                  terminal, and the terminal identifier
                </ListItem>
                <ListItem>
                  ・History of the Users’ activities on the Site’s website, such
                  as time spent on the Site’s website, input history, and
                  purchase history
                </ListItem>
                <ListItem>
                  ・Usage history of the Site’s applications such as startup
                  time, input history, and purchase history of the Site’s
                  applications
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Purpose of Use of User Information
              </Typography>
              The Site uses User information for the following purpose:
              <List>
                <ListItem>
                  {' '}
                  ・to register or verify the User’s identity and authenticate
                  with the Company’s services (the “Services”)
                </ListItem>
                <ListItem>
                  ・to manage the User’s usage history of the Services
                </ListItem>
                <ListItem>
                  ・to analyze the User’s activity history in the Services to
                  maintain and improve the Services
                </ListItem>
                <ListItem>・to inform the User of the Services</ListItem>
                <ListItem>・to respond to the User’s inquiries</ListItem>
                <ListItem>
                  ・to correspond to actions that violate the Site’s terms and
                  conditions, laws and regulations
                </ListItem>
                <ListItem>
                  ・to inform the User of changes to, discontinuance of,
                  termination of, or cancellation of the Services
                </ListItem>
                <ListItem>
                  ・to inform the changes etc. to the Site’s terms and
                  conditions
                </ListItem>
                <ListItem>
                  {' '}
                  ・any other act to provide, maintain, protect and improve the
                  Services
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Third Party Provision
              </Typography>
              The Site will not provide any information collected from the Users
              that constitutes personal data (Article 2, Paragraph (6) of Act on
              the Protection of Personal Information) to any third party
              (including anyone outside Japan) without obtaining in advance the
              Users’ consent. However, this shall not apply in the following
              cases:
              <List>
                <ListItem>
                  ・if the Site outsource the handling of personal data
                </ListItem>
                <ListItem>・if the Site or the Services are acquired</ListItem>
                <ListItem>
                  ・if the Site jointly use personal data with its business
                  partner (if there is a specific joint use, the details will be
                  announced separately.)
                </ListItem>
                <ListItem>
                  ・any other cases in which provision of personal data to a
                  third party is permitted by law
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Access Analysis Tools
              </Typography>
              <Typography>
                The Site uses "Google Analytics" to analyze the User’s access.
                Google Analytics uses cookies to collect traffic data. Traffic
                data is collected anonymously and is not personally
                identifiable. By disabling cookies, the User can refuse
                collection of these information. Please check your browser
                settings for details. To learn more about Google Analytics,
                visit:{' '}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                  underline="hover"
                >
                  the Google Analytics Terms of Use.
                </Link>
              </Typography>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {' '}
                Amendment to Privacy Policy
              </Typography>
              The Site will amend this Privacy Policy as necessary. In such
              case, the Company will announce or notify, in an appropriate
              manner, the timing when the amended Privacy Policy will be
              enforced and the contents thereof.
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {' '}
                Contact Information
              </Typography>
              If you wish to disclose, correct, suspend use of or delete your
              information, please contact us at the enquiry form. In such a
              case, we will confirm that such request was made by the person
              himself/herself, by asking such person to present his/her driver's
              license or by other means designated by the Company. Requests for
              disclosure of information, whether such information will be
              disclosed or not, are subject to a processing fee of 1,000 yen per
              case at the time of application.
            </Box>
            <Typography variant="subtitle1"></Typography>Prescribed on 01, 15,
            2023
          </Box>
        </>
      ) : (
        <>
          <Typography
            variant="h5"
            sx={{ mt: 12, textAlign: 'center', mb: 5, fontWeight: 'bold' }}
          >
            Privacy Policy
          </Typography>
          <Box sx={{ ml: 5, mb: 8, mt: 5 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                User Information to be Acquired
              </Typography>
              the Site may acquire from the user(s) (the “User(s)) the following
              information (the “User Information”):
              <List>
                <ListItem>・Name (including nicknames and pen names)</ListItem>
                <ListItem>・Photos and videos</ListItem>
                <ListItem>
                  ・ID used by the Users for external services or any other
                  information which the Users authorize the service providers of
                  such external services to disclose by privacy settings of such
                  external services
                </ListItem>
                <ListItem>
                  ・Identification information generated by using cookies
                </ListItem>
                <ListItem>
                  ・Information regarding the OS and the terminal used by the
                  User, such as ID generated by the OS, the type of the
                  terminal, and the terminal identifier
                </ListItem>
                <ListItem>
                  ・History of the Users’ activities on the Site’s website, such
                  as time spent on the Site’s website, input history, and
                  purchase history
                </ListItem>
                <ListItem>
                  ・Usage history of the Site’s applications such as startup
                  time, input history, and purchase history of the Site’s
                  applications
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Purpose of Use of User Information
              </Typography>
              The Site uses User information for the following purpose:
              <List>
                <ListItem>
                  {' '}
                  ・to register or verify the User’s identity and authenticate
                  with the Company’s services (the “Services”)
                </ListItem>
                <ListItem>
                  ・to manage the User’s usage history of the Services
                </ListItem>
                <ListItem>
                  ・to analyze the User’s activity history in the Services to
                  maintain and improve the Services
                </ListItem>
                <ListItem>・to inform the User of the Services</ListItem>
                <ListItem>・to respond to the User’s inquiries</ListItem>
                <ListItem>
                  ・to correspond to actions that violate the Site’s terms and
                  conditions, laws and regulations
                </ListItem>
                <ListItem>
                  ・to inform the User of changes to, discontinuance of,
                  termination of, or cancellation of the Services
                </ListItem>
                <ListItem>
                  ・to inform the changes etc. to the Site’s terms and
                  conditions
                </ListItem>
                <ListItem>
                  {' '}
                  ・any other act to provide, maintain, protect and improve the
                  Services
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Third Party Provision
              </Typography>
              The Site will not provide any information collected from the Users
              that constitutes personal data (Article 2, Paragraph (6) of Act on
              the Protection of Personal Information) to any third party
              (including anyone outside Japan) without obtaining in advance the
              Users’ consent. However, this shall not apply in the following
              cases:
              <List>
                <ListItem>
                  ・if the Site outsource the handling of personal data
                </ListItem>
                <ListItem>・if the Site or the Services are acquired</ListItem>
                <ListItem>
                  ・if the Site jointly use personal data with its business
                  partner (if there is a specific joint use, the details will be
                  announced separately.)
                </ListItem>
                <ListItem>
                  ・any other cases in which provision of personal data to a
                  third party is permitted by law
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Access Analysis Tools
              </Typography>
              <Typography>
                The Site uses "Google Analytics" to analyze the User’s access.
                Google Analytics uses cookies to collect traffic data. Traffic
                data is collected anonymously and is not personally
                identifiable. By disabling cookies, the User can refuse
                collection of these information. Please check your browser
                settings for details. To learn more about Google Analytics,
                visit:{' '}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                  underline="hover"
                >
                  the Google Analytics Terms of Use.
                </Link>
              </Typography>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {' '}
                Amendment to Privacy Policy
              </Typography>
              The Site will amend this Privacy Policy as necessary. In such
              case, the Company will announce or notify, in an appropriate
              manner, the timing when the amended Privacy Policy will be
              enforced and the contents thereof.
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {' '}
                Contact Information
              </Typography>
              If you wish to disclose, correct, suspend use of or delete your
              information, please contact us at the enquiry form. In such a
              case, we will confirm that such request was made by the person
              himself/herself, by asking such person to present his/her driver's
              license or by other means designated by the Company. Requests for
              disclosure of information, whether such information will be
              disclosed or not, are subject to a processing fee of 1,000 yen per
              case at the time of application.
            </Box>
            <Typography variant="subtitle1"></Typography>Prescribed on 01, 15,
            2023
          </Box>
        </>
      )}
    </BaseLayout>
  )
}

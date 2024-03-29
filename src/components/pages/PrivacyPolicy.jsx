import { BaseLayout } from '../layouts'
import { Typography, Box, List, ListItem, Link } from '@mui/material'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
export const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation()
  const matches = useMediaQuery('(min-width:575px)')

  return (
    <BaseLayout>
      {matches ? (
        <>
          <Typography
            variant="h4"
            sx={{ mt: 12, textAlign: 'center', mb: 5, fontWeight: 'bold' }}
          >
            {t('privacyPolicy')}
          </Typography>
          <Box sx={{ ml: 5, mt: 5, mb: 8 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                お客様から取得する情報
              </Typography>
              当サイトは、お客様から以下の情報を取得します。
              <List>
                <ListItem>
                  ・氏名(ニックネームやペンネームも含む) 写真や動画
                </ListItem>
                <ListItem>
                  ・外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
                </ListItem>
                <ListItem>
                  ・Cookie(クッキー)を用いて生成された識別情報
                </ListItem>
                <ListItem>
                  ・OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報
                </ListItem>
                <ListItem>
                  ・当社ウェブサイトの滞在時間、入力履歴、購買履歴等の当社ウェブサイトにおけるお客様の行動履歴
                </ListItem>
                <ListItem>
                  ・当社アプリの起動時間、入力履歴、購買履歴等の当社アプリの利用履歴
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                お客様の情報を利用する目的
              </Typography>
              当サイトは、お客様から取得した情報を、以下の目的のために利用します。
              <List>
                <ListItem>
                  {' '}
                  ・当社サービスに関する登録の受付、お客様の本人確認、認証のため
                </ListItem>
                <ListItem>
                  ・お客様の当社サービスの利用履歴を管理するため
                </ListItem>
                <ListItem>
                  ・当社サービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため
                </ListItem>
                <ListItem>・当社のサービスに関するご案内をするため</ListItem>
                <ListItem>・お客様からのお問い合わせに対応するため</ListItem>
                <ListItem>
                  ・当社の規約や法令に違反する行為に対応するため
                </ListItem>
                <ListItem>
                  ・当社サービスの変更、提供中止、終了、契約解除をご連絡するため
                </ListItem>
                <ListItem>・当社規約の変更等を通知するため</ListItem>
                <ListItem>
                  {' '}
                  ・以上の他、当社サービスの提供、維持、保護及び改善のため
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                安全管理のために講じた措置
              </Typography>
              当サイトが、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、
              法令の定めに従い個別にご回答させていただきます。
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                第三者提供
              </Typography>
              当サイトは、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、
              第三者（日本国外にある者を含みます。）に提供しません。
              但し、次の場合は除きます。
              <List>
                <ListItem>・個人データの取扱いを外部に委託する場合</ListItem>
                <ListItem>・当社や当社サービスが買収された場合</ListItem>
                <ListItem>
                  ・事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
                </ListItem>
                <ListItem>
                  ・その他、法律によって合法的に第三者提供が許されている場合
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                アクセス解析ツール
              </Typography>
              <Typography>当サイトは、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。</Typography>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                underline="hover"
              >
                Google アナリティクス利用規約へアクセス
              </Link>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {' '}
                プライバシーポリシーの変更
              </Typography>
              当サイトは、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {' '}
                お問い合わせ{' '}
              </Typography>
              お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、お問合せフォームからご連絡ください。
              この場合、必ず、運転免許証のご提示等当社が指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。
            </Box>
            <Typography variant="subtitle1"></Typography>2023年01月15日 制定
          </Box>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{ mt: 12, textAlign: 'center', mb: 5, fontWeight: 'bold' }}
          >
            {t('privacyPolicy')}
          </Typography>
          <Box sx={{ml:2, mt: 5, mb: 8 }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                お客様から取得する情報
              </Typography>
              当サイトは、お客様から以下の情報を取得します。
              <List>
                <ListItem>
                  ・氏名(ニックネームやペンネームも含む) 写真や動画
                </ListItem>
                <ListItem>
                  ・外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
                </ListItem>
                <ListItem>
                  ・Cookie(クッキー)を用いて生成された識別情報
                </ListItem>
                <ListItem>
                  ・OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報
                </ListItem>
                <ListItem>
                  ・当社ウェブサイトの滞在時間、入力履歴、購買履歴等の当社ウェブサイトにおけるお客様の行動履歴
                </ListItem>
                <ListItem>
                  ・当社アプリの起動時間、入力履歴、購買履歴等の当社アプリの利用履歴
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                お客様の情報を利用する目的
              </Typography>
              当サイトは、お客様から取得した情報を、以下の目的のために利用します。
              <List>
                <ListItem>
                  {' '}
                  ・当社サービスに関する登録の受付、お客様の本人確認、認証のため
                </ListItem>
                <ListItem>
                  ・お客様の当社サービスの利用履歴を管理するため
                </ListItem>
                <ListItem>
                  ・当社サービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため
                </ListItem>
                <ListItem>・当社のサービスに関するご案内をするため</ListItem>
                <ListItem>・お客様からのお問い合わせに対応するため</ListItem>
                <ListItem>
                  ・当社の規約や法令に違反する行為に対応するため
                </ListItem>
                <ListItem>
                  ・当社サービスの変更、提供中止、終了、契約解除をご連絡するため
                </ListItem>
                <ListItem>・当社規約の変更等を通知するため</ListItem>
                <ListItem>
                  {' '}
                  ・以上の他、当社サービスの提供、維持、保護及び改善のため
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                安全管理のために講じた措置
              </Typography>
              当サイトが、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、
              法令の定めに従い個別にご回答させていただきます。
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                第三者提供
              </Typography>
              当サイトは、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、
              第三者（日本国外にある者を含みます。）に提供しません。
              但し、次の場合は除きます。
              <List>
                <ListItem>・個人データの取扱いを外部に委託する場合</ListItem>
                <ListItem>・当社や当社サービスが買収された場合</ListItem>
                <ListItem>
                  ・事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
                </ListItem>
                <ListItem>
                  ・その他、法律によって合法的に第三者提供が許されている場合
                </ListItem>
              </List>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                アクセス解析ツール
              </Typography>
              <Typography>
                当サイトは、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
              </Typography>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                underline="hover"
              >
                Google アナリティクス利用規約
              </Link>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {' '}
                プライバシーポリシーの変更
              </Typography>
              当サイトは、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {' '}
                お問い合わせ{' '}
              </Typography>
              お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、お問合せフォームからご連絡ください。
              この場合、必ず、運転免許証のご提示等当社が指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。
            </Box>
            <Typography variant="subtitle1"></Typography>2023年01月15日 制定
          </Box>
        </>
      )}
    </BaseLayout>
  )
}

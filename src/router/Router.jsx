import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import {
  Top,
  Login,
  MyPage,
  Search,
  Receive,
  WriteLetterPage,
  Ranking,
  PrivacyPolicy,
  PrivacyPolicyEnglish,
  UseTerms,
  UseTermsEnglish,
  SearchEnglish,
  LoginEnglish
} from '@/components/pages'
import { MyContext } from '@/App'
import { useContext,useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Router = () => {
  const { t, i18n } = useTranslation()

  const [user] = useContext(MyContext)

  const Private = (props) => {
    if (user) {
      return props.component
    } else {
      return <Navigate to="/login" />
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/login" element={ i18n.language === "ja" ? <Login /> : <LoginEnglish /> } />
        <Route path="/privacypolicyenglish" element={<PrivacyPolicyEnglish />} />
        <Route path="/privacypolicy" element={ i18n.language === "ja" ? <PrivacyPolicy/>: <PrivacyPolicyEnglish/>} />
        <Route path="/usetermsenglish" element={<UseTermsEnglish />} />
        <Route path="/useterms"  element={ i18n.language === "ja" ? <UseTerms/>: <UseTermsEnglish/>}/>
        <Route path="/mypage" element={<Private component={<MyPage />} />} />
        <Route path="/searchenglish" element={<Private component={< SearchEnglish/>} />} />
        <Route path="/search" element={ i18n.language === "ja" ? <Private component={<Search />}/>:  <Private component={< SearchEnglish/>} />} />  
        <Route path="/receive" element={<Private component={<Receive />} />} />
        <Route
          path="/writeletter"
          element={<Private component={<WriteLetterPage />} />}
        />
        <Route path="/ranking" element={<Private component={<Ranking />} />} />
      </Routes>
    </BrowserRouter>
  )
}

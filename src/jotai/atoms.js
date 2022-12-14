import { atom } from 'jotai'

//初期値
export const recieveMovieDataAtom = atom({
  movieTitle: '',
  movieImg: '',
  receiverId: '',
  letterId: '',
  userId: '',
  recommendPoint: '',
  twitterUserName: '',
})

export const handleFadeModal = atom(false)

export const madeLettersDataAtom = atom([])

export const handleFlashMessageAtom = atom(false)

export const handleSendFlashMessage = atom(false)

export const handleGetErrorMessageAtom = atom('')

export const handleGetCreatedLettersRankingAtom = atom([])

export const handleGetFirstSawFilmsRankingAtom = atom([])

export const handleRegistNotWatchFilmAtom = atom(true)

export const handleGetFirstSawFilmLettersIdAtom = atom([])

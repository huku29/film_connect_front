import { atom } from 'jotai'

//初期値
export const recieveMovieDataAtom = atom({
  movieTitle: '',
  movieImg: '',
  recommendPoint: '',
  twitterUserName: '',
})

export const handleFadeModal = atom(false)
import { initializeApp } from 'firebase/app'

export const getFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyASW78FvHKMjLR_hn95mzEZjfC74bIS0F0',
    authDomain: 'rsend-139d6.firebaseapp.com',
    projectId: 'rsend-139d6',
    storageBucket: 'rsend-139d6.appspot.com',
    messagingSenderId: '684931864397',
    appId: '1:684931864397:web:7e97baa9688941c6034904',
    measurementId: 'G-P996JPYB5Y',
  }

  return initializeApp(firebaseConfig)
}

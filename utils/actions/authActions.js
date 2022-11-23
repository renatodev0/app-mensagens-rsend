import { getFirebaseApp } from '../firebaseHelper'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { child, getDatabase, ref, set, update } from 'firebase/database'
import { authenticate, logout } from '../../store/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUserData } from './userActions'

let timer

export const signUp = (nome, sobrenome, email, senha) => {
  return async (dispatch) => {
    const app = getFirebaseApp()
    const auth = getAuth(app)

    try {
      const result = await createUserWithEmailAndPassword(auth, email, senha)
      const { uid, stsTokenManager } = result.user
      const { accessToken, expirationTime } = stsTokenManager

      const expireDate = new Date(expirationTime)
      const timeNow = new Date()
      const timeToExpire = expireDate - timeNow

      const userData = await createUser(nome, sobrenome, email, uid)

      dispatch(authenticate({ token: accessToken, userData }))
      saveDataToStorage(accessToken, uid, expireDate)

      timer = setTimeout(() => {
        dispatch(userLogout())
      }, timeToExpire)
    } catch (error) {
      console.log(error)
      const errorCode = error.code

      let message = 'Algo deu errado'

      if (errorCode == 'auth/email-already-in-use') {
        message = 'Este email já está em uso.'
      }

      throw new Error(message)
    }
  }
}

export const signIn = (email, senha) => {
  return async (dispatch) => {
    const app = getFirebaseApp()
    const auth = getAuth(app)

    try {
      const result = await signInWithEmailAndPassword(auth, email, senha)
      const { uid, stsTokenManager } = result.user
      const { accessToken, expirationTime } = stsTokenManager

      const expireDate = new Date(expirationTime)
      const timeNow = new Date()
      const timeToExpire = expireDate - timeNow

      const userData = await getUserData(uid)

      dispatch(authenticate({ token: accessToken, userData }))
      saveDataToStorage(accessToken, uid, expireDate)

      timer = setTimeout(() => {
        dispatch(userLogout())
      }, timeToExpire)
    } catch (error) {
      console.log(error)
      const errorCode = error.code

      let message = 'Algo deu errado'

      if (
        errorCode == 'auth/wrong-password' ||
        errorCode == 'auth/user-not-found'
      ) {
        message = 'Credenciais incorretas.'
      }

      throw new Error(message)
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    AsyncStorage.clear()
    clearTimeout(timer)
    dispatch(logout())
  }
}

export const updateSignedInUserData = async (userId, newData) => {
  console.log(newData)
  if (newData.nome && newData.sobrenome) {
    const nomeCompleto = `${newData.nome} ${newData.sobrenome}`.toLowerCase()
    newData.nomeCompleto = nomeCompleto
  }

  const dbRef = ref(getDatabase())
  const childRef = child(dbRef, `users/${userId}`)
  await update(childRef, newData)
}

const createUser = async (nome, sobrenome, email, userID) => {
  const nomeCompleto = `${nome} ${sobrenome}`.toLowerCase()
  const userData = {
    nome,
    sobrenome,
    nomeCompleto,
    email,
    userID,
    signUpDate: new Date().toISOString(),
  }

  const dbRef = ref(getDatabase())
  const childRef = child(dbRef, `users/${userID}`)
  await set(childRef, userData)
  return userData
}

const saveDataToStorage = (token, userId, expireDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expireDate: expireDate.toISOString(),
    }),
  )
}

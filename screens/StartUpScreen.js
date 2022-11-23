import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useDispatch } from 'react-redux'
import colors from '../consts/colors'
import { authenticate, autoLogin } from '../store/authSlice'
import { getUserData } from '../utils/actions/userActions'

const StartUpScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      const storedAuthInfo = await AsyncStorage.getItem('userData')

      if (!storedAuthInfo) {
        dispatch(autoLogin())
        return
      }

      const parsedData = JSON.parse(storedAuthInfo)
      const { token, userID, expireDate: expireDateString } = parsedData

      const expireDate = new Date(expireDateString)

      if (expireDate <= new Date() || !token || !userID) {
        dispatch(autoLogin())
        return
      }

      const userData = await getUserData(userID)
      dispatch(authenticate({ token: token, userData }))
    }

    tryLogin()
  }, [dispatch])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.midBlue} />
    </View>
  )
}

export default StartUpScreen

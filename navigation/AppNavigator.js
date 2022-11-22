import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import Navigator from './Navigator'
import AuthScreen from '../screens/LoginScreen'
import { useSelector } from 'react-redux'
import StartUpScreen from '../screens/StartUpScreen'

const AppNavigator = (props) => {
  const isAuth = useSelector(
    (state) => state.auth.token !== null && state.auth.token !== '',
  )
  const autoLogin = useSelector((state) => state.auth.autoLogin)

  return (
    <NavigationContainer>
      {isAuth && <Navigator></Navigator>}
      {!isAuth && autoLogin && <AuthScreen />}
      {!isAuth && !autoLogin && <StartUpScreen />}
    </NavigationContainer>
  )
}

export default AppNavigator

import 'react-native-gesture-handler'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import * as Font from 'expo-font'
import AppNavigator from './navigation/AppNavigator'
import { Provider } from 'react-redux'
import { store } from './store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'

LogBox.ignoreLogs(['AsyncStorage has been extracted'])
// AsyncStorage.clear()

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require('./assets/fonts/Roboto-Black.ttf'),
          regular: require('./assets/fonts/Roboto-Regular.ttf'),
          italic: require('./assets/fonts/Roboto-Italic.ttf'),
        })
      } catch (error) {
        console.log.error(error)
      } finally {
        setAppLoaded(true)
      }
    }

    prepare()
  }, [])

  const onLayout = useCallback(async () => {
    if (appLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [appLoaded])

  if (!appLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container} onLayout={onLayout}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'italic',
  },
})

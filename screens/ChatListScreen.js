import react, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'
import CustomHeaderButton from '../components/CustomHeaderButton'

const ChatListScreen = (props) => {
  const selectedUser = props.route?.params?.selectedUserId

  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Nova conversa"
              iconName="create-outline"
              onPress={() => props.navigation.navigate('NewChat')}
            />
          </HeaderButtons>
        )
      },
    })
  }, [])

  useEffect(() => {
    if (!selectedUser) {
      return
    }

    const chatUsers = [selectedUser, userData.userID]

    const navigationProps = {
      newChatData: { users: chatUsers },
    }

    props.navigation.navigate('Chat', navigationProps)
  }, [props.route?.params])

  return (
    <View style={styles.container}>
      <Text>Conversas</Text>

      <Button title="Chat" onPress={() => props.navigation.navigate('Chat')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ChatListScreen

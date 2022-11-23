import react, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather } from '@expo/vector-icons'

import fundo from '../assets/images/fundo.jpg'
import colors from '../consts/colors'
import { useSelector } from 'react-redux'
import Bubble from '../components/Bubble'
import PageContainer from '../components/PageContainer'
import { createChat } from '../utils/actions/chatActions'

const ChatScreen = (props) => {
  const userData = useSelector((state) => state.auth.userData)
  const storedUsers = useSelector((state) => state.users.storedUsers)

  const [chatUsers, setChatUsers] = useState([])
  const [message, setMessage] = useState('')
  const [chatId, setChatId] = useState(props.route?.params?.chatId)

  const chatData = props.route?.params?.newChatData

  const getChatTitleFromName = () => {
    const otherUserId = chatUsers.find((uid) => uid !== userData.userID)
    const otherUserData = storedUsers[otherUserId]

    return otherUserData && `${otherUserData.nome} ${otherUserData.sobrenome}`
  }

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: getChatTitleFromName(),
    })
    setChatUsers(chatData.users)
  }, [chatUsers])

  const sendMessage = useCallback(async () => {
    try {
      let id = chatId
      if (!id) {
        id = await createChat(userData.userID, props.route.params.newChatData)
        setChatId(id)
      }
    } catch (error) {}

    setMessage('')
  }, [message, chatId])

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      <ImageBackground source={fundo} style={styles.fundo}>
        <PageContainer style={{ backgroundColor: 'transparent' }}>
          {!chatId && (
            <Bubble text="Essa é uma nova conversa, diga Oi!" type="system" />
          )}
        </PageContainer>
      </ImageBackground>

      <View style={styles.inputView}>
        <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
          <AntDesign name="pluscircleo" size={25} color={colors.midBlue} />
        </TouchableOpacity>

        <TextInput
          style={styles.textBox}
          value={message}
          onChangeText={(text) => setMessage(text)}
          onSubmitEditing={sendMessage}
        />

        {message === '' && (
          <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
            <Feather name="camera" size={25} color={colors.midBlue} />
          </TouchableOpacity>
        )}

        {message !== '' && (
          <TouchableOpacity
            style={{ ...styles.mediaButton, ...styles.sendButton }}
            onPress={sendMessage}
          >
            <Feather name="send" size={20} color={colors.steelBlue} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  fundo: {
    flex: 1,
  },
  inputView: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  textBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.steelBlue,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  mediaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
  sendButton: {
    backgroundColor: colors.midBlue,
    borderRadius: 60,
    padding: 5,
  },
})

export default ChatScreen

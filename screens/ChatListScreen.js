import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'
import CustomHeaderButton from '../components/CustomHeaderButton'
import DataItem from '../components/DataItem'
import PageContainer from '../components/PageContainer'
import PageTitle from '../components/PageTitle'

const ChatListScreen = (props) => {
  const selectedUser = props.route?.params?.selectedUserId

  const userData = useSelector((state) => state.auth.userData)
  const storedUsers = useSelector((state) => state.users.storedUsers)
  const userChats = useSelector((state) => {
    const chatsData = state.chats.chatsData
    return Object.values(chatsData).sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })
  })

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
    <PageContainer>
      <PageTitle text="Conversas" />

      <FlatList
        data={userChats}
        renderItem={(itemData) => {
          const chatData = itemData.item
          const chatId = chatData.key

          const otherUserId = chatData.users.find(
            (uid) => uid !== userData.userID,
          )
          const otherUser = storedUsers[otherUserId]

          if (!otherUser) return

          const title = `${otherUser.nome} ${otherUser.sobrenome}`
          const subTitle = chatData.latestMessageText || 'New chat'
          const image = otherUser.profilePicture

          return (
            <DataItem
              title={title}
              subTitle={subTitle}
              image={image}
              onPress={() =>
                props.navigation.navigate('Chat', { chatId })
              }
            />
          )
        }}
      />
    </PageContainer>
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

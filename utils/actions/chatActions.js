import { child, getDatabase, push, ref } from 'firebase/database'
import { getFirebaseApp } from '../firebaseHelper'

export const createChat = async (loggedInUserId, chatData) => {
  console.log('aqui')
  const newChatData = {
    ...chatData,
    createdBy: loggedInUserId,
    updatedBy: loggedInUserId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const app = getFirebaseApp()
  const dbRef = ref(getDatabase(app))
  const newChat = await push(child(dbRef, 'chats'), newChatData)

  const chatUsers = newChatData.users
  for (let i = 0; i < chatUsers.length; i++) {
    const userID = chatUsers[i]
    await push(child(dbRef, `userChats/${userID}`), newChat.key)
  }

  return newChat.key
}

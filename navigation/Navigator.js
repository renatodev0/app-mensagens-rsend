import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import ChatListScreen from '../screens/ChatListScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ChatSettingsScreen from '../screens/ChatSettingsScreen'
import ChatScreen from '../screens/ChatScreen'
import NewChatScreen from '../screens/NewChatScreen'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getFirebaseApp } from '../utils/firebaseHelper'
import { child, get, getDatabase, off, onValue, ref } from 'firebase/database'
import { ActivityIndicator, View } from 'react-native'
import colors from '../consts/colors'
import { setChatsData } from '../store/chatSlice'
import { setChatMessages } from '../store/messagesSlice'
import { setStoredUsers } from '../store/userSlice'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitle: '' }}>
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          tabBarLabel: 'Conversas',
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="ios-chatbubbles-outline"
                size={size}
                color={color}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="settings-outline" size={size} color={color} />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ChatSettings"
          component={ChatSettingsScreen}
          options={{
            headerTitle: 'Configurações do Chat',
          }}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
        <Stack.Screen name="NewChat" component={NewChatScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const Navigator = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const userData = useSelector(state => state.auth.userData);
  const storedUsers = useSelector(state => state.users.storedUsers);

  useEffect(() => {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const userChatsRef = child(dbRef, `userChats/${userData.userID}`);
    

    const refs = [userChatsRef];

    onValue(userChatsRef, (querySnapshot) => {
      const chatIdsData = querySnapshot.val() || {};
      const chatIds = Object.values(chatIdsData);

      const chatsData = {};
      let chatsFoundCount = 0;

      for (let i = 0; i < chatIds.length; i++) {
        const chatId = chatIds[i];
        const chatRef = child(dbRef, `chats/${chatId}`);
        refs.push(chatRef);

        onValue(chatRef, (chatSnapshot) => {
          chatsFoundCount++;
          
          const data = chatSnapshot.val();

          if (data) {
            data.key = chatSnapshot.key;

            data.users.forEach(userID => {
              if (storedUsers[userID]) return;

              const userRef = child(dbRef, `users/${userID}`);

              get(userRef)
              .then(userSnapshot => {
                const userSnapshotData = userSnapshot.val();
                dispatch(setStoredUsers({ newUsers: { userSnapshotData } }))
              })

              refs.push(userRef);
            })

            chatsData[chatSnapshot.key] = data;
          }

          if (chatsFoundCount >= chatIds.length) {
            dispatch(setChatsData({ chatsData }));
            setIsLoading(false);
          }
        })

        const messagesRef = child(dbRef, `messages/${chatId}`);
        refs.push(messagesRef);

        onValue(messagesRef, messagesSnapshot => {
          const messagesData = messagesSnapshot.val();
          dispatch(setChatMessages({ chatId, messagesData }));
        })

        if (chatsFoundCount == 0) {
          setIsLoading(false);
        }
      }

    })

    return () => {
      refs.forEach(ref => off(ref));
    }
  }, []);

  if (isLoading) {
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </View>
  }


  return (
    <StackNavigator />
  );
}

export default Navigator

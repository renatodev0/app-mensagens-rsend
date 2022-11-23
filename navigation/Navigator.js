import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import ChatListScreen from '../screens/ChatListScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ChatSettingsScreen from '../screens/ChatSettingsScreen'
import ChatScreen from '../screens/ChatScreen'
import NewChatScreen from '../screens/NewChatScreen'

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

const Navigator = (props) => {
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

export default Navigator

import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import ChatScreen from '../screens/ChatScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{ headerTitle: ''}}>
      <Tab.Screen name="Chat" component={ChatScreen} options={{
        tabBarLabel: 'Conversas',
        tabBarIcon: ({color, size}) => {
          return <Ionicons name="ios-chatbubbles-outline" size={size} color={color} />
        }
      }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
        tabBarLabel: 'Configurações',
        tabBarIcon: ({color, size}) => {
          return <Ionicons name="settings-outline" size={size} color={color} />
        }
      }}/>
    </Tab.Navigator>
  )
}

const Navigator = (props) => {
    return (
        <Stack.Navigator>

        <Stack.Screen name="Home" component={TabNavigator} options={
            {
                headerShown: false
            }
        } />
        <Stack.Screen name="ChatSettings" component={ChatSettingsScreen} options={
            {
                headerTitle: "Configurações do Chat",
            }
        } />

    </Stack.Navigator>
    );
}

export default Navigator;
import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import Navigator from "./Navigator";
import AuthScreen from "../screens/LoginScreen";

const AppNavigator = props => {
    const isAuth = false;

    return (
        <NavigationContainer>
            {isAuth && <Navigator></Navigator>}
            {!isAuth && <AuthScreen/>}
        </NavigationContainer>
    )
}

export default AppNavigator;


import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import Navigator from "./Navigator";

const AppNavigator = props => {
    return (
        <NavigationContainer>
            <Navigator></Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;


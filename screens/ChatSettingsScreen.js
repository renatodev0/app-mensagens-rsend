import react from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const ChatSettingsScreen = props => {

    return <View style={styles.container}>
        <Text>Configurações do chat</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ChatSettingsScreen;
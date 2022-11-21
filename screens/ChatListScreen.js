import react from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const ChatListScreen = props => {

    return <View style={styles.container}>
        <Text>Conversas</Text>
        <Button title="Chat" onPress={() => props.navigation.navigate("Chat") }/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ChatListScreen;
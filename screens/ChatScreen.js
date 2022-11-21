import react from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const ChatScreen = props => {

    return <View style={styles.container}>
        <Text>Conversas</Text>
        <Button title="Configurações" onPress={() => props.navigation.navigate("ChatSettings") }/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ChatScreen;
import react, { useCallback, useState } from "react";
import { Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from '@expo/vector-icons'; 

import fundo from "../assets/images/fundo.jpg"
import colors from "../consts/colors";
const ChatScreen = props => {

    const [message, setMessage] = useState("");

    const sendMessage = useCallback(() => {
        setMessage("");
    }, [message])
    return (
    <SafeAreaView 
        edges={['right', 'left', 'bottom']}
        style={styles.container}>
        <ImageBackground source={fundo} style={styles.fundo}>
        </ImageBackground>

        <View style={styles.inputView}>
            <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
                <AntDesign name="pluscircleo" size={25} color={colors.midBlue} />
            </TouchableOpacity>

            <TextInput style={styles.textBox} value={message} onChangeText={text => setMessage(text)} onSubmitEditing={sendMessage}/>

            {message === "" && <TouchableOpacity  style={styles.mediaButton} onPress={() => {}}>
                <Feather name="camera" size={25} color={colors.midBlue} />
            </TouchableOpacity>}

            {message !== "" && <TouchableOpacity  style={{...styles.mediaButton, ...styles.sendButton }} onPress={sendMessage}>
                <Feather name="send" size={20} color={colors.steelBlue} />
            </TouchableOpacity>}
        </View>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    }, 
    fundo: {
        flex: 1
    }, 
    inputView: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 10,
        height: 50
    },
    textBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: colors.steelBlue,
        marginHorizontal: 10,
        paddingHorizontal: 10
    },
    mediaButton:{
        alignItems: "center",
        justifyContent: "center",
        width: 30,
    },
    sendButton:{
        backgroundColor: colors.midBlue,
        borderRadius: 60,
        padding: 5
    }
})

export default ChatScreen;
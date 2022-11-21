import react, { useState } from "react";
import { Button, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import logo from '../assets/images/logo.png'

const AuthScreen = props => {

    const [isSignUp, setIsSignUp] = useState(false)

    return <SafeAreaView style={{ flex: 1 }}>
        <PageContainer>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={logo} resizeMethod='resize'/>
                </View>

                {
                    isSignUp ?
                    <SignUpForm/> :
                    <SignInForm/>
                }

                <TouchableOpacity onPress={() => {setIsSignUp(prevState => !prevState)}}
                    style={styles.link}>
                    <Text style={styles.linkText}> {`Realizar ${isSignUp ? "Login" : "Cadastro"}`}</Text>
                </TouchableOpacity>
        </PageContainer>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    link: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
    },
    linkText: {
        color: 'green',
        fontFamily: 'black',
        letterSpacing: 0.4
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '50%',
        height: '40%'
    }
})

export default AuthScreen;
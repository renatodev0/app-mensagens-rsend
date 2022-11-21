import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../consts/colors";

const SubmitButton = props => {

    const enabledBgColor = props.color || colors.midBlue;
    const disabledBgColor = colors.grey;
    const bgColor = props.disabled ? disabledBgColor : enabledBgColor

    return <TouchableOpacity 
        onPress={props.disabled ? () => {} : props.onPress} 
        style={{...props.style, ...styles.button, backgroundColor: bgColor}}>
        <Text style={{color: props.disabled ? colors.steelBlue : 'white'}}>{ props.title }</Text>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SubmitButton;

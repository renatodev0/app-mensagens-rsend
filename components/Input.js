import { StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../consts/colors'

const Input = (props) => {
  const onChangeText = (text) => {
    props.onInputChanged(props.id, text)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.input}>
        {props.icon && (
          <props.iconPack
            name={props.icon}
            size={props.iconSize || 15}
            color="black"
            style={styles.icon}
          />
        )}
        <TextInput
          {...props}
          style={styles.inputText}
          onChangeText={onChangeText}
        />
      </View>

      {props.errorText && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{props.errorText[0]}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginVertical: 10,
    fontFamily: 'black',
    letterSpacing: 0.4,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.whiteSmoke,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 4,
    color: colors.midBlue,
  },
  inputText: {
    color: colors.greyDark,
    flex: 1,
    fontFamily: 'regular',
    letterSpacing: 0.3,
    paddingTop: 0,
  },
  error: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontFamily: 'regular',
    letterSpacing: 0.3,
  },
})

export default Input

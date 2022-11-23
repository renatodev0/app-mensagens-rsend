import { StyleSheet, Text, View } from 'react-native'
import colors from '../consts/colors'

export default PageTitle = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  text: {
    fontSize: 28,
    color: colors.textColor,
    fontFamily: 'black',
    letterSpacing: 0.3,
  },
})

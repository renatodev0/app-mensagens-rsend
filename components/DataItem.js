import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import colors from '../consts/colors'
import ProfileImage from './ProfileImage'

const DataItem = (props) => {
  const { title, subTitle, image } = props

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <ProfileImage uri={image} size={40} />

        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>

          <Text numberOfLines={1} style={styles.subTitle}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 7,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    alignItems: 'center',
    minHeight: 50,
  },
  textContainer: {
    marginLeft: 14,
  },
  title: {
    fontFamily: 'regular',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: 'regular',
    color: colors.greyDark,
    letterSpacing: 0.3,
  },
})

export default DataItem

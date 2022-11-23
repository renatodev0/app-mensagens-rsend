import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import colors from '../consts/colors'

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={props.color ?? colors.midBlue}
    />
  )
}

export default CustomHeaderButton

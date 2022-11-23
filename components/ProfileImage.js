import React, { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import userImage from '../assets/images/userImage.jpeg'
import colors from '../consts/colors'
import { launchImagePicker, uploadImageAsync } from '../utils/imagePickerHelper'
import { updateSignedInUserData } from '../utils/actions/authActions'
import { useDispatch } from 'react-redux'
import { updateLoggedInUserData } from '../store/authSlice'

const ProfileImage = (props) => {
  const dispatch = useDispatch()

  const source = props.uri ? { uri: props.uri } : userImage

  const [image, setImage] = useState(source)
  const [isLoading, setIsLoading] = useState(false)

  const showEditButton = props.showEditButton && props.showEditButton === true

  const userID = props.userID

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker()

      if (!tempUri) return

      // Upload the image
      setIsLoading(true)
      const uploadUrl = await uploadImageAsync(tempUri)
      setIsLoading(false)

      if (!uploadUrl) {
        throw new Error('Could not upload image')
      }

      const newData = { profilePicture: uploadUrl }

      await updateSignedInUserData(userID, newData)
      dispatch(updateLoggedInUserData({ newData }))

      setImage({ uri: uploadUrl })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const Container = showEditButton ? TouchableOpacity : View

  return (
    <TouchableOpacity onPress={showEditButton ? pickImage : () => {}}>
      {isLoading ? (
        <View
          height={props.size}
          width={props.size}
          style={styles.loadingContainer}
        >
          <ActivityIndicator size={'small'} color={colors.primary} />
        </View>
      ) : (
        <Image
          style={{
            ...styles.image,
            ...{ width: props.size, height: props.size },
          }}
          source={image}
        />
      )}

      {showEditButton && !isLoading && (
        <View style={styles.editIconContainer}>
          <FontAwesome name="pencil" size={15} color="black" />
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    padding: 8,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProfileImage

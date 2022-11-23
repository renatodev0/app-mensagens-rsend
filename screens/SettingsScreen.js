import { Feather, FontAwesome } from '@expo/vector-icons'
import React, { useCallback, useReducer, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../components/Input'
import PageContainer from '../components/PageContainer'
import PageTitle from '../components/PageTitle'
import ProfileImage from '../components/ProfileImage'
import SubmitButton from '../components/SubmitButton'
import colors from '../consts/colors'
import { updateLoggedInUserData } from '../store/authSlice'
import {
  updateSignedInUserData,
  userLogout,
} from '../utils/actions/authActions'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducer'

const SettingsScreen = (props) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const userData = useSelector((state) => state.auth.userData)

  const nome = userData.nome || ''
  const sobrenome = userData.sobrenome || ''
  const email = userData.email || ''
  const sobre = userData.sobre || ''

  const initialState = {
    inputValues: {
      nome,
      sobrenome,
      email,
      sobre,
    },
    inputValidities: {
      nome: undefined,
      sobrenome: undefined,
      email: undefined,
      sobre: undefined,
    },
    formIsValid: false,
  }

  const [formState, dispatchFormState] = useReducer(reducer, initialState)

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })
    },
    [dispatchFormState],
  )

  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues

    try {
      setIsLoading(true)
      await updateSignedInUserData(userData.userID, updatedValues)
      dispatch(updateLoggedInUserData({ newData: updatedValues }))

      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [formState, dispatch])

  const hasChanges = () => {
    const currentValues = formState.inputValues

    return (
      currentValues.nome != nome ||
      currentValues.sobrenome != sobrenome ||
      currentValues.email != email ||
      currentValues.sobre != sobre
    )
  }

  return (
    <PageContainer>
      <PageTitle text="Configurações" />

      <ScrollView contentContainerStyle={styles.formContainer}>
        <ProfileImage
          size={80}
          userID={userData.userID}
          uri={userData.profilePicture}
          showEditButton={true}
        />

        <Input
          id="nome"
          label="Nome"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities['nome']}
          initialValue={userData.nome}
        />

        <Input
          id="sobrenome"
          label="Sobrenome"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities['sobrenome']}
          initialValue={userData.sobrenome}
        />

        <Input
          id="email"
          label="Email"
          icon="mail"
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          keyboardType="email-address"
          autoCapitalize="none"
          errorText={formState.inputValidities['email']}
          initialValue={userData.email}
        />

        <Input
          id="sobre"
          label="Sobre"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities['sobre']}
          initialValue={userData.sobre}
        />

        <View style={{ marginTop: 20 }}>
          {showSuccessMessage && <Text>Salvo!</Text>}

          {isLoading ? (
            <ActivityIndicator
              size={'small'}
              color={colors.midBlue}
              style={{ marginTop: 10 }}
            />
          ) : (
            hasChanges() && (
              <SubmitButton
                title="Salvar"
                onPress={saveHandler}
                style={{ marginTop: 20 }}
                disabled={!formState.formIsValid}
              />
            )
          )}
        </View>

        <SubmitButton
          title="Sair"
          onPress={() => dispatch(userLogout())}
          style={{ marginTop: 20 }}
          color={colors.red}
        />
      </ScrollView>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SettingsScreen

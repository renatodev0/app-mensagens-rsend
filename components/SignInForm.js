import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducer'
import { signIn } from '../utils/actions/authActions'
import { useDispatch } from 'react-redux'
import { ActivityIndicator, Alert } from 'react-native'
import colors from '../consts/colors'

const initialState = {
  inputValues: {
    email: '',
    senha: '',
  },
  inputValidities: {
    email: false,
    senha: false,
  },
  formIsValid: false,
}

const SignInForm = (props) => {
  const dispatch = useDispatch()

  const [error, setError] = useState()
  const [isLoading, setLoading] = useState(false)
  const [formState, dispatchFormState] = useReducer(reducer, initialState)

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })
    },
    [dispatchFormState],
  )

  useEffect(() => {
    if (error) {
      Alert.alert('Erro', error)
    }
  }, [error])

  const authHandler = useCallback(async () => {
    try {
      setLoading(true)
      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.senha,
      )
      setError(null)
      await dispatch(action)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }, [dispatch, formState])

  return (
    <>
      <Input
        autoCapitalize="none"
        keyboardType="email-address"
        id="email"
        label="Email"
        icon="mail-outline"
        iconPack={Ionicons}
        onInputChanged={inputChangedHandler}
        iconSize={23}
        errorText={formState.inputValidities['email']}
      />
      <Input
        autoCapitalize="none"
        secureTextEntry
        id="senha"
        label="Senha"
        icon="lock"
        iconPack={EvilIcons}
        iconSize={35}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities['senha']}
      />

      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.midBlue} />
      ) : (
        <SubmitButton
          style={{ marginTop: 30 }}
          title="Entrar"
          onPress={authHandler}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  )
}

export default SignInForm

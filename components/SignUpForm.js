import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { validate } from 'validate.js'
import {
  validateEmail,
  validatePassword,
  validateString,
} from '../utils/validationConstrants'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducer'
import { signUp } from '../utils/actions/authActions'
import { getFirebaseApp } from '../utils/firebaseHelper'
import { ActivityIndicator, Alert } from 'react-native'
import colors from '../consts/colors'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  inputValues: {
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
  },
  inputValidities: {
    nome: false,
    sobrenome: false,
    email: false,
    senha: false,
  },
  formIsValid: false,
}

const SignUpForm = (props) => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData)

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
      const action = signUp(
        formState.inputValues.nome,
        formState.inputValues.sobrenome,
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
        id="nome"
        label="Nome"
        icon="user"
        iconPack={EvilIcons}
        onInputChanged={inputChangedHandler}
        iconSize={30}
        errorText={formState.inputValidities['nome']}
      />
      <Input
        id="sobrenome"
        label="Sobrenome"
        icon="user"
        iconPack={EvilIcons}
        onInputChanged={inputChangedHandler}
        iconSize={30}
        errorText={formState.inputValidities['sobrenome']}
      />
      <Input
        id="email"
        autoCapitalize="none"
        keyboardType="email-address"
        label="Email"
        icon="mail-outline"
        iconPack={Ionicons}
        onInputChanged={inputChangedHandler}
        iconSize={23}
        errorText={formState.inputValidities['email']}
      />
      <Input
        id="senha"
        autoCapitalize="none"
        secureTextEntry
        label="Senha"
        icon="lock"
        iconPack={EvilIcons}
        onInputChanged={inputChangedHandler}
        iconSize={35}
        errorText={formState.inputValidities['senha']}
      />

      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.midBlue} />
      ) : (
        <SubmitButton
          style={{ marginTop: 30 }}
          title="Cadastrar"
          onPress={authHandler}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  )
}

export default SignUpForm

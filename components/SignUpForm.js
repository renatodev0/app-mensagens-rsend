import React, { useCallback, useReducer } from 'react'
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

const initialState = {
  inputValidities: {
    nome: false,
    sobrenome: false,
    email: false,
    senha: false,
  },
  formIsValid: false,
}

const SignUpForm = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState)

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result })
    },
    [dispatchFormState],
  )

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

      <SubmitButton
        style={{ marginTop: 30 }}
        title="Cadastrar"
        onPress={() => console.log('sdsdsd')}
        disabled={!formState.formIsValid}
      />
    </>
  )
}

export default SignUpForm

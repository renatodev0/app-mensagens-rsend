import React, { useCallback, useReducer } from 'react'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducer'

const initialState = {
  inputValidities: {
    email: false,
    senha: false,
  },
  formIsValid: false,
}

const SignInForm = (props) => {
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

      <SubmitButton
        style={{ marginTop: 30 }}
        title="Entrar"
        onPress={() => console.log('sdsdsd')}
        disabled={!formState.formIsValid}
      />
    </>
  )
}

export default SignInForm

import {
  validateEmail,
  validateLength,
  validatePassword,
  validateString,
} from '../validationConstrants'

export const validateInput = (inputId, inputValue) => {
  if (inputId === 'nome' || inputId === 'sobrenome') {
    return validateString(inputId, inputValue)
  } else if (inputId === 'email') {
    return validateEmail(inputId, inputValue)
  } else if (inputId === 'senha') {
    return validatePassword(inputId, inputValue)
  } else if (inputId === 'sobre') {
    return validateLength(inputId, inputValue, 0, 150, true)
  }
}

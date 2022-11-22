export const reducer = (state, action) => {
  const { validationResult, inputId, inputValue } = action

  const updateValues = {
    ...state.inputValues,
    [inputId]: inputValue,
  }

  const updateValidities = {
    ...state.inputValidities,
    [inputId]: validationResult,
  }

  let updatedFormsValid = true

  for (const key in updateValidities) {
    if (updateValidities[key] !== undefined) {
      updatedFormsValid = false
      break
    }
  }

  return {
    inputValues: updateValues,
    inputValidities: updateValidities,
    formIsValid: updatedFormsValid,
  }
}

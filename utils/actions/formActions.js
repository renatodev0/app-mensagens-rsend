import { validateEmail, validatePassword, validateString } from "../validationConstrants";

export const validateInput = (inputId, inputValue) => {
    if(inputId === "nome" || inputId === "sobrenome") {
        return validateString(inputId, inputValue)
    } else if (inputId === "email") {
        return validateEmail(inputId, inputValue)
    } else if (inputId === "senha") {
        return validatePassword(inputId, inputValue)
    }
}
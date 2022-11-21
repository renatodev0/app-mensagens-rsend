import validate from "validate.js"

export const validateString = (id, value) => {
    const constraints = { 
        presence: { allowEmpty: false, message: "não pode ser vazio."}
    }

    if(value !== "") {
        constraints.format = {
            pattern: "[a-z]+",
            flags: "i",
            message: "só pode conter letras."
        }
    }

    const validateResult = validate({ [id]: value}, {[id]: constraints});
    return validateResult && validateResult[id];
}

export const validateEmail = (id, value) => {
    const constraints = { 
        presence: { allowEmpty: false, message: "não pode ser vazio."}
    }

    if(value !== "") {
        constraints.email = {
            message: "não é um válido."
        };
    }

    const validateResult = validate({ [id]: value}, {[id]: constraints});
    return validateResult && validateResult[id];
}

export const validatePassword = (id, value) => {
    const constraints = { 
        presence: { allowEmpty: false, message: "não pode ser vazio."}
    }

    if(value !== "") {
        constraints.length = {
            minimum: 6,
            message: "precisa ter pelo menos 6 caracteres"
        };
    }

    const validateResult = validate({ [id]: value}, {[id]: constraints});
    return validateResult && validateResult[id];
}
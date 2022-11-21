export const reducer = (state, action) => {
    const { validationResult, inputId } = action

    const updateValidities = {
        ...state.inputValidities,
        [inputId]: validationResult
    };

    let updatedFormsValid = true;

    for(const key in updateValidities) {
        if(updateValidities[key] !== undefined) {
            updatedFormsValid = false;
            break;
        }
    }

    return {
        inputValidities: updateValidities,
        formIsValid: updatedFormsValid
    };
}
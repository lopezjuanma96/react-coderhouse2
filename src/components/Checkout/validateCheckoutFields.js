
export const validateCheckoutFields = (values, setInvalidFields) => {
    
    const invalidFields = {};

    for (const prop in values) {
        if (values[prop].length === 0){
            invalidFields[prop] = "El campo se encuentra vacío";
        }
    }

    let phoneRegex = RegExp('[^0-9]');
    if(phoneRegex.exec(values.phone)){
        invalidFields.phone = "El número de teléfono contiene caractéres no numéricos";
    }

    let emailRegex = /\w+@\w+\.\w+/;
    let emailValid = false;
    if (emailRegex.exec(values.email)) emailValid = true;
    else invalidFields.email = "Formato de correo incorrecto";

    if (emailRegex.exec(values.email_val)) emailValid = true;
    else invalidFields.email_val = "Formato de correo incorrecto";

    if (emailValid && values.email !== values.email_val) {
        invalidFields.email_val = "Las direcciones no coinciden";
    }

    setInvalidFields(invalidFields);

    return invalidFields;
}
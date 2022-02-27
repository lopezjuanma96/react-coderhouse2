
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

    setInvalidFields(invalidFields);

    return invalidFields;
}
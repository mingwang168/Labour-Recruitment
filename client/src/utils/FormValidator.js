const FormValidator = (type, input) => {
    let valid = false;
    switch(type) {
        case "email":
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            valid = emailRegex.test(String(input).toLowerCase());
            break;
        case "phone":
            let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            valid = phoneRegex.test(String(input));
            break;
        case "password":
            let pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            valid = pwRegex.test(String(input));
            break;
        default:
            break;
    }
    return valid;
}

export default FormValidator;
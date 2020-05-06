import * as Auth from './Auth';

exports.getCheckboxClass = (completed, clientId) => {
    
    let classname = "";
    if (Auth.getID() == clientId) {
        if (completed) {
            classname = "formsCheckboxChecked"
        } else {
            classname = "formsCheckboxDefault"
        }
    } else {
        if (completed) {
            classname = "formsCheckboxCheckedDisabled"
        } else {
            classname = "formsCheckboxDefaultDisabled"
        }
    }
    return classname;
}
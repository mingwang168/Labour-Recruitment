exports.authenticateUser = _ => {
    let authenticated =
    sessionStorage.getItem("auth_token") &&
    sessionStorage.getItem("user_role") &&
    (
        sessionStorage.getItem("user_role") === "Admin" ||
        sessionStorage.getItem("user_role") === "Client" ||
        sessionStorage.getItem("user_role") === "Labourer"
    ) &&
    sessionStorage.getItem("user_name") &&
    sessionStorage.getItem("user_id") ? true : false;

    if(!authenticated) {
        this.forceLogout();
    }

    return authenticated;
}

exports.getRole = _ => {
    return sessionStorage.getItem("user_role");
}

exports.authenticateClient = _ => {
    return sessionStorage.getItem("user_role") === "Client" ? true : false;
}

exports.authenticateLabourer = _ => {
    return sessionStorage.getItem("user_role") === "Labourer" ? true : false;
}

exports.authenticateAdmin = _ => {
    return sessionStorage.getItem("user_role") === "Admin" ? true : false;
}

exports.forceLogout = _ => {
    sessionStorage.clear();
    window.location.reload();
    alert("Something went wrong. Please sign in again.");
}
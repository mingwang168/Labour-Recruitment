exports.authenticateUser = _ => {
    let authenticated =
    sessionStorage.getItem("auth_token") &&
    sessionStorage.getItem("auth_token") !== "" &&
    sessionStorage.getItem("user_role") &&
    (
        sessionStorage.getItem("user_role") === "Admin" ||
        sessionStorage.getItem("user_role") === "Client" ||
        sessionStorage.getItem("user_role") === "Labourer"
    ) &&
    sessionStorage.getItem("user_name") &&
    sessionStorage.getItem("user_id") ? true : false;
    if(!authenticated) {
        sessionStorage.clear();
    }
    return authenticated;
}

exports.getToken = _ => {
    return sessionStorage.getItem("auth_token");
}

exports.getID = _ => {
    return sessionStorage.getItem("user_id");
}

exports.getRole = _ => {
    return sessionStorage.getItem("user_role");
}

exports.getName = _ => {
    return sessionStorage.getItem("user_name");
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
    window.location.replace("/");
    alert("Something went wrong. Please sign in again.");
}
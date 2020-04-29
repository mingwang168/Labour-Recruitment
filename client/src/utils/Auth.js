const AUTH_TOKEN = "auth_token";
const USER_NAME = "user_name";
const USER_ID = "user_id";
const USER_ROLE = "user_role";
const TOKEN_EXP = "token_exp";

exports.setSessionData = (data, history) => {
    sessionStorage.setItem(AUTH_TOKEN, data.token);
    sessionStorage.setItem(TOKEN_EXP, this.setTokenExpiration());
    sessionStorage.setItem(USER_ROLE, data.role);
    sessionStorage.setItem(USER_ID, data.id);
    if(data.role === "Admin") {
        sessionStorage.setItem(USER_NAME, "Admin");
    } else {
        sessionStorage.setItem(USER_NAME, data.name);
    }
    history.push("/dashboard");
}

exports.authenticateUser = _ => {
    let authenticated =
    sessionStorage.getItem(AUTH_TOKEN) &&
    sessionStorage.getItem(AUTH_TOKEN) !== "" &&
    sessionStorage.getItem(USER_ROLE) &&
    (
        sessionStorage.getItem(USER_ROLE) === "Admin" ||
        sessionStorage.getItem(USER_ROLE) === "Client" ||
        sessionStorage.getItem(USER_ROLE) === "Labourer"
    ) &&
    sessionStorage.getItem(USER_NAME) &&
    sessionStorage.getItem(USER_ID) ? true : false;
    if(!authenticated) {
        sessionStorage.clear();
    }
    return authenticated;
}

exports.validateToken = _ => {
    return Date.now() > this.getTokenExpirationTime() ? false : true;
}

exports.setTokenExpiration = _ => {
    const HOUR = 1000 * 60 * 60;
    return Date.now() + (HOUR * 2);
}

exports.getTokenExpirationTime = _ => {
    return sessionStorage.getItem(TOKEN_EXP);
}

exports.authenticateClient = _ => {
    return sessionStorage.getItem(USER_ROLE) === "Client" ? true : false;
}

exports.authenticateLabourer = _ => {
    return sessionStorage.getItem(USER_ROLE) === "Labourer" ? true : false;
}

exports.authenticateAdmin = _ => {
    return sessionStorage.getItem(USER_ROLE) === "Admin" ? true : false;
}

exports.getToken = _ => {
    return sessionStorage.getItem(AUTH_TOKEN);
}

exports.getID = _ => {
    return sessionStorage.getItem(USER_ID);
}

exports.getRole = _ => {
    return sessionStorage.getItem(USER_ROLE);
}

exports.getName = _ => {
    return sessionStorage.getItem(USER_NAME);
}

exports.logout = _ => {
    sessionStorage.clear();
}

exports.forceLogout = _ => {
    sessionStorage.clear();
    window.location.replace("/");
    alert("Something went wrong. Please sign in again.");
}
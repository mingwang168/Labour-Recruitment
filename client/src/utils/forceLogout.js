const forceLogout = _ => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('user_id');
    window.location.reload(true);
    alert("Something went wrong. Please sign in again.");
}

export default forceLogout;
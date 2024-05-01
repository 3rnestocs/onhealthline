export function getJWT() {
    return localStorage.getItem("user_token")
}

export function setJWT(value) {
    return localStorage.setItem("user_token", value)
}

export function removeJWT() {
    return localStorage.removeItem("user_token")
}
import { apiHttp } from "../axiosAPI";

export const loginAPI = (loginValues) => apiHttp("POST", `/auth/login/`, loginValues)

// export const whoAmIAPI = () => apiHttp("GET", `/v1/client/user/whoami`)

export const registerAPI = (registerValues) => apiHttp("POST", `/auth/register/`, registerValues)
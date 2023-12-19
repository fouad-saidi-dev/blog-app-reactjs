import http from "./http";

const login = (email,password) => {
    const reqData = {
        email,
        password
    }
    return http.post('/users/login',reqData);
}

const authService = {
    login
}

export default authService;
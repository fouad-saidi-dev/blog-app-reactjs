import http from "../http-common"

   
    const getUsers = () => {
      return http.get(`/users`)
    }

    const login = () => {
        return http.post(`/users/login`)
    }

    const register = (firstName,lastName,email,phone,encryptedPassword) => {
        const reqData = {
            firstName,
            lastName,
            phone,
            email,
            encryptedPassword,
        }
        return http.post(`/users/add-user`,reqData)
    }

    const userService = {
        getUsers,
        login,
        register
    }

    export default userService;
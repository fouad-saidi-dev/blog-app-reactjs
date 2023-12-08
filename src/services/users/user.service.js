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

    const updateUser = (id,firstName,lastName,phone) => {
        const reqData = {
            firstName,
            lastName,
            phone
        }
        return http.post(`/users/${id}`,reqData)
    }

    const deleteUser = (id) => {
        return http.delete(`/users/${id}`)
    }

    const userService = {
        getUsers,
        login,
        register,
        updateUser,
        deleteUser
    }

    export default userService;
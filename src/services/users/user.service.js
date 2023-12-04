import http from "../http-common"

   
    const getUsers = (id) => {
      return http.get(`/users/${id}`)
    }

    const login = () => {
        return http.post(`/users/login`)
    }

    const userService = {
        getUsers,
        login
    }

    export default userService;
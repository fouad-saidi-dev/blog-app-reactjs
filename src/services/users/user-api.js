import userService from "./user.service"

const updateUser = (ev,id,firstName,lastName,phone) => {
 
    ev.preventDefault();
    
    userService.updateUser(id,firstName,lastName,phone)
    .then((res) => {
        console.log(res)
    })
    .catch((er) => {
        console.log(er)
    })
}

const deleteUser = (id) => {

    userService.deleteUser(id)
    .then((res) => {
        console.log(res)
    }).catch((er) => {
        console.log(er)
    })

}

const userApi = {
    updateUser,
    deleteUser
}

export default userApi;
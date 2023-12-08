import userService from "./user.service"

const updateUser = (ev,id,) => {
 
    ev.preventDefault();
    
    userService.updateUser().then().catch()
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
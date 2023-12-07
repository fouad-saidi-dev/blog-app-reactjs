import userService from "./user.service"


const deleteUser = (id) => {

    userService.deleteUser(id)
    .then((res) => {
        console.log(res)
    }).catch((er) => {
        console.log(er)
    })

}

const userApi = {
    deleteUser
}

export default userApi;
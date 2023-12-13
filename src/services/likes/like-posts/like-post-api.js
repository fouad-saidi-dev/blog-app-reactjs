import likePosteService from "./like-posts.service"


const addLike = (e,isLike,postId) => {
    e.preventDefault();
    
    likePosteService.addLikePost(isLike,postId)
    .then((res) => {
        console.log("response",res)
    })
    .catch((err) => {
        console.log("error",err)
    })
}

const updateLike = (e,like,likeId,postId) => {
    e.preventDefault();
    
    likePosteService.editLikePost(like,likeId,postId)
    .then((res) => {
        console.log("response",res)
    })
    .catch((err) => {
        console.log("error",err)
    })
}

const likePostApi = {
    addLike
}

export default likePostApi;
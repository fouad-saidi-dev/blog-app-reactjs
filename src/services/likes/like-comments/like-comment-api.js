import likeCommentService from "./like-comment.service"


const addLikeToComment = (e,isLike,commentId) => {
    
    e.preventDefault();
    
    likeCommentService.addLikeComment(e,isLike,commentId)
    .then((res) => {
        console.log("response",res)
    })
    .catch((err) => {
        console.log("error",err)
    })
}

const likeCommentApi = {
    addLikeToComment
}

export default likeCommentApi;
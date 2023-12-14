import httpCommon from "../../http-common"


const addLikeComment = (isLike,commentId) => {
    
    const reqData = {
        isLike
    }
    
    return httpCommon.post(`/likes/add-like-comment/${commentId}`,reqData)
}

const likecomments = (commentId) => {
    return httpCommon.get(`likes/count/like-comment/${commentId}`)
}

const likeCommentService = {
    addLikeComment,
    likecomments
}

export default likeCommentService;
import httpCommon from "../../http-common"


const getLikesPost = (postId) => {
    return httpCommon.get(`/likes/count/like/${postId}`);
}

const likePosteService = {
    getLikesPost
}

export default likePosteService;
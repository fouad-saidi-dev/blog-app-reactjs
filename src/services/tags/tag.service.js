import http from "../http-common"

const getTagsByPostId = (postId) => {
    return http.get(`/tags/${postId}`)
}

const tagService = {
    getTagsByPostId
}

export default tagService;
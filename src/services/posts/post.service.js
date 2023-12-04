import httpCommon from "../http-common"


const getPosts = () => {
    return httpCommon.get(`/posts`)
}

const postService = {
    getPosts
}

export default postService;
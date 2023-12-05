import httpCommon from "../http-common"


const getPosts = () => {
    return httpCommon.get('/posts')
}

const addPost = (title,body) => {

    const reqData = {
        title,
        body
    } 

    return httpCommon.post('/posts/create',reqData)
}

const postService = {
    getPosts,
    addPost
}

export default postService;
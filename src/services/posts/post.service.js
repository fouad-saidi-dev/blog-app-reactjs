import httpCommon from "../http-common"



const getPosts = () => {
    return httpCommon.get('/posts')
}

const addPost = (title,description,body) => {

    const reqData = {
        title,
        description,
        body
    } 

    return httpCommon.post('/posts/create',reqData)
}

const postService = {
    getPosts,
    addPost
}

export default postService;
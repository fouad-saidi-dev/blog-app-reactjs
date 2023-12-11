import http from "../http-common"


const addComt = (comment,postId) => {

    const reqData = {
        comment,
        postId
    }
   return http.post('/comments/add',reqData)
}

const getComments = (id) => {
   return http.get(`/comments/posts/${id}`)
}

const commentService = {
    addComt,
    getComments
}

export default commentService;

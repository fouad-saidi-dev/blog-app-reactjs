import http from "../http-common"


const addComt = () => {

}

const getComments = (id) => {
   return http.get(`http://localhost:8081/comments/posts/${id}`)
}

const commentService = {
    getComments
}

export default commentService;

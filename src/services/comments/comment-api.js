import commentService from "./comment.service"


const addComment = (event,comment,postId) => {
    
    event.preventDefault();
    
    commentService.addComt(comment,postId)
    .then((res) => {
        console.log(res)
    })
    .catch((er) => {
        console.log(er)
    })
}

const commentApi = {
    addComment
}

export default commentApi;
import ShowPost from "../../pages/posts/show-post/show-post";
import commentService from "./comment.service"


const addComment = (event,comment,postId,getComments) => {
    
    event.preventDefault();
    
    commentService.addComt(comment,postId)
    .then((res) => {
        console.log(res)
        getComments()
    })
    .catch((er) => {
        console.log(er)
    })
}

const commentApi = {
    addComment
}

export default commentApi;
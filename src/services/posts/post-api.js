import postService from "./post.service"


const addPost = (ev,title,body) => {

    ev.preventDefault();

    postService.addPost(title,body)
    .then((res) => {
        console.log(res)
    })
    .catch((er) => {
        console.log(er)
    })
}

const postApi = {
   addPost
}

export default postApi;
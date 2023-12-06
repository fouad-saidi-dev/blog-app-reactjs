import postService from "./post.service"


const addPost = (ev,title,description,body) => {

    ev.preventDefault();

    postService.addPost(title,description,body)
    .then((res) => {
        console.log(res)
    })
    .catch((er) => {
        console.log(er)
    })
}

const editPost = () => {

}

const postApi = {
   addPost,
   editPost
}

export default postApi;
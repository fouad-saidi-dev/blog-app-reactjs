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

const editPost = (e,id,title,description,body) => {
     
    e.preventDefault()

    postService.editPost(id,title,description,body)
    .then((res) => {
        console.log(res)
    })
    .catch((er) => {
        console.log(er)
    })

}


const showPost = (id) => {
    postService.showPost(id)
    .then((res) => {
        console.log(res)
    })
    .catch((er) => {
        console.log(er)
    })
}

const getPosts = () => {
    postService.getPosts()
    .then((res) => {
        console.log(res)
    })
    .catch((er) => {
        console.log(er)
    })
}

const deletePost = (id) => {
    postService.deletePost(id)
    .then((res) => {
        console.log(res)
    })
    .catch((er) => {
        console.log(er)
    })
}

const postApi = {
   addPost,
   editPost,
   showPost,
   getPosts,
   deletePost
}

export default postApi;
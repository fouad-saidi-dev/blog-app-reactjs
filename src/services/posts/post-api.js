import postService from "./post.service";

const addPost = (ev, title, description, body) => {
  ev.preventDefault();

  postService
    .addPost(title, description, body)
    .then((res) => {
      console.log(res);
    })
    .catch((er) => {
      console.log(er);
    });
};

const editPost = (e, id, title, description, body) => {
  e.preventDefault();

  postService
    .editPost(id, title, description, body)
    .then((res) => {
      console.log(res);
    })
    .catch((er) => {
      console.log(er);
    });
};

const showPost = (id,setTitle,setDes,setBody) => {
  postService
    .showPost(id)
    .then((res) => {
      console.log(res);
      const {title , description , body} = res.data;
      setTitle(title);
      setDes(description);
      setBody(body);
    })
    .catch((er) => {
      console.log(er);
    });
};

const getPosts = (setPosts) => {
  postService
    .getPosts()
    .then((res) => {
      console.log(res);
      setPosts(res.data);
    })
    .catch((er) => {
      console.log(er);
    });
};

const deletePost = (id,getPosts) => {
  postService
    .deletePost(id)
    .then((res) => {
      console.log(res);
      getPosts()
    })
    .catch((er) => {
      console.log(er);
    });
};

const getPostsUser = (id, setPostUser) => {
  postService
    .getPostsByUser(id)
    .then((res) => {
      console.log(res);
      setPostUser(res.data);
    })
    .catch((er) => {
      console.log(er);
    });
};

const postApi = {
  addPost,
  editPost,
  showPost,
  getPosts,
  deletePost,
  getPostsUser,
};

export default postApi;

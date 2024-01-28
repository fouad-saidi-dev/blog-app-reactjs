import postService from "./post.service";

const addPost = (ev, title, description, body, tags) => {
  ev.preventDefault();

  postService
    .addPost(title, description, body, tags)
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

const showPost = (id, setTitle, setDes, setBody) => {
  postService
    .showPost(id)
    .then((res) => {
      console.log(res);
      const { title, description, body } = res.data;
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

const deletePost = (id, getPosts, setOpenAlert) => {
  postService
    .deletePost(id)
    .then((res) => {
      console.log(res);
      getPosts();
      setOpenAlert(true);
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

const getPostsByTagName_ = async (tagName, setPosts) => {
  try {
    const response = await postService.getPostsByTagName(tagName);
    setPosts(response.data);
    console.log("Posts", response.data);
  } catch (error) {
    console.log("Eroor", error);
  }
};

const postApi = {
  addPost,
  editPost,
  showPost,
  getPosts,
  deletePost,
  getPostsUser,
  getPostsByTagName_,
};

export default postApi;

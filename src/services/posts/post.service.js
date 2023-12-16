import httpCommon from "../http-common";

const getPosts = () => {
  return httpCommon.get("/posts");
};

const addPost = (title, description, body) => {
  const reqData = {
    title,
    description,
    body,
  };

  return httpCommon.post("/posts/create", reqData);
};

const editPost = (id, title, description, body) => {
  const reqData = {
    title,
    description,
    body,
  };

  return httpCommon.put(`/posts/edit/${id}`, reqData);
};

const showPost = (id) => {
  return httpCommon.get(`/posts/${id}`);
};

const deletePost = (id) => {
  return httpCommon.delete(`/posts/${id}`);
};

const getPostsByUser = (id) => {
  return httpCommon.get(`/posts/user/${id}`);
};

const postService = {
  getPosts,
  addPost,
  editPost,
  showPost,
  deletePost,
  getPostsByUser
};

export default postService;

import http from "../auth/http";
import httpCommon from "../http-common";

const getPosts = () => {
  return http.get("/posts");
};

const addPost = (title, description, body, tags) => {
  const reqData = {
    title,
    description,
    body,
    tags,
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

const getPostsByTagName = (tagName) => {
  return httpCommon.get(`/posts/tag/${tagName}`);
};

const postService = {
  getPosts,
  addPost,
  editPost,
  showPost,
  deletePost,
  getPostsByUser,
  getPostsByTagName,
};

export default postService;

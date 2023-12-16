import httpCommon from "../../http-common";

const getLikesPost = (postId) => {
  return httpCommon.get(`/likes/count/like/${postId}`);
};

const addLikePost = (isLike, postId) => {
  const reqData = {
    isLike,
  };

  return httpCommon.post(`/likes/add/${postId}`, reqData);
};

const editLikePost = (likeId, isLike, postId) => {
  const reqData = {
    isLike,
    postId,
  };

  return httpCommon.post(`/likes/${likeId}`, reqData);
};



const likePosteService = {
  getLikesPost,
  addLikePost,
  editLikePost
};

export default likePosteService;

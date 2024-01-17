import { useState, React } from "react";
import likeCommentApi from "../services/likes/like-comments/like-comment-api";
import { IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import ShowPost from "../pages/posts/show-post/show-post";

const LikeComment = (props) => {
  const [isLike, setLike] = useState(true);
  

  const like = async (e) => {
    e.preventDefault();

    const reqData = {
      isLike: isLike,
    };

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer `+localStorage.getItem("token"),
      },
    };

    await axios.post(`http://localhost:8081/likes/add-like-comment/${props.commentId}`,reqData,config)
          .then((res) => {
            console.log("response",res)
          }).catch((err) => {
            console.log("error",err)
          });

          setLike((prev) => !prev);
  };

  console.log(props.commentId);

  return (
    <IconButton
      type=""
      onClick={(e) => {
        like(e);
      }}
      
      color={isLike ? "primary" : "default"}
    >
      <ThumbUpIcon />
    </IconButton>
  );
};

export default LikeComment;

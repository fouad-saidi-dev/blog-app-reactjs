import { useState, React, useEffect } from "react";
import likeCommentService from "../services/likes/like-comments/like-comment.service";
import { Chip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LikeComment from "./LikeComment";

const CountLikes = (props) => {
  const [likecomments, setLikeComnt] = useState(null);

  const likeComment = () => {
    likeCommentService
      .likecomments(props.commentId)
      .then((res) => {
        console.log("likes : ", res);
        setLikeComnt(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    likeComment();
  }, []);

  return (
    <>
      <Chip
        color="info"
        icon={<ThumbUpIcon color="green" />}
        label={`${likecomments}`}
        sx={{
          width: "100px",
          float: "right",
          fontFamily: "fantasy",
          fontSize: "20px",
        }}
      />
    </>
  );
};

export default CountLikes;

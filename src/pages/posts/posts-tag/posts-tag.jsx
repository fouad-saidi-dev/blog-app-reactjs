import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import postApi from "../../../services/posts/post-api";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import PostsComponent from "../../../components/PostsComponent";

const PostsTag = () => {
  const [posts, setPosts] = useState([]);
  const { tagName } = useParams();

  const getPostsByTagName__ = () => {
    postApi.getPostsByTagName_(tagName, setPosts);
  };

  useEffect(() => {
    getPostsByTagName__();
  }, [tagName]);

  return (
    <>
    <PostsComponent posts={posts} />
    </>
  );
};

export default PostsTag;

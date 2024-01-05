import { React, useEffect, useState } from "react";
import postService from "../../../services/posts/post.service";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import postApi from "../../../services/posts/post-api";
import PostsComponent from "../../../components/PostsComponent";


export default function DisplayPosts(params) {
  const [posts, setPosts] = useState([]);

  const displayPosts = () => {
     postApi.getPosts(setPosts)
  };

  useEffect(() => {
    displayPosts();
  }, []);

  return(
    <>
    <PostsComponent posts={posts} />
    </>
  )
}

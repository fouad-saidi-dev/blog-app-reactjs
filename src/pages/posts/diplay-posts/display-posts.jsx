import { React, useEffect, useState } from "react";
import postService from "../../../services/posts/post.service";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export default function DisplayPosts(params) {
  const [posts, setPosts] = useState([]);

  const displayPosts = async () => {
    await postService
      .getPosts()
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    displayPosts();
  }, []);

  return(
    <>
    {posts.map((post) => (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    ))}</>
  )

  return (
    <table>
      <thead>
        <tr>title</tr>
        <tr>body</tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr>
            <td>{post.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

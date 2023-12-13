import { React, useEffect, useState } from "react";
import postService from "../../../services/posts/post.service";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";


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
    <Grid container sx={{mt:"3%"}} spacing={2} >
    {posts.map((post) => (
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://cdn2.thecatapi.com/images/3KG57GfMW.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Chip 
        label={new Date(post.createdAt).toLocaleString()}
        sx={{
          height : "15px",
          fontSize: "10px",
          float : "right",
          m: "2px"
        }} />
        <CardActions>
        
        <Link to={`/post/${post.postId}`} className='btn btn-success me-2'>
         Edit
        </Link>
          {/* <Button size="small" color="primary">
            Share
          </Button> */}
        </CardActions>
      </Card>
     </Grid>
    ))} </Grid></>
  )
}

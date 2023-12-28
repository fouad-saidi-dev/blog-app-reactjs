import { React, useEffect, useState } from "react";
import postService from "../../../services/posts/post.service";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import postApi from "../../../services/posts/post-api";


export default function DisplayPosts(params) {
  const [posts, setPosts] = useState([]);

  const displayPosts = () => {
     postApi.getPosts(setPosts)
  };

  useEffect(() => {
    displayPosts();
  }, []);

  return(
    <Box sx={{ flexGrow: 2 }}>
    <Grid container minHeight={400} mt={"2%"} mb={"2%"} spacing={2} >
    {posts.map((post) => (
      <Grid item xs={12} sm={6} md={4} justifyContent="center" display="flex">
        <Card sx={{ maxWidth: 345 , width:"400px"}}>
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
        
        <Link to={`/post/${post.postId}`} style={{textDecoration:"none"}} className='btn btn-success me-2'>
         show more
        </Link>
          {/* <Button size="small" color="primary">
            Share
          </Button> */}
        </CardActions>
      </Card>
     </Grid>
    ))} </Grid></Box>
  )
}

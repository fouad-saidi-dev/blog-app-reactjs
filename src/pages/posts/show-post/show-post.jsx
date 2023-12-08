import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Stack,
  ListItem,
  List,
  ListItemText,
  Divider,
  TextField,
} from "@mui/material";
import postService from "../../../services/posts/post.service";
import { styled } from "@mui/material/styles";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ShowPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [filteredPosts, setFilterPosts] = useState([]);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 5);

  const getPosts = () => {
    postService.getPosts().then((res) => {
      setFilterPosts(res.data);
    });
  };

  const filterPosts = () => {
    const filtered = filteredPosts.filter((pst) => {
      const postDate = new Date(pst.createdAt);
      return postDate >= startDate && postDate <= endDate;
    });

    setFilterPosts(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postService.getPosts();
        console.log(response);

        // Filter posts created in the last 24 hours
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 5);

        const filtered = response.data.filter((pst) => {
          const postDate = new Date(pst.createdAt);
          return postDate >= startDate && postDate <= endDate;
        });
        console.log(filtered);
        setFilterPosts(filtered);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();

    postService
      .showPost(postId)
      .then((res) => {
        setPost(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, m: "2%" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography
              fontFamily={"sans-serif"}
              fontSize={"70px"}
              color={"black"}
            >
              {post.title}
            </Typography>
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mt: "2%" }}
            alignItems="center"
          >
            <Typography
              fontFamily={"sans-serif"}
              fontSize={"15px"}
              color={"gray"}
            >
              {post.description}
            </Typography>
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mt: "8%" }}
            alignItems="center"
          >
            <Typography
              fontFamily={"monospace"}
              fontSize={"22px"}
              color={"black"}
            >
              {post.body}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} md={4}>
          <Stack>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
            />
          </Stack>
          <Stack sx={{mt:"3%"}}>
            <Typography fontSize={'30px'}>Recent Posts</Typography>
          </Stack>
          <Demo>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {filteredPosts.map((pst) => (
                <>
                  <Link
                    to={`/post/${pst.postId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography
                            fontFamily={"inherit"}
                            fontSize={"24px"}
                            color={"blue"}
                          >
                            {pst.title}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {pst.description}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Link>
                  <Divider />
                </>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography color="text.secondary">{post.description}</Typography>
        <Typography color="text.secondary">{post.body}</Typography>
        <Button variant="contained" color="primary">
          Edit Post
        </Button>
        <Button variant="contained" color="secondary">
          Delete Post
        </Button>

        {post.comments && post.comments.length > 0 && (
          <div>
            <h2>Comments</h2>
            <ul>
              {post.comments.map((comment, index) => (
                <li key={index}>{comment.comment}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShowPost;

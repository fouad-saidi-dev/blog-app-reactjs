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
  Avatar,
  ListItemAvatar,
  Chip,
  Autocomplete,
} from "@mui/material";
import postService from "../../../services/posts/post.service";
import { styled } from "@mui/material/styles";
import commentService from "../../../services/comments/comment.service";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import commentApi from "../../../services/comments/comment-api";
import likePosteService from "../../../services/likes/like-posts/like-posts.service";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddLike from "../../../components/AddLike";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ShowPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [filteredPosts, setFilterPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment_, setComment] = useState("");
  const [likePost, setLikePosts] = useState(null);
  const [searchPost, setPosts] = useState([]);
  //const [id_, setId] = useState("");

  // display comments
  const fetchComments = () => {
    commentService
      .getComments(postId)
      .then((res) => {
        console.log(res);
        setComments(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const likesPost = () => {
    likePosteService
      .getLikesPost(postId)
      .then((res) => {
        console.log(res);
        setLikePosts(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postService.getPosts();

        // Filter posts created in the last 24 hours
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 20);

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

    const searchData = async () => {
      try {
        const response = await postService.getPosts();

        const search = response.data;
        setPosts(search);
      } catch (error) {
        console.error("search doesn't work", error);
      }
    };
    searchData();
    fetchData();

    fetchComments();

    likesPost();

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

  const addComnt = (e) => {
    e.preventDefault();

    commentApi.addComment(e, comment_, postId);
  };

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
          <Divider sx={{ mt: "4%" }} />
          <Stack spacing={2}>
            <Chip
              color="info"
              icon={<ThumbUpIcon color="green" />}
              label={`${likePost}`}
              sx={{
                width: "100px",
                float: "right",
                fontFamily: "fantasy",
                fontSize: "20px",
              }}
            />
            <AddLike postId={postId} />
          </Stack>
          <Divider sx={{ mt: "4%" }} />
          <Stack>
            <Typography fontSize={"30px"} fontFamily={"inherit"}>
              Comments
            </Typography>
          </Stack>
          <Stack>
            <Demo>
              <List>
                {comments.map((cmnt) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={cmnt.comment} />
                  </ListItem>
                ))}
              </List>
            </Demo>
          </Stack>
          <Divider sx={{ mt: "4%" }} />

          <form onSubmit={(e) => addComnt(e)}>
            <Stack spacing={2}>
              <TextField
                label="Add comment"
                id="outlined-size-small"
                size="small"
                value={comment_}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                variant="outlined"
                sx={{ bgcolor: "green", width: "50px", color: "white" }}
                type="submit"
              >
                Add
              </Button>
            </Stack>
          </form>
        </Grid>
        <Grid item xs={6} md={4}>
          <Stack>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={searchPost.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Stack>
          <Stack sx={{ mt: "3%" }}>
            <Typography fontSize={"30px"}>Recent Posts</Typography>
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
};

export default ShowPost;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
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
  CircularProgress,
} from "@mui/material";
import postService from "../../../services/posts/post.service";
import { styled } from "@mui/material/styles";
import commentService from "../../../services/comments/comment.service";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import commentApi from "../../../services/comments/comment-api";
import likePosteService from "../../../services/likes/like-posts/like-posts.service";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddLike from "../../../components/AddLike";
import LikeComment from "../../../components/LikeComment";
import likeCommentService from "../../../services/likes/like-comments/like-comment.service";
import CountLikes from "../../../components/CountLikesComment";
import FolderIcon from "@mui/icons-material/Folder";
import fileApi from "../../../services/files/file-api";
import tagApi from "../../../services/tags/tag-api";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ShowPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [filteredPosts, setFilterPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment_, setComment] = useState("");
  const [likePost, setLikePosts] = useState(0);
  const [searchPost, setPosts] = useState([]);
  const [likecomments, setLikeComnt] = useState(0);
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
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

  // count like of comment
  const likeComment = () => {
    likeCommentService
      .likecomments()
      .then((res) => {
        console.log("likes : ", res);
        setLikeComnt(res.data);
      })
      .catch((err) => {
        console.log("error", err);
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

  const getTagsByPostId__ = () => {
    tagApi.getTagsByPostId_(postId, setTags);
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
    const fileName = `${postId}${`.png`}`;
    const getImage = () => {
      fileApi.getFile(fileName, setImage);
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

    likeComment();

    getImage();

    getTagsByPostId__();

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

    commentApi.addComment(e, comment_, postId, fetchComments);
  };

  if (!post) {
    return (
      <div>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "15%" }}>
          <CircularProgress />
        </Box>
      </div>
    );
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
          {image != null ? (
            <Stack
              spacing={2}
              direction="row"
              sx={{ mt: "2%" }}
              alignItems="center"
            >
              <img
                src={`http://localhost:8081/files/get/${post.postId}.png`}
                alt={post.title}
                style={{ width: "80%" }}
              />
            </Stack>
          ) : (
            <br />
          )}
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
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
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
            <AddLike postId={postId} likePosts={likesPost} />
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
                    <ListItemText
                      primary={cmnt.comment}
                      secondary={<LikeComment commentId={cmnt.commentId} />}
                    />
                    <CountLikes commentId={cmnt.commentId} />
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
          <Divider sx={{ mt: "4%" }} />
          <Stack direction={"column"} spacing={2}>
            <Typography fontSize={"30px"} fontFamily={"inherit"}>
              Tags
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            {tags.map((tag, index) => (
              <Link to={`/posts/${tag.name}`}>
              <Chip
                label={`#${tag.name}`}
                color="success"
                variant="outlined"
                sx={{ width: "100px" }}
                clickable
              />
              </Link>
            ))}
          </Stack>
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
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
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

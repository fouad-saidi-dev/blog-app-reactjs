import {
  Box,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import postApi from "../../../services/posts/post-api";
import { useParams } from "react-router-dom";

export default function EditPost(params) {
  const [title_, setTitle] = useState("");
  const [body_, setBody] = useState("");
  const [description_, setDescrip] = useState("");
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const edit_post = (e, id) => {
    e.preventDefault();
    postApi.editPost(e, id, title_, description_, body_);
    setOpenAlert(true);
  };

  const getPost = () => {
    postApi.showPost(postId, setTitle, setDescrip, setBody);
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <>
      <Paper
        sx={{
          width: "400px",
          mr: "auto",
          ml: "auto",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create your post here
          </Typography>{" "}
          <br />
          <form onSubmit={(e) => edit_post(e, postId)}>
            <TextField
              name="title"
              value={title_}
              onChange={(ev) => setTitle(ev.target.value)}
              required
              label="Title"
              sx={{ marginTop: "10px" }}
            />{" "}
            <br />
            <TextField
              name="description"
              value={description_}
              onChange={(ev) => setDescrip(ev.target.value)}
              required
              label="Description"
              sx={{ marginTop: "10px" }}
            />{" "}
            <br />
            <TextField
              name="body"
              value={body_}
              onChange={(ev) => setBody(ev.target.value)}
              required
              label="Body"
              sx={{ marginTop: "10px" }}
            />{" "}
            <br />
            <Button
              type="submit"
              color="primary"
              size="medium"
              variant="contained"
              sx={{
                mt: "10px",
                mr: "auto",
                ml: "auto",
              }}
            >
              Add
            </Button>
          </form>
        </Box>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={() => setOpenAlert(false)}
          message="Post edited successfully!"
        />
      </Paper>
    </>
  );
}

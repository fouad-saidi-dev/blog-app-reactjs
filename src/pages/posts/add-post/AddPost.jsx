import { Box, Button, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { React, useState } from "react";
import postApi from "../../../services/posts/post-api";
import MuiAlert from '@mui/material/Alert';

export default function AddPost(params) {
  const [title_, setTitle] = useState("");
  const [body_, setBody] = useState("");
  const [description_,setDescrip] = useState("")
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const add_post = (e) => {
    e.preventDefault();

    postApi.addPost(e, title_, description_, body_)
  };

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
        <form onSubmit={(e) => add_post(e)}>
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
    </Paper>
    
  </>
  );
}

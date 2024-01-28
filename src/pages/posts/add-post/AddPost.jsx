import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { React, useState } from "react";
import postApi from "../../../services/posts/post-api";
import fileApi from "../../../services/files/file-api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import TextEditor from "../../../components/TextEditor";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddPost(params) {
  const [title_, setTitle] = useState("");
  const [body_, setBody] = useState("");
  const [description_, setDescrip] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [picture, setPicture] = useState(null);

  const add_post = (e) => {
    e.preventDefault();

    postApi.addPost(e, title_, description_, body_, tags);
    setOpenAlert(true);
  };
  console.log(tags)

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleChange = (content) => {
    setBody(content);
  };

  return (
    <>
      <Paper
        sx={{
          width: "800px",
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
              sx={{ marginTop: "10px", width: "600px" }}
            />{" "}
            <br />
            <TextField
              name="description"
              value={description_}
              onChange={(ev) => setDescrip(ev.target.value)}
              required
              label="Description"
              sx={{ marginTop: "10px", width: "600px" }}
            />{" "}
            <br />
            <Typography>Body Post :</Typography>
            <TextEditor value={body_} onChange={handleChange} />
            <br />
            <br />
            <Typography>Tags:</Typography>
            <div>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </div>
            <TextField
              type="text"
              value={tagInput}
              onChange={handleTagChange}
              label="Tags"
              sx={{width:"80%"}}
            />
            <Button type="button" sx={{float:"right"}} onClick={handleAddTag}>
              Add Tag
            </Button>
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
          message="Post added successfully!"
        />
      </Paper>
    </>
  );
}

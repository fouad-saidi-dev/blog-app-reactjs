import { useState, React, useEffect } from "react";
import postApi from "../../../services/posts/post-api";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ProgressCircul from "../../../components/ProgressCircul";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const GetPostsUser = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPosts = () => {
    postApi.getPostsUser(userId, setPosts);
  };

  const deletePost = (id) => {
    if (window.confirm("Are u sure you want delete this post")) {
      postApi.deletePost(id, getPosts);
    }
  };

  useEffect(() => {
    getPosts();
  }, [userId]);

  if (posts.length == 0) {
    return <ProgressCircul condition={posts.length} />;
  }

  return (
    <Box sx={{ flexGrow: 2 }}>
      <Typography align="center" fontFamily={"monospace"} fontSize={"50px"}>
        YOUR POSTS
      </Typography>
      <Divider sx={{ width: "50%", mr: "auto", ml: "auto" }} />
      <Grid container spacing={2} minHeight={200}>
        {posts.map((post, index) => (
          <>
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <Button
                variant="outlined"
                sx={{ mr: "4%" }}
                onClick={handleClickOpen}
              >
                Open your post
              </Button>
              <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{
                  bgcolor: "turquoise",
                }}
              >
                <DialogTitle id="responsive-dialog-title">
                  {post.title}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>{post.description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <IconButton autoFocus onClick={handleClose}>
                    <CancelIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => deletePost(post.postId)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                  <Link
                    to={`/edit-post/${post.postId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <IconButton aria-label="edit" size="large">
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Link>
                </DialogActions>
              </Dialog>
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((row) => (
            <StyledTableRow key={row.postId}>
              <StyledTableCell align="center">{row.title}</StyledTableCell>
              <StyledTableCell align="center">
                {row.description}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Stack
                  direction="row"
                  sx={{
                    width: "20px",
                  }}
                >
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => deletePost(row.postId)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                  <Link
                    to={`/edit-post/${row.postId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <IconButton aria-label="edit" size="large">
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Link>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GetPostsUser;

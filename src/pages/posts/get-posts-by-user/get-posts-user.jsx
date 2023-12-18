import { useState, React, useEffect } from "react";
import postApi from "../../../services/posts/post-api";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

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
                  <IconButton aria-label="delete" size="large" onClick={() => deletePost(row.postId)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                  <Link to={`/edit-post/${row.postId}`} style={{textDecoration:"none"}}>
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

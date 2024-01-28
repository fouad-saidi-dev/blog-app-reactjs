import { useEffect, useState } from "react";
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
  TablePagination,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";
import Alert from "../../../components/Alert";

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

const DataPosts = () => {
  const [posts, setPosts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const findAllPosts = () => {
    postApi.getPosts(setPosts);
  };

  const deletePost = (id) => {
    postApi.deletePost(id, findAllPosts,setOpenAlert);
  };

  useEffect(() => {
    findAllPosts();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Created At</StyledTableCell>
              <StyledTableCell align="center">Actions dkjhqjh</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              .map((row) => (
                <StyledTableRow key={row.postId}>
                  <StyledTableCell align="center">{row.title}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.createdAt}
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
              ))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Alert message={"post was deleted"} openAlert={openAlert} onClose={() => setOpenAlert(false)} />
    </>
  );
};

export default DataPosts;

import React, { useEffect, useState } from "react";
import userService from "../../services/users/user.service";
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
import axios from "axios";
import userApi from "../../services/users/user-api";
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

export default function DipslayUsers(params) {
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getUsers = () => {
    userApi.displayUsers(setUsers);
  };

  const deleteUser = (id) => {
    if (window.confirm("Vous avez supprime cette user?")) {
      userApi.deleteUser(id);
    }
  };

  const deleteU = (id) => {
    if (window.confirm("Vous avez supprime cette user?")) {
      userService
        .deleteUser(id)
        .then((res) => {
          console.log(res);
          getUsers();
        })
        .catch((er) => {
          console.log(er);
        });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .map((row) => (
                <StyledTableRow key={row.userId}>
                  <StyledTableCell align="center">
                    {row.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.phone}</StyledTableCell>
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
                        onClick={() => deleteUser(row.userId)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      <Link
                        to={`/post/edit/${row.userId}`}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

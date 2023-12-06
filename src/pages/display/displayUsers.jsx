import React, { useEffect, useState } from "react";
import userService from "../../services/users/user.service";
import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { styled } from "@mui/material/styles";
import axios from "axios";

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

  const displayUsers = () => {
    userService
      .getUsers()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((er) => console.log(er));
  };

  const getUsers = () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    };
    axios
      .get(`http://localhost:8081/users`, config)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
          {users.map((row) => (
            <StyledTableRow key={row.userId}>
              <StyledTableCell align="center">{row.firstName}</StyledTableCell>
              <StyledTableCell align="center">{row.lastName}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.phone}</StyledTableCell>
              <StyledTableCell align="center">
                <Fab color="primary" aria-label="add"
                sx={{
                  width:"35px",
                  height:"30px"
                }}>
                  <AddIcon />
                </Fab>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

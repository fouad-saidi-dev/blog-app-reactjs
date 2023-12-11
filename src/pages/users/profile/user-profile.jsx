import { React, useEffect, useState } from "react";
import userService from "../../../services/users/user.service";
import { Avatar, Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import userApi from "../../../services/users/user-api";

const Profile = (params) => {
  const [fname_, setFname] = useState("");
  const [lname_, setLname] = useState("");
  const [phone_, setPhone] = useState("");
  const [email_, setEmail] = useState("");

  const userId = localStorage.getItem("userId");

  const getUser = () => {
    userService
      .showUser(userId)
      .then((res) => {
        console.log(res);
        const { firstName, lastName,phone,email } = res.data
        setFname(firstName);
        setLname(lastName);
        setPhone(phone);
        setEmail(email);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const updateUser = (e) => {

    e.preventDefault();

    userApi.updateUser(e,userId,fname_,lname_,phone_)
  }

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <Box sx={{ flexGrow: 1, m: "10%" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
           <Paper>
             <Stack spacing={2} sx={{m:"3%"}}>
                <Avatar sx={{alignItems:"center",width:"80px",height:"80px"}}>
                  <Typography fontSize={'30px'}>{fname_.charAt().toLocaleLowerCase()} {lname_.charAt().toLocaleLowerCase()}  </Typography> 
                </Avatar> 
                <Typography sx={{
                   fontFamily:"inherit",
                   fontSize:"20px",
                   textAlign:"center"
                }}>
                    Full Name : {fname_} {lname_}  <br/>
                    Email : {email_}
                </Typography>

             </Stack>
           </Paper> 
        </Grid>
        <Grid item xs={6} md={8}>
            <Paper>
                <form onSubmit={(e) => updateUser(e)}>
                <Stack spacing={2}>
                    <TextField
                    label={'First Name'}
                    value={fname_}
                    variant="outlined"
                    onChange={(e) => setFname(e.target.value)}
                    />
                    <TextField
                    label={'Last Name'}
                    value={lname_}
                    variant="outlined"
                    onChange={(e) => setLname(e.target.value)}
                    />
                    <TextField
                    label={'Number Phone'}
                    value={phone_}
                    variant="outlined"
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{
                        mb:"4%"
                    }}
                    />
                    <Button type="submit" variant="contained" >Save</Button>
                    
                </Stack>
                </form>
            </Paper>
        </Grid>
        </Grid>
        </Box>
  );
};

export default Profile;

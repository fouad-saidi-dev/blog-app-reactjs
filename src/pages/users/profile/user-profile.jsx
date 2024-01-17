import { React, lazy, useEffect, useState } from "react";
import userService from "../../../services/users/user.service";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import userApi from "../../../services/users/user-api";
import Alert from "../../../components/Alert";
import fileApi from "../../../services/files/file-api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

const Profile = (params) => {
  const [fname_, setFname] = useState("");
  const [lname_, setLname] = useState("");
  const [phone_, setPhone] = useState("");
  const [email_, setEmail] = useState("");
  const [open, setOpenAlert] = useState(false);
  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(null);

  const userId = localStorage.getItem("userId");

  const handleFileChange = (e) => {
    setUpload(e.target.files[0]);
  };

  const getUser = () => {
    userService
      .showUser(userId)
      .then((res) => {
        console.log(res);
        const { firstName, lastName, phone, email } = res.data;
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

    userApi.updateUser(e, userId, fname_, lname_, phone_);
    setOpenAlert(true);
  };

  const uploadAvatar = (e) => {
    fileApi.uploadAvatar(e, upload);
  };

  const fileName = `${fname_}-${lname_}.${"png"}`;
  const getAvatar = () => {
    fileApi.getFile(fileName, setFile);
  };

  useEffect(() => {
    getUser();
    getAvatar();
  }, [userId, fname_, lname_]);

  console.log("File", file);
  return (
    <Box sx={{ flexGrow: 1, m: "10%" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Paper>
            <Stack spacing={2} sx={{ m: "3%" }}>
              {file == null ? (
                <Avatar
                  sx={{ alignItems: "center", width: "80px", height: "80px" }}
                >
                  <Typography fontSize={"30px"}>
                    {fname_.charAt().toLocaleLowerCase()}{" "}
                    {lname_.charAt().toLocaleLowerCase()}{" "}
                  </Typography>
                </Avatar>
              ) : (
                <Avatar
                  src={`http://localhost:8081/files/get/${fileName}`}
                  sx={{
                    width: "80px",
                    height: "80px",
                    justifyContent:"center"
                  }}
                />
              )}
              <Typography
                sx={{
                  fontFamily: "inherit",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                Full Name : {fname_} {lname_} <br />
                Email : {email_}
              </Typography>
            </Stack>
          </Paper>
          <Paper>
            <form
              onSubmit={(e) => uploadAvatar(e)}
              encType="multipart/form-data"
            >
              <Stack spacing={2} sx={{m:"4px"}}>
                <TextField type="file" onChange={handleFileChange} />
                <Button type="submit" variant="contained" size="small" sx={{
                  width:"70px"
                }}>
                  Upload
                  </Button>
                <br />
              </Stack>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={6} md={8}>
          <Paper>
            <form onSubmit={(e) => updateUser(e)}>
              <Stack spacing={2}>
                <TextField
                  label={"First Name"}
                  value={fname_}
                  variant="outlined"
                  onChange={(e) => setFname(e.target.value)}
                />
                <TextField
                  label={"Last Name"}
                  value={lname_}
                  variant="outlined"
                  onLoad={lazy}
                  onChange={(e) => setLname(e.target.value)}
                />
                <TextField
                  label={"Number Phone"}
                  value={phone_}
                  variant="outlined"
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{
                    mb: "4%",
                  }}
                />
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Alert
        openAlert={open}
        message={"Updated Success"}
        onClose={() => setOpenAlert(false)}
      />
    </Box>
  );
};

export default Profile;

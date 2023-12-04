import { Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import userService from "../../services/users/user.service";

export default function Login() {
  const [email_, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (ev) => {
    ev.preventDefault();

    const reqData = {
        email: email_,
        encryptedPassword : password,
    };

    userService.login(reqData)
    .then(res => {console.log(res)})
    .catch(e => {
        console.log(e)
    });

  };

  return (
    <div>
      <Card sx={{ width: 400, marginLeft: "auto", marginRight: "auto" }}>
        <form onSubmit={(ev) => login(ev)}>
        <Typography
          sx={{ fontFamily: "monospace", fontSize: 17, textAlign: "center" }}
        >
          Login Page
        </Typography>
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <TextField id="outlined-basic" label="Email" variant="outlined"  value={email_} onChange={(e) => {setEmail(e.target.value)}}/>
          <TextField id="outlined-basic" type="password" label="Password" variant="outlined" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}

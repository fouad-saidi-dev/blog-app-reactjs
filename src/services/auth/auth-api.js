import authService from "./auth-service.service";

const login = (e,email, password) => {
  e.preventDefault();

  authService
    .login(email, password)
    .then((res) => {
      console.log("Login Success !!", res);
      const token = res.data.token;
      const userId = res.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setTimeout(() => {
        window.location = `/profile`
      }, 6000);
      //window.location = "/"
    })
    .catch((err) => {
      console.log("Error ", err);
    });
};

const authApi = {
    login
}

export default authApi;
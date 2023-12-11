import http from "../http-common";

const getUsers = () => {
  return http.get(`/users`);
};

const login = () => {
  return http.post(`/users/login`);
};

const register = (firstName, lastName, email, phone, encryptedPassword) => {
  const reqData = {
    firstName,
    lastName,
    phone,
    email,
    encryptedPassword,
  };
  return http.post(`/users/add-user`, reqData);
};

const updateUser = (id, firstName, lastName, phone) => {
  const reqData = {
    firstName,
    lastName,
    phone,
  };
  return http.put(`/users/${id}`, reqData);
};

const showUser = (id) => {
  return http.get(`/users/${id}`);
};

const deleteUser = (id) => {
  return http.delete(`/users/${id}`);
};

const userService = {
  getUsers,
  login,
  register,
  updateUser,
  deleteUser,
  showUser
};

export default userService;

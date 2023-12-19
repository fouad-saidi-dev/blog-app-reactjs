import userService from "./user.service";

const updateUser = (ev, id, firstName, lastName, phone) => {
  ev.preventDefault();

  userService
    .updateUser(id, firstName, lastName, phone)
    .then((res) => {
      console.log(res);
    })
    .catch((er) => {
      console.log(er);
    });
};

const deleteUser = (id) => {
  userService
    .deleteUser(id)
    .then((res) => {
      console.log(res);
    })
    .catch((er) => {
      console.log(er);
    });
};

const getUser = (id, setFirstName) => {
  userService
    .showUser(id)
    .then((res) => {
      console.log(res);
      const { firstName } = res.data;
      setFirstName(firstName);
    })
    .catch((err) => {
      console.log(err);
    });
};

const userApi = {
  updateUser,
  deleteUser,
  getUser,
};

export default userApi;

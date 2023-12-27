import fileService from "./file.service";

const getFile = (fileName, setFile) => {
  fileService
    .getFile(fileName)
    .then((res) => {
      console.log("File Response", res);
      setFile(res.data);
    })
    .catch((err) => {
      console.log("File Error", err);
    });
};

const uploadAvatar = async (e, files) => {
  e.preventDefault();

  await fileService
    .upload(files)
    .then((res) => {
      console.log(res);
    })
    .catch((er) => {
      console.log(er);
    });
};

const uploadImage = async (e, id, image) => {
  e.preventDefault();

  const response = await fileService.uploadImage(id, image);
  console.log(response.data);
  console.error(response.message);
};

const fileApi = {
  getFile,
  uploadAvatar,
  uploadImage,
};

export default fileApi;

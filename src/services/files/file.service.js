import http from "../auth/http";
import httpCommon from "../http-common";
import httpFile from "./http-file";

const getFile = (fileName) => {
  return http.get(`/files/get/${fileName}`);
};

const upload = (files) => {
  const formData = new FormData();
  formData.append('files',files)

  return httpFile.post(`/files/upload/avatar`, formData);
};

const uploadImage = (id,files) => {
  const formData = new FormData();
  formData.append('files',files)

  return httpFile.post(`/files/upload/post/${id}`, formData);
};

const fileService = {
  getFile,
  upload,
  uploadImage
};

export default fileService;

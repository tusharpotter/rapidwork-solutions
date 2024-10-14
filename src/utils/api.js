import axios from "axios";
import { baseUrl } from "./config.json";

export const postRequest = (path, data) => {
  const authToken = localStorage.getItem("authToken");
  return axios.post(`${baseUrl}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const getRequest = (path) => {
  const authToken = localStorage.getItem("authToken");
  return axios.get(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const putRequest = (path, data) => {
  const authToken = localStorage.getItem("authToken");
  return axios.put(`${baseUrl}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const multiGetRequest = async (paths) => {
  let arr = [];
  const authToken = localStorage.getItem("authToken");
  paths.forEach((item) => {
    arr.push(
      axios.get(`${baseUrl}${item}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    );
  });

  return axios.all(arr);
};

export const multiPostRequest = async (configs) => {
  let arr = [];
  const authToken = localStorage.getItem("authToken");
  configs.forEach((item) => {
    arr.push(
      axios.post(`${baseUrl}${item.url}`, item.data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    );
  });
  return axios.all(arr);
};

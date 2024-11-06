import axios from "axios";
import config from "./config.json";

export const postRequest = (path, data) => {
  const authToken = localStorage.getItem("authToken");
  return axios.post(`${config.baseUrl}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const getRequest = (path) => {
  const authToken = localStorage.getItem("authToken");
  return axios.get(`${config.baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const putRequest = (path, data) => {
  const authToken = localStorage.getItem("authToken");
  return axios.put(`${config.baseUrl}${path}`, data, {
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
      axios.get(`${config.baseUrl}${item}`, {
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
      axios.post(`${config.baseUrl}${item.url}`, item.data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    );
  });
  return axios.all(arr);
};

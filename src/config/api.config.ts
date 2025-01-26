import axios, { CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: "/api",
  headers: { "Content-type": "application/json" },
  withCredentials: true,
};

const axiosPublic = axios.create(options);

export { axiosPublic };

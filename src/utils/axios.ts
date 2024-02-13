import axios from "axios";

const axiosServices = axios.create();

axiosServices.interceptors.response.use(
  (response: any) => response,
  (error: { response: { data: any } }) =>
    Promise.reject((error.response && error.response.data) || "Wrong Services")
);

export default axiosServices;

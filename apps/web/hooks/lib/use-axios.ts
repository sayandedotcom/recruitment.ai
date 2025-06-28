import axios from "axios";

const useAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Simple error handling without auth
// useAxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default useAxios;

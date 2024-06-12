import { axiosInstance } from "./index";

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/user/register", value);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/user/login", value);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/user/get-current-user");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

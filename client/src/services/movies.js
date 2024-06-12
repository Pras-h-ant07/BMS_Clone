import { axiosInstance } from "./index";

//get all movies
export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//add a movie
export const addMovie = async (values) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", values);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//update a movie
export const updateMovie = async (payload) => {
  try {
    const response = await axiosInstance.put("/api/movies/update-movie", payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//delete a movie
export const deleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/delete-movie",
      payload
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//get a single movie
export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/movies/get-a-movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

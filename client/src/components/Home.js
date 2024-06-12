import React, { useState, useEffect } from "react";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../services/movies";
import { message, Row, Col, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

function Home() {
  const [movies, setMovies] = useState(null);
  const [searchText, setSearchText] = useState("");
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading());
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Row className="flex justify-center w-100 mb-4">
        <Input
          className="flex justify-center w-[50rem] h-[3.4rem] bg-gray-100/60 border-red-500 border-2"
          placeholder="Type here to search for movies"
          onChange={handleSearch}
          prefix={<SearchOutlined className="pr-2 text-xl" />}
        />
      </Row>
      <Row
        className="flex justify-center w-100"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {movies &&
          movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((movie) => (
              <Col
                className="gutter-row mb-5"
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div className="text-center text-1xl font-bold mt-3">
                  <img
                    onClick={() => {
                      if(!user.isAdmin){
                        navigate(
                          `/movie/${movie._id}?date=${moment().format(
                            "YYYY-MM-DD"
                          )}`
                        );
                      }
                    }}
                    className="cursor-pointer w-[13rem] h-[20rem]"
                    src={movie.poster}
                    alt="Movie Poster"
                    width={200}
                    style={{ borderRadius: "8px" }}
                  />
                  <h3
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                  >
                    {movie.title}
                  </h3>
                </div>
              </Col>
            ))}
      </Row>
    </>
  );
}

export default Home;

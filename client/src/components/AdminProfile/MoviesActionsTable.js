import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import AddNewMovieForm from "./AddNewMovieForm";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../services/movies";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteMovieCnfrmPopUp from "./DeleteMovieCnfrmPopUp";

function MoviesActionsTable() {
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [formtype, setFormtype] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  // getAll MovieAPI call
  const getData = async () => {
    dispatch(showLoading());
    const response = await getAllMovies();
    const allMovies = response.data;
    setMovies(
      allMovies.map((movie) => {
        return { ...movie, key: `movie${movie._id}` };
      })
    );
    dispatch(hideLoading());
  };

  const tableHeadings = [
    {
      title: "Poster",
      dataindex: "poster",
      render: (text, data) => {
        return (
          <img
            width={75}
            height={100}
            style={{ objectFit: "cover" }}
            src={data.poster}
            alt="movie"
          />
        );
      },
    },
    { title: "Movie Name", dataIndex: "title" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => {
        return `${text} min`;
      },
    },
    { title: "Genre", dataIndex: "genre" },
    { title: "Language", dataIndex: "language" },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("MM-DD-YYYY");
      },
    },
    {
      title: "Action",
      render: (text, data) => {
        return (
          <div className="flex justify-center">
            <Button
              className="border-2 border-green-500 mr-1"
              onClick={() => {
                setIsMovieFormOpen(true);
                setSelectedMovie(data);
                setFormtype("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              className="border-2 border-red-500"
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          className="bg-red-500 text-white font-bold text-base mb-3"
          onClick={() => {
            setIsMovieFormOpen(true);
            setFormtype("add");
          }}
        >
          Add Movie
        </Button>
      </div>

      <Table dataSource={movies} columns={tableHeadings} />

      {isMovieFormOpen && (
        <AddNewMovieForm
          isModalOpen={isMovieFormOpen}
          setIsModalOpen={setIsMovieFormOpen}
          formtype={formtype}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteMovieCnfrmPopUp
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
    </>
  );
}

export default MoviesActionsTable;

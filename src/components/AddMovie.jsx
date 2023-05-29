import React, { useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import style from "../css/addMovie.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, closeSuccessMsg } from "../redux/moviesSlice";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const { successMsg } = useSelector((state) => state.movies);
  const [movieData, setMovieData] = useState({
    title: "",
    releaseDate: "",
    overview: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setMovieData({ ...movieData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMovie(movieData));
    setMovieData({ title: "", releaseDate: "", overview: "" });
    setTimeout(() => {
      // navigate("/");
      dispatch(closeSuccessMsg());
      // window.location.reload();
    }, 2000);
  };

  return (
    <div className={style.add_movie_form}>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.inputs}>
          <TextField
            required
            id="outlined-basic"
            label="Title"
            variant="outlined"
            margin="dense"
            name="title"
            value={movieData.title}
            onChange={handleChange}
          />
          <TextField
            type="date"
            required
            id="outlined-basic"
            label="Release date"
            variant="outlined"
            margin="dense"
            name="releaseDate"
            InputLabelProps={{
              shrink: true,
            }}
            value={movieData.releaseDate}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Overview"
            variant="outlined"
            margin="dense"
            multiline
            name="overview"
            value={movieData.overview}
            onChange={handleChange}
          />
          <Button type="submit" variant="outlined" margin="dense">
            Add Movie
          </Button>
          {successMsg && (
            <Alert severity="success" sx={{ width: "100%", marginTop: "20px" }}>
              Movie added successfully!
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddMovie;

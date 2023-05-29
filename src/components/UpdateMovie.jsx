import { Alert, Button, TextField } from "@mui/material";
import style from "../css/addMovie.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSuccessMsg, updateMovie } from "../redux/moviesSlice";

const UpdateMovie = () => {
  const { movies, successMsg } = useSelector((state) => state.movies);
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setMovie(movies.find((movie) => +movie.id === +id));
  }, [id, movies]);

  const handleChange = (event) => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateMovie(movie));

    setTimeout(() => {
      navigate(`/movie/${movie.id}`);
      dispatch(closeSuccessMsg());
    }, 2000);
  };

  return (
    <div className={style.add_movie_form}>
      <h1>Update Movie</h1>
      {movie && (
        <form onSubmit={handleUpdate}>
          <div className={style.inputs}>
            <TextField
              required
              id="outlined-basic"
              label="Title"
              variant="outlined"
              margin="dense"
              name="title"
              value={movie.title}
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
              value={movie.releaseDate}
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
              value={movie.overview}
              onChange={handleChange}
            />
            <Button type="submit" variant="outlined" margin="dense">
              Update Movie
            </Button>
            {successMsg && (
              <Alert
                severity="success"
                sx={{ width: "100%", marginTop: "20px" }}
              >
                Movie updated successfully!
              </Alert>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateMovie;

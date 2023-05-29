import { useEffect } from "react";
import Movie from "./Movie";
import { Alert, Grid } from "@mui/material";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../redux/moviesSlice";

const Movies = () => {
  const { movies, isLoading, error } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
    console.log("Hello")
  }, []);
  
  return (
    <div className="movies">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {movies ? (
            movies.length > 0 ? (
              movies.map((movie) => {
                return (
                  <Grid key={movie.id} item xs={12} md={6} lg={3}>
                    <Movie {...movie} />
                  </Grid>
                );
              })
            ) : (
              <Alert severity="info">There is no movies available!</Alert>
            )
          ) : (
            <Loading />
          )}
        </Grid>
      )}
    </div>
  );
};

export default Movies;

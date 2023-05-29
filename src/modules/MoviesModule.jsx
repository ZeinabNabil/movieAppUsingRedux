import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Movies = lazy(() => import("../components/Movies"));
const AddMovie = lazy(() => import("../components/AddMovie"));
const MovieDetails = lazy(() => import("../components/MovieDetails"));
const UpdateMovie = lazy(() => import("../components/UpdateMovie"));
const NotFound = lazy(() => import("../components/NotFound"));

const MoviesModule = () => {
  return (
    <Routes>
      <Route index element={<Movies />}></Route>
      <Route path="add" element={<AddMovie />}></Route>
      <Route path=":id" element={<MovieDetails />}></Route>
      <Route path="update/:id" element={<UpdateMovie />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default MoviesModule;

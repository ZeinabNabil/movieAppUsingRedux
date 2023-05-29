import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get("http://localhost:3000/movies");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movie, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post("http://localhost:3000/movies", movie);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(`http://localhost:3000/movies/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async (movie, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.put(
        `http://localhost:3000/movies/${movie.id}`,
        movie
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: null,
    isLoading: false,
    error: null,
    successMsg: false,
  },
  reducers: {
    openSuccessMsg: (state) => {
      state.successMsg = true;
    },
    closeSuccessMsg: (state) => {
      state.successMsg = false;
    },
    // getAllMovies: async (state) => {
    //   await axios
    //     .get("http://localhost:3000/movies")
    //     .then((response) => ({ ...state, movies: response.data }))
    //     .catch((error) => console.log(error));
    // },
  },
  extraReducers: {
    // getAllMovies
    [getAllMovies.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [getAllMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
    },
    [getAllMovies.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // addMovie
    [addMovie.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMsg = false;
    },
    [addMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = [...state.movies, action.payload];
      state.successMsg = true;
    },
    [addMovie.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.successMsg = false;
    },
    // deleteMovie
    [deleteMovie.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = state.movies.filter(
        (movie) => +movie.id !== +action.payload
      );
    },
    [deleteMovie.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.successMsg = false;
    },
    // updateMovie
    [updateMovie.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMsg = false;
    },
    [updateMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = state.movies.map((movie) =>
        movie.id === action.payload.id ? action.payload : movie
      );
      state.successMsg = true;
    },
    [updateMovie.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.successMsg = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSuccessMsg, closeSuccessMsg } = moviesSlice.actions;

export default moviesSlice.reducer;

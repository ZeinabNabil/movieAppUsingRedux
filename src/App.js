import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
// import MoviesModule from "./modules/MoviesModule";
import { Box, Toolbar } from "@mui/material";
// import NotFound from "./components/NotFound";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";
import { Provider } from "react-redux";
import store from "./redux/store";

const Movies = lazy(() => import("./modules/MoviesModule"));
const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Box component="main" sx={{ p: 3 }}>
              <Toolbar />
              <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/movie/*" element={<Movies />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
          </BrowserRouter>
        </div>
      </Suspense>
    </Provider>
  );
}

export default App;

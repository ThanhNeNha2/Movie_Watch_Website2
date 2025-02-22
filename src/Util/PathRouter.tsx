import { Route, Routes } from "react-router-dom";
import Home from "../Page/Client/Home/Home";
import DetailMovies from "../Page/Client/DetailMovies/DetailMovies";
import Play from "../Page/Client/Play/Play";
const PathRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detailmovies" element={<DetailMovies />} />
      <Route path="/play" element={<Play />} />
    </Routes>
  );
};

export default PathRouter;

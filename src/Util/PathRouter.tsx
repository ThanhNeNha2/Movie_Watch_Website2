import { Route, Routes } from "react-router-dom";
import Home from "../Page/Client/Home/Home";
import DetailMovies from "../Page/Client/DetailMovies/DetailMovies";
import Play from "../Page/Client/Play/Play";
import ContentSearch from "../Page/Client/Search/ContentSearch";
const PathRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detailmovies/:movieName" element={<DetailMovies />} />
      <Route path="/play" element={<Play />} />
      <Route path="/contentSearch" element={<ContentSearch />} />
    </Routes>
  );
};

export default PathRouter;

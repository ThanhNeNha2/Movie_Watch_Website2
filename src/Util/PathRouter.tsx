import { Route, Routes } from "react-router-dom";
import Home from "../Page/Client/Home/Home";
import DetailMovies from "../Page/Client/DetailMovies/DetailMovies";
import Play from "../Page/Client/Play/Play";
import ContentSearch from "../Page/Client/Search/ContentSearch";
import ListMoveSearch from "../Page/Client/ListMoveSearch/ListMoveSearch";
import SearchName from "../Page/Client/SearchName/SearchName";
const PathRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detailmovies/:movieName" element={<DetailMovies />} />
      <Route path="/play/:movieName" element={<Play />} />

      <Route path="/contentSearch" element={<ContentSearch />} />
      <Route path="/ListMoveSearch" element={<ListMoveSearch />} />
      <Route path="/SearchName" element={<SearchName />} />
    </Routes>
  );
};

export default PathRouter;

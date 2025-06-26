import React, { useEffect, useState } from "react";
import Header from "../../../Components/Client/Header/Header";
import Search from "../../../Components/Client/Search/Search";
import Content from "../../../Components/Client/Content/Content";
import NewMovieUpdated from "../../../Components/Client/NewMovieUpdated/NewMovieUpdated";
import NewMovieUpdatedSeries from "../../../Components/Client/NewMovieUpdatedSeries/NewMovieUpdatedSeries";
import Flooter from "../../../Components/Client/Flooter/Flooter";

const ListMoveSearch = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="h-auto">
      {isScrolled && <Header isScrolled={isScrolled} />}

      <div className="bg-gray-900 px-12 h-auto flex flex-col gap-5">
        <Search />
        <Content />
        <NewMovieUpdated />
        <NewMovieUpdatedSeries />
      </div>
      <Flooter />
    </div>
  );
};

export default ListMoveSearch;

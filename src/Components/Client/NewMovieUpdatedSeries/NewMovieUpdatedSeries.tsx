import React from "react";
import anhbia from "../../../../public/content/anime4.jpg";
import anhbia2 from "../../../../public/content/anime5.jpg";
import { arrNewMovieUpdatedSeries } from "../../../Util/apiFake";
import { MdOutlineStar } from "react-icons/md";
import { Link } from "react-router-dom";

const NewMovieUpdatedSeries = () => {
  return (
    <div className="h-auto ">
      <div className="flex justify-between">
        {" "}
        <span className=" font-Bricolage font-semibold text-[25px] text-white  ">
          {" "}
          Phim Bộ Mới Cập Nhật
        </span>
        <span className="text-white hover:text-green-400 cursor-pointer">
          Xem tất cả
        </span>
      </div>
      <div className="flex flex-wrap justify-between  mt-5  ">
        {arrNewMovieUpdatedSeries.map((item, i) => (
          <div
            key={i}
            className="relative group w-[calc(100%/6-12px)] overflow-visible cursor-pointer mb-10"
          >
            <Link to={"/detailmovies"} className="block h-full">
              {/* Thumbnail */}
              <div className="h-[281px] rounded-md relative">
                <div className="absolute bg-green-400 right-0 px-3 overflow-hidden rounded">
                  <span className="font-Vip text-white">Free</span>
                </div>
                <img
                  src={item.thumb_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tên phim */}
              <span className="text-white group-hover:text-green-400">
                {item.name}
              </span>

              {/* Nội dung hiển thị khi hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5  bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 shadow-lg rounded-md">
                {/* Phim 1  */}
                <div className=" w-[285px] h-[350px] flex flex-col  overflow-hidden rounded group cursor-pointer ">
                  {/* img */}
                  <div className="  flex-[2] rounded-md relative overflow-hidden">
                    <div className="absolute bg-green-400 right-0 px-3  rounded">
                      <span className="font-Vip text-white">Free</span>
                    </div>
                    <img
                      src={item.poster_url}
                      alt=""
                      className="w-full h-full object-cover   "
                    />
                  </div>

                  {/* Nội dung */}
                  <div className="flex-[3] bg-gray-600 px-3 py-2 flex flex-col justify-between gap-1">
                    <div className="flex  ">
                      <span className="font-Vip text-white text-lg hover:text-green-400 w-full">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center   ">
                      <div className="flex items-center text-green-400 ">
                        {" "}
                        <MdOutlineStar />{" "}
                        <span className="text-green-400">
                          {item.movie.tmdb.vote_average}
                        </span>
                      </div>
                      <div className="border h-3"></div>
                      <span className="text-white text-sm">{item.time}</span>
                      <div className="border h-3"></div>
                      <span className="text-white text-sm">{item.year}</span>
                    </div>
                    <div>
                      <ul className="flex gap-3 items-center">
                        <li className="px-2 bg-gray-500 text-white py-[3px] text-xs">
                          Cổ trang{" "}
                        </li>
                        <li className="px-2 bg-gray-500 text-white py-[3px] text-xs">
                          Tiên Hiệp
                        </li>
                        <li className="px-2 bg-gray-500 text-white py-[3px] text-xs">
                          Tu Tiên
                        </li>
                      </ul>
                    </div>
                    <div className="">
                      <span className="text-white text-xs  overflow-hidden line-clamp-6">
                        {item.content}
                      </span>
                    </div>
                    <div className="">
                      <a
                        href=""
                        className="text-green-400 text-sm flex justify-end"
                      >
                        more info {">"}{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewMovieUpdatedSeries;

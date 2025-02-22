import React, { useEffect } from "react";
import Header from "../../../Components/Client/Header/Header";
import TienNghich from "../../../../public/Slider/454973789_1043086304140741_634917588460075684_n.jpg";
import anhbia from "../../../../public/content/anhbiacontent.jpg";

import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa6";
import {
  MdBookmarkAdded,
  MdOutlineIosShare,
  MdOutlineStar,
} from "react-icons/md";
import { RiArrowDownBoxLine, RiVipCrown2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { arrNewMovieUpdatedSeries } from "../../../Util/apiFake";
const DetailMovies = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu khi component mount
  }, []);

  return (
    <div className="" style={{ background: "rgb(17, 19, 25)" }}>
      <Header />
      <div className="flex pl-12 relative">
        <div className="flex-1 " style={{ background: "rgb(17, 19, 25)" }}>
          {" "}
        </div>
        <div
          className=" flex-[3] transition-all duration-1000 ease-in-out   "
          style={{
            backgroundImage: `
            linear-gradient(to right, rgb(17, 19, 25) 35%, rgba(17, 19, 25, 0.6) 40%, transparent 100%), 
            linear-gradient(to top, rgb(17, 19, 25) 10%, rgba(17, 19, 25, 0.6) 15%, transparent 30%), 
            url('/Slider/454973789_1043086304140741_634917588460075684_n.jpg')
          `,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            // backgroundPosition: "center",
            height: "561px",
          }}
        ></div>

        <div className="absolute top-[70px]">
          <div className="text-white flex flex-col gap-3">
            <span className="font-Bricolage font-semibold text-[40px] ">
              Tiên Nghịch
            </span>
            <button className="bg-green-400 w-14   flex justify-center items-center rounded">
              Free
            </button>
            <div className="flex gap-2 items-center   ">
              <div className="flex items-center text-green-400 ">
                {" "}
                <MdOutlineStar /> <span className="text-green-400">9.4</span>
              </div>
              <div className="border h-3"></div>
              <span className="text-white text-sm">T13</span>
              <div className="border h-3"></div>
              <span className="text-white text-sm">2021</span>
            </div>
            <div>
              <ul className="flex gap-3 items-center">
                <li className=" rounded-sm px-2 bg-gray-500 text-white py-[3px] text-xs">
                  Cổ trang{" "}
                </li>
                <li className=" rounded-sm px-2 bg-gray-500 text-white py-[3px] text-xs">
                  Tiên Hiệp
                </li>
                <li className=" rounded-sm px-2 bg-gray-500 text-white py-[3px] text-xs">
                  Tu Tiên
                </li>
              </ul>
            </div>

            {/*  */}

            <div>
              <button
                className="flex gap-1 items-center px-4 py-[7px] rounded font-Vip font-semibold text-black"
                style={{ background: "rgb(242, 191, 131)" }}
              >
                {" "}
                <RiVipCrown2Fill />
                Tháng đầu chỉ với 23,000Đ
              </button>
            </div>
            <div className="w-[40vw]">
              <span> Description:</span>
              <span>
                “Tiên Nghịch” của tác giả Nhĩ Căn, kể về thiếu niên bình phàm
                Vương Lâm xuất thân nông thôn, mang theo nhiệt huyết, tu luyện
                nghịch tiên, không chỉ cầu trường sinh, mà còn muốn thoát khỏi
                thân phận giun dế. Hắn tin rằng đạo do người quyết định, dùng tư
                chất bình phàm bước vào con đường tu chân, trải qua bao phong ba
                bão táp, dựa vào trí tuệ sáng suốt, từng bước một bước lên đỉnh
                cao, dựa vào sức một người, danh chấn Tu chân giới.
              </span>
            </div>

            {/*  */}
            <div className="flex gap-3">
              <Link to={"/play"}>
                <button className="py-1 px-4 bg-green-500 font-Vip  text-lg text-white hover:bg-green-400 cursor-pointer flex items-center gap-2 rounded">
                  <FaPlay /> Play
                </button>
              </Link>
              <button className="py-1 px-4 bg-gray-700 font-Vip  text-lg text-white hover:text-green-400 cursor-pointer flex items-center gap-2 rounded">
                <MdOutlineIosShare /> Share
              </button>
              <button className="py-1 px-4 bg-gray-700 font-Vip  text-lg text-white hover:text-green-400 cursor-pointer flex items-center gap-2 rounded">
                <RiArrowDownBoxLine /> App
              </button>
              <button className="py-1 px-4 bg-gray-700 font-Vip  text-lg text-white hover:text-green-400 cursor-pointer flex items-center gap-2 rounded">
                <MdBookmarkAdded /> Watch Later
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className=" px-12 h-auto flex flex-col gap-5 mt-5"
        style={{ background: "rgb(17, 19, 25)" }}
      >
        <div className="flex justify-between">
          {" "}
          <span className=" font-Bricolage font-semibold text-[25px] text-white  ">
            {" "}
            Phim Đề Cử
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
                        className="w-full h-full object-cover "
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
    </div>
  );
};

export default DetailMovies;

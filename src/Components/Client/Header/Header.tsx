import { MdOutlineWatchLater } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import { RiVipCrown2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { MdBookmarkAdded } from "react-icons/md";
import { TfiAlarmClock } from "react-icons/tfi";
import { FaUserEdit } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaList } from "react-icons/fa";

import "./Header.css";
import { Link, useLocation } from "react-router-dom";
const Header = ({ isScrolled }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredHistory, setIsHoveredHistory] = useState(false);
  const [isHoveredUser, setIsHoveredUser] = useState(false);
  const [isHoveredApp, setIsHoveredApp] = useState(false);
  const userInfo = { name: "Vo Chi Thanh" };
  const location = useLocation();

  return (
    <div
      className={`h-[60px] px-12 flex justify-between text-white sticky top-0 transition-all duration-1000 z-[9999] ${
        location.pathname === "/"
          ? isScrolled
            ? "bg-black"
            : "bg-gradient-to-b from-black to-transparent"
          : "bg-black"
      }`}
    >
      {/* LEFT */}
      <div className=" flex items-center gap-5 h-full font-Vip  ">
        <Link to={"/"}>
          <span className="text-green-500 font-bold text-3xl cursor-pointer">
            CTPlay
          </span>
        </Link>
        <span className="font-semibold text-base cursor-pointer hover:text-green-500">
          Đề xuất{" "}
        </span>
        <span className="font-medium text-base cursor-pointer hover:text-green-500">
          Bạch Nguyệt Phạn Tinh{" "}
        </span>
        <div
          className="flex items-center gap-1  cursor-pointer hover:text-green-500"
          onMouseEnter={() => setIsHovered(true)} // Hover vào để thay đổi state
          onMouseLeave={() => setIsHovered(false)} // Khi rời chuột
        >
          <span className="font-medium text-base relative">Khác </span>
          <div className="text-xs">
            {isHovered ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          </div>
          {isHovered ? (
            <div className="absolute top-[30px] w-[15%]   ">
              <div
                onMouseEnter={() => setIsHovered(true)} // Giữ trạng thái khi chuột trong div con
                onMouseLeave={() => setIsHovered(false)} // Ẩn khi chuột ra ngoài cả cha lẫn con
                className="  w-[100%] mt-9 overflow-y-scroll h-[300px] flex justify-center items-center text-center bg-gray-800 text-gray-400 font-medium"
              >
                <ul className="w-full pt-7">
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim bộ
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim lẻ
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim tình cảm
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim hoạt hình
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim hành động
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim viễn tưởng
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim viễn hay
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim viễn hot
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim viễn hài
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim viễn hay
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim tình cảm
                  </li>
                  <li className="py-2 hover:text-green-500 hover:bg-gray-600 w-full h-full">
                    Phim hoạt hình
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* RIGHT */}

      <div className=" flex items-center gap-5">
        {/*  */}
        <div className="  relative rounded-md shadow-sm z-10">
          <input
            type="text"
            className="rounded-md w-full focus:outline-none focus:ring-0 focus:border-none text-white placeholder-white py-[5px] px-1 pr-14 pl-3"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              border: "none",
            }}
            placeholder="Giọt Mưa Mang Mùi Rỉ Sét"
          />

          <div
            className="absolute top-0 right-0 flex items-center h-full text-white font-bold border-l px-3 cursor-pointer hover:text-green-500"
            style={{
              borderLeft: "2px solid rgba(255, 255, 255, 0.2)", // Sử dụng borderLeft để chỉ định cạnh trái
            }}
          >
            <FaSearch />
          </div>
        </div>
        {/*  */}
        <div
          className="flex flex-col  justify-center items-center cursor-pointer hover:text-green-500"
          onMouseEnter={() => setIsHoveredHistory(true)} // Hover vào để thay đổi state
          onMouseLeave={() => setIsHoveredHistory(false)} // Khi rời chuột
        >
          <div className="text-lg ">
            {" "}
            <MdOutlineWatchLater />
          </div>
          <i className="text-sm">Lịch sử xem </i>
          {isHoveredHistory ? (
            <div className="absolute top-[30px] w-[15%]   ">
              <div
                onMouseEnter={() => setIsHoveredHistory(true)} // Giữ trạng thái khi chuột trong div con
                onMouseLeave={() => setIsHoveredHistory(false)} // Ẩn khi chuột ra ngoài cả cha lẫn con
                className="  w-[100%] mt-9 overflow-y-scroll h-[200px] flex  flex-col gap-5 justify-center items-center text-center 
                bg-gray-800 text-gray-400 font-medium  px-3"
              >
                <span className="text-white text-sm">
                  {" "}
                  Đăng nhập để quản lý lịch sử xem nội dung trên các thiết bị
                  khác nhau.
                </span>
                <button className=" flex justify-center items-center bg-green-500 text-white font-medium px-3 py-1 rounded-lg hover:bg-green-400 ">
                  Đăng nhập{" "}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>{" "}
        {/*  */}
        <div className="flex flex-col   justify-center items-center cursor-pointer hover:text-green-500  ">
          <div className="text-lg ">
            {" "}
            <MdLanguage />
          </div>
          <i className="text-sm">Ngôn ngữ</i>
        </div>
        {/*  */}
        <div
          className="flex flex-col  justify-center items-center  cursor-pointer hover:text-green-500"
          onMouseEnter={() => setIsHoveredUser(true)} // Hover vào để thay đổi state
          onMouseLeave={() => setIsHoveredUser(false)} // Khi rời chuột
        >
          <div className="text-lg ">
            {" "}
            <FaRegUser />
          </div>
          <span className="text-sm">Của tôi </span>
          {isHoveredUser ? (
            <div
              className={`absolute top-[30px] ${
                userInfo ? " w-[20%]" : "  w-[15%]"
              }   `}
            >
              <div
                onMouseEnter={() => setIsHoveredUser(true)} // Giữ trạng thái khi chuột trong div con
                onMouseLeave={() => setIsHoveredUser(false)} // Ẩn khi chuột ra ngoài cả cha lẫn con
                className={` w-[90%] mt-9 overflow-y-scroll ${
                  userInfo
                    ? "h-auto pb-2"
                    : " h-[200px] justify-center  px-3 gap-5"
                } flex  flex-col   items-center text-center 
                bg-gray-800 text-gray-400 font-medium `}
              >
                {!userInfo ? (
                  <>
                    <span className="text-white text-sm">
                      {" "}
                      Đăng nhập để xem được những nội dung mới nhất
                    </span>
                    <button className=" flex justify-center items-center bg-green-500 text-white font-medium px-3 py-1 rounded-lg hover:bg-green-400 ">
                      Đăng nhập{" "}
                    </button>
                  </>
                ) : (
                  <>
                    <div className=" flex justify-center gap-3 items-center text-white bg-green-500 w-full h-[70px] ">
                      <div className="w-10 h-10 overflow-hidden object-contain object-bottom rounded-full ">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRmVYhzeZEEjRRHAK2T3OZgtGVLCnf6zGkzg&s"
                          alt=""
                        />
                      </div>
                      <span>{userInfo.name}</span>
                    </div>
                    <div className="py-1 w-full">
                      {/*  */}
                      <div className="flex items-center justify-between w-full   px-5 py-2 hover:bg-gray-600 hover:text-green-500">
                        <div className="flex items-center gap-2">
                          <MdBookmarkAdded /> <span>Sưu tập của tôi </span>
                        </div>
                        <div className="text-xs">
                          {" "}
                          <FaChevronRight />
                        </div>
                      </div>
                      {/*  */}{" "}
                      <div className="flex items-center justify-between w-full   px-5 py-2 hover:bg-gray-600 hover:text-green-500">
                        <div className="flex items-center gap-2">
                          <TfiAlarmClock /> <span>Phim đặt trước </span>
                        </div>
                        <div className="text-xs">
                          {" "}
                          <FaChevronRight />
                        </div>
                      </div>
                      {/*  */}{" "}
                      <div className="flex items-center justify-between w-full   px-5 py-2 hover:bg-gray-600 hover:text-green-500">
                        <div className="flex items-center gap-2">
                          <FaList /> <span>Bản dịch phụ đề </span>
                        </div>
                        <div className="text-xs">
                          {" "}
                          <FaChevronRight />
                        </div>
                      </div>
                      {/*  */}{" "}
                      <div className="flex items-center justify-between w-full   px-5 py-2 hover:bg-gray-600 hover:text-green-500">
                        <div className="flex items-center gap-2">
                          <FaUserEdit /> <span>Cài đặt cá nhân </span>
                        </div>
                        <div className="text-xs">
                          {" "}
                          <FaChevronRight />
                        </div>
                      </div>
                      {/*  */}{" "}
                      <div className="flex items-center justify-between w-full   px-5 py-2 hover:bg-gray-600 hover:text-green-500">
                        <div className="flex items-center gap-2">
                          <FaSignOutAlt /> <span>Đăng xuất </span>
                        </div>
                        <div className="text-xs">
                          {" "}
                          <FaChevronRight />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/*  */}
        <div
          className="flex items-center gap-2  border border-gray-200 hover:border-green-500 px-4 
        py-2 rounded-md cursor-pointer hover:text-green-500"
          onMouseEnter={() => setIsHoveredApp(true)} // Hover vào để thay đổi state
          onMouseLeave={() => setIsHoveredApp(false)} // Khi rời chuột
        >
          <div className="font-bold   text-xl">
            {" "}
            <HiMiniFolderArrowDown />
          </div>
          <i className="font-medium">App </i>
          {isHoveredApp ? (
            <div className="absolute top-[30px] right-20 w-[15%]   ">
              <div
                onMouseEnter={() => setIsHoveredApp(true)} // Giữ trạng thái khi chuột trong div con
                onMouseLeave={() => setIsHoveredApp(false)} // Ẩn khi chuột ra ngoài cả cha lẫn con
                className="  w-[100%] mt-9 overflow-y-scroll h-[70px] flex  flex-col gap-5 justify-center items-center text-center 
                bg-gray-800 text-gray-400 font-medium  px-3"
              >
                <span className="text-white text-sm">
                  Chức năng đang trong quá trình phát triển
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/*  */}
        <div
          className="flex items-center gap-2  px-4 py-2 rounded-md relative  cursor-pointer"
          style={{
            background: "rgb(242, 191, 131)",
          }}
        >
          <div className="font-bold text-black text-xl">
            {" "}
            <RiVipCrown2Fill />
          </div>
          <span className="font-semibold text-base text-black  font-Vip  ">
            Vip{" "}
          </span>

          <div
            className="absolute right-0 px-1  bg-red-500 flex items-center justify-center"
            style={{
              top: "0", // Canh trên
              transform: "translate(0%, -50%)", // Dịch chuyển để nằm giữa đường viền
              borderRadius: "3px", // Tùy chọn góc bo tròn
            }}
          >
            <span className="text-white text-xs">0.06$/day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

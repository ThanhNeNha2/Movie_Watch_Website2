import TienNghich from "../../../../public/Slider/454973789_1043086304140741_634917588460075684_n.jpg";
import daupha from "../../../../public/content/3d/daupha.jpg";
import thuongnguyen from "../../../../public/content/3d/thuongnguyen.jpg";
import thegioi from "../../../../public/content/3d/thegioi.jpg";
import daula from "../../../../public/content/3d/daula.jpg";
import thanan from "../../../../public/content/3d/thanan.jpg";
import goju from "../../../../public/content/anime/goju.jpg";
import Killua from "../../../../public/content/anime/Killua.jpg";
import failtai from "../../../../public/content/anime/failtai.jpg";
import naruto from "../../../../public/content/anime/naruto.jpg";
import tanjiro from "../../../../public/content/anime/tanjiro.jpg";

import { useState } from "react";
import Header from "../../../Components/Client/Header/Header";
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { FiShare } from "react-icons/fi";
import { MdBookmarkAdded, MdLiveTv, MdOutlineStar } from "react-icons/md";
import { BiDownload } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight, FaListUl, FaPlay } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";
import { LiaThListSolid } from "react-icons/lia";
const Play = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(1); // Bắt đầu với null để không chọn item nào

  const items = [
    { id: 1, title: "Hội Thuật Sư", img: failtai },
    { id: 2, title: "Thanh Gươm Diệt Qủy", img: tanjiro },
    { id: 3, title: "Đấu Phá Thương Khung", img: daupha },
    { id: 4, title: "Thương Nguyên Đồ ", img: thuongnguyen },
    { id: 5, title: "Thế Giới Hoàn Mỹ ", img: thegioi },
    { id: 6, title: "Đấu La Đại Lục", img: daula },
    { id: 7, title: "Thần Ấn Vương Tọa", img: thanan },
    { id: 8, title: "Naruto", img: naruto },
    { id: 9, title: "Chú Thuật Sư", img: goju },
    { id: 10, title: "Hunter x Hunter", img: Killua },
  ];
  // Sử lý video
  const videoUrl =
    "https://vip.opstream12.com/20240924/23748_d8bc5c8d/index.m3u8";
  useEffect(() => {
    if (!videoRef.current) return; // Kiểm tra nếu videoRef chưa gán giá trị

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
    }
  }, []);

  // check thong tin
  const [typeTapOrNoiDung, setTypeTapOrNoiDung] = useState("tap");
  const checkTypeTapOrNoiDung = (type: string) => {
    if (type === "tap") {
      setTypeTapOrNoiDung("tap");
    }
    if (type === "noidung") {
      setTypeTapOrNoiDung("noidung");
    }
  };

  // check kiểu hiển thị các tập phim
  const [typeDisplay, setTypeDisplay] = useState(false);

  const arr = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    name: `Phim ${i + 1}`,
    img: "../../../../public/Slider/454973789_1043086304140741_634917588460075684_n.jpg", // Giả lập ảnh bìa
  }));
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;

  // Lấy danh sách phim theo startIndex
  const displayedItems = arr.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div style={{ background: "rgb(17, 19, 25)" }}>
      <Header />
      <div className="px-[150px] mt-5">
        <div className="flex  h-[553px]">
          {/* TRAI  */}
          <div className="flex-[4]  flex flex-col  ">
            <div className="bg-black h-[503px] overflow-hidden">
              {/* <video ref={videoRef} controls className="w-full h-full"></video> */}
              <video
                src="https://cdn.pixabay.com/video/2021/08/10/84574-586228759_large.mp4"
                controls
              ></video>
            </div>
            <div
              className="h-[50px] text-white px-10 flex justify-between"
              style={{ background: "rgb(26, 28, 34)" }}
            >
              {/* trai */}
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-2 text-base cursor-pointer hover:text-green-400">
                  <div className="text-xl">
                    {" "}
                    <MdBookmarkAdded />
                  </div>
                  <span>Sưu Tập</span>
                </div>
                <div className="flex items-center gap-2 text-base cursor-pointer hover:text-green-400">
                  <div className="text-xl">
                    <FiShare />
                  </div>

                  <span>Chia sẻ</span>
                </div>
              </div>

              {/* phai */}
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-2 text-base cursor-pointer hover:text-green-400">
                  <div className="text-xl">
                    <MdLiveTv />
                  </div>

                  <span>Xem trên tivi</span>
                </div>
                <div className="flex items-center gap-2 text-base cursor-pointer hover:text-green-400">
                  {" "}
                  <div className="text-xl">
                    <BiDownload />{" "}
                  </div>
                  <span>Chiếu ở thiết bị đầu cuối khách hàng </span>
                </div>
              </div>
            </div>
          </div>
          {/* PHAI */}
          <div
            className="flex-[1.2] flex flex-col px-4 py-5 gap-3 text-white"
            style={{ background: "rgb(26, 28, 34)" }}
          >
            {/*  */}
            <div>
              <span className="font-Bricolage font-semibold text-2xl ">
                Tiên Nghịch
              </span>
            </div>
            {/*  */}
            <div className="flex justify-between">
              <button
                className={`flex items-center justify-center py-2 rounded-l gap-2 text-sm flex-1 ${
                  typeTapOrNoiDung === "tap" ? "bg-gray-700" : " bg-gray-800"
                } px-2 hover:text-green-400`}
                onClick={() => checkTypeTapOrNoiDung("tap")}
              >
                {" "}
                <FaPhotoVideo /> Chọn tập
              </button>
              <button
                className={`flex items-center justify-center py-2 rounded-r gap-2 text-sm flex-1 ${
                  typeTapOrNoiDung === "noidung"
                    ? "bg-gray-700"
                    : " bg-gray-800"
                } px-2 hover:text-green-400`}
                onClick={() => checkTypeTapOrNoiDung("noidung")}
              >
                {" "}
                Nội dung đặc sắc
              </button>
            </div>
            {typeTapOrNoiDung === "tap" ? (
              <>
                {/* + */}
                <div className="flex justify-between items-center text-xl ">
                  <span className="text-sm hover:text-white">
                    Chọn tập 1-36{" "}
                  </span>
                  <div
                    className={`hover:text-green-400 cursor-pointer ${
                      typeDisplay ? "text-2xl" : "text-xl"
                    }`}
                    onClick={() => {
                      setTypeDisplay(!typeDisplay);
                    }}
                  >
                    {typeDisplay ? <LiaThListSolid /> : <FaListUl />}
                  </div>
                </div>
                {/* + */}
                <div className="  overflow-y-auto   border-gray-700   custom-scrollbar ">
                  {typeDisplay ? (
                    <ul className="flex flex-col gap-3">
                      {Array.from({ length: 45 }, (_, index) => (
                        <li className="flex   gap-2 items-center hover:bg-gray-800 hover:text-green-400 cursor-pointer">
                          <div className="w-[45%] h-[70px] rounded">
                            <img
                              src={TienNghich}
                              alt=""
                              className="w-full h-full rounded object-cover"
                            />
                          </div>
                          <span>Tiên Nghịch Tập {index + 1}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="flex flex-wrap gap-3 justify-center pb-5 mb-7">
                      {Array.from({ length: 45 }, (_, index) => (
                        <li
                          key={index}
                          className="w-10 h-10 flex justify-center items-center text-lg bg-gray-600 font-Bricolage font-medium text-white hover:text-green-400 cursor-pointer"
                        >
                          {index + 1}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-28 ">
                <span>Nội dung đang cập nhật .... </span>
              </div>
            )}
          </div>
        </div>
        <div className="text-white py-6 flex">
          <div className="flex-[4]">
            <div className="text-white flex flex-col gap-3">
              <span className="font-Bricolage font-semibold text-[30px] ">
                Tiên Nghịch {" > "} <span className="text-2xl">Tập 1</span>
              </span>

              <div className="flex gap-2 items-center   ">
                <div className="flex items-center text-green-400 ">
                  {" "}
                  <MdOutlineStar /> <span className="text-green-400">9.4</span>
                </div>
                <span> {" (18.9k người đã đánh giá )"}</span>
              </div>
              <div className="flex gap-3">
                <span>Thể loại :</span>
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
              <div className="flex gap-3">
                <span>Diễn viên :</span>
                <ul className="flex gap-3 items-center">
                  <li className=" rounded-sm px-2 bg-gray-500 text-white py-[3px] text-xs">
                    Trịnh Trần Phương Tuấn
                  </li>
                  <li className=" rounded-sm px-2 bg-gray-500 text-white py-[3px] text-xs">
                    Trịnh Trần Phương Tuấn
                  </li>
                  <li className=" rounded-sm px-2 bg-gray-500 text-white py-[3px] text-xs">
                    Trịnh Trần Phương Tuấn
                  </li>
                </ul>
              </div>

              {/*  */}

              <div className="w-[40vw]">
                <span> Description: </span>
                <span>
                  “Tiên Nghịch” của tác giả Nhĩ Căn, kể về thiếu niên bình phàm
                  Vương Lâm xuất thân nông thôn, mang theo nhiệt huyết, tu luyện
                  nghịch tiên, không chỉ cầu trường sinh, mà còn muốn thoát khỏi
                  thân phận giun dế. Hắn tin rằng đạo do người quyết định, dùng
                  tư chất bình phàm bước vào con đường tu chân, trải qua bao
                  phong ba bão táp, dựa vào trí tuệ sáng suốt, từng bước một
                  bước lên đỉnh cao, dựa vào sức một người, danh chấn Tu chân
                  giới.
                </span>
              </div>
            </div>
            {/* cái gạch */}
            <div className="border-[0.01px] border-gray-500 mt-7 mr-10"></div>
            {/* danh sach phim de cu   */}
            <div className="flex flex-col mt-10">
              <div className="flex justify-between">
                {" "}
                <span className=" font-Bricolage font-semibold text-[25px] text-white  ">
                  Gợi ý phim
                </span>
              </div>
              <div className="flex items-center  mt-5">
                {/* Nút Trái */}
                <div
                  className={`text-2xl cursor-pointer hover:text-gray-400 ${
                    startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() =>
                    setStartIndex((prev) => Math.max(0, prev - itemsPerPage))
                  }
                >
                  <FaAngleLeft />
                </div>
                {/* Danh sách phim */}
                <div className="flex gap-4 justify-around">
                  {displayedItems.map((item) => (
                    <div
                      key={item.id}
                      className="  group w-[calc(96%/6-12px)] overflow-visible cursor-pointer mb-10"
                    >
                      {/* Thumbnail */}
                      <div className="h-[200px] rounded-md relative group ">
                        <div className="absolute bg-green-400 right-0 px-3 overflow-hidden rounded  z-30">
                          <span className="font-Vip text-white">Free</span>
                        </div>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover transition rounded-md duration-300 transform group-hover:scale-105"
                        />
                        <div className="absolute bottom-2 left-2 z-50  text-xs">
                          24 tập
                        </div>
                        <div
                          className="absolute top-1/2 left-1/2 z-50 rounded-full w-10 h-10 bg-green-400 
                        flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2 text-sm opacity-0 group-hover:opacity-100"
                        >
                          <FaPlay />
                        </div>
                      </div>

                      {/* Tên phim */}
                      <div className="mt-2">
                        <span className="text-white group-hover:text-green-400">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nút Phải */}
                <div
                  className={`text-2xl cursor-pointer hover:text-gray-400 ${
                    startIndex + itemsPerPage >= arr.length
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() =>
                    setStartIndex((prev) =>
                      Math.min(arr.length - itemsPerPage, prev + itemsPerPage)
                    )
                  }
                >
                  <FaAngleRight />
                </div>
              </div>
            </div>
            {/* cái gạch */}
            <div className="border-[0.01px] border-gray-500 mt-7 mr-10"></div>
            <div></div>
          </div>
          <div className="flex-[1.2] flex flex-col gap-4">
            <div>
              <span className="font-Bricolage text-xl font-bold">
                Bảng Xếp Hạng
              </span>
            </div>
            <div className="flex flex-col">
              <div onMouseLeave={() => setActive(1)}>
                {" "}
                {/* Reset khi rời khỏi danh sách */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col gap-2 px-3 py-3 rounded transition ${
                      active === item.id ? "bg-gray-800" : "bg-transparent"
                    }`}
                    onMouseEnter={() => setActive(item.id)} // Khi hover vào, set trạng thái active
                  >
                    <div className="flex gap-3 font-Bricolage">
                      <span className="text-green-400 font-bold">
                        {item.id}
                      </span>
                      <span>{item.title}</span>
                    </div>
                    {active === item.id && (
                      <div className="pl-10">
                        <img
                          src={item.img}
                          alt=""
                          className="w-[100px] h-[150px] object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;

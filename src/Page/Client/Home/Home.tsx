import React, { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
import { Link } from "react-router-dom";
import Header from "../../../Components/Client/Header/Header";
import Content from "../../../Components/Client/Content/Content";
import NewMovieUpdated from "../../../Components/Client/NewMovieUpdated/NewMovieUpdated";
import NewMovieUpdatedSeries from "../../../Components/Client/NewMovieUpdatedSeries/NewMovieUpdatedSeries";
import Flooter from "../../../Components/Client/Flooter/Flooter";
import Search from "../../../Components/Client/Search/Search";

// Định nghĩa interface cho dữ liệu phim
interface Category {
  name: string;
}

interface Movie {
  title: string;
  originalTitle: string;
  director: string[];
  category: string[];
  country: string[];
  year: number;
  duration: string;
  quality: string;
  language: string;
  actors: string[];
  description: string;
  trailerUrl: string;
  tmdbId: string;
  imdbId: string;
  poster_url?: string;
  viewCount: number;
  slug: string;
  rank?: string[];
  evaluate?: [number, number, string];
  kindPhim?: string[];
}

const movies: Movie[] = [
  {
    title: "Nửa Ngọt Nửa Đắng 2",
    originalTitle: "Semi-Soeter",
    director: ["Joshua Rous"],
    category: ["Hài Hước"],
    country: ["Quốc Gia Khác"],
    year: 2025,
    duration: "92 Phút",
    quality: "HD",
    poster_url: "/Slider/sbvUy2Cn0jFd1H0kaBcNeIL03Iv.webp",
    language: "Vietsub",
    actors: [
      "Anel Alexander",
      "Nico Panagio",
      "Sandra Vaughn",
      "Louw Venter",
      "Diaan Lawrenson",
      "Neels Van Jaarsveld",
      "Hélène Truter",
      "Corine du Toit",
      "Pulane Sekepe",
      "Pierre van Pletzen",
    ],
    description:
      "Cặp đôi quyền lực Jaci và JP bỗng rơi vào thế khó khi dự án thuyết trình mới cho một thương hiệu trẻ em buộc họ phải vào vai những ông bố bà mẹ hoàn hảo.",
    trailerUrl: "https://www.youtube.com/watch?v=vCir0XLyoBw",
    tmdbId: "1428264",
    imdbId: "tt10727696",
    viewCount: 50,
    slug: "https://ophim17.cc/phim/nua-ngot-nua-dang-2",
  },
  {
    title: "Yadang: Ba Mặt Lật Kèo",
    originalTitle: "Yadang: The",
    director: ["황병국"],
    category: ["Hình Sự"],
    country: ["Hàn Quốc"],
    year: 2025,
    duration: "123 Phút",
    quality: "FHD",
    poster_url: "/Slider/Yadang.webp",
    language: "Vietsub",
    actors: [
      "강하늘",
      "유해진",
      "박해준",
      "류경수",
      "채원빈",
      "유성주",
      "김금순",
      "임성균",
      "조완기",
      "곽자형",
    ],
    description:
      "Trong giới tội phạm ma túy, những người cung cấp thông tin 'Ya-Dang' bán thông tin, tội phạm sử dụng thông tin này để giảm án, cơ quan pháp luật sử dụng thông tin này để bắt giữ. Ya-Dang, cảnh sát và công tố viên tạo thành một tam giác đặc biệt.",
    trailerUrl: "",
    tmdbId: "1137179",
    imdbId: "",
    viewCount: 828,
    slug: "https://ophim17.cc/phim/yadang-ba-mat-lat-keo",
  },
  {
    title: "Lưỡi hái tử thần 6: Huyết thống",
    originalTitle: "Final Destination Bloodlines",
    director: ["Adam B. Stein", "Zach Lipovsky"],
    category: ["Kinh Dị", "Bí ẩn"],
    country: ["Âu Mỹ"],
    poster_url: "/Slider/luoihai.webp",
    year: 2025,
    duration: "110 Phút",
    quality: "FHD",
    language: "Vietsub",
    actors: [
      "Kaitlyn Santa Juana",
      "Teo Briones",
      "Rya Kihlstedt",
      "Richard Harmon",
      "Owen Patrick Joyner",
      "Anna Lore",
      "Brec Bassinger",
      "Tony Todd",
      "Andrew Tinpo Lee",
      "Gabrielle Rose",
    ],
    description:
      "Thương hiệu kinh dị đình đám Hollywood Final Destination sẽ trở lại với phần phim mới, hứa hẹn khuấy đảo phòng vé mùa hè 2025. Final Destination: Bloodlines là phần thứ 6 trong series, và cho đến hiện tại, các thông tin về nội dung phần phim này vẫn đang được giữ kín.",
    trailerUrl: "https://www.youtube.com/watch?v=KnWzz0n60pE",
    tmdbId: "574475",
    imdbId: "tt9619824",
    viewCount: 796,
    slug: "https://ophim17.cc/phim/luoi-hai-tu-than-huyet-thong",
  },
];

const Home: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [valuePhim, setValuePhim] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Ánh xạ dữ liệu để phù hợp với giao diện
  const listPhim: Movie[] = movies.map((movie, index) => ({
    ...movie,
    rank: [
      `Top ${index + 1}`,
      "Top Bảng Xếp Hạng",
      "CTPlay Sản Xuất",
      "Chỉ Có Trên CTPlay",
    ],
    evaluate: [
      8.0 + index * 0.5, // Giả lập điểm đánh giá
      movie.year,
      "??/??", // Giả lập số tập
    ],
    kindPhim: movie.category,
  }));

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMove = (type: string) => {
    if (type === "increase") {
      setValuePhim((prev) => (prev + 1) % listPhim.length);
    }
    if (type === "reduce") {
      setValuePhim((prev) => (prev - 1 + listPhim.length) % listPhim.length);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValuePhim((prev) => (prev + 1) % listPhim.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [listPhim]);

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
      <div
        className="h-[951px] transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${
            listPhim[valuePhim].poster_url || "/fallback-image.jpg"
          })`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {!isScrolled && <Header isScrolled={isScrolled} />}
        <div className="relative flex justify-between items-center h-screen px-4 text-white">
          <div
            className="bg-gray-500 p-3 rounded-full cursor-pointer"
            onClick={() => handleMove("reduce")}
          >
            <FaChevronLeft />
          </div>
          <div
            className="bg-gray-500 p-3 rounded-full cursor-pointer"
            onClick={() => handleMove("increase")}
          >
            <FaChevronRight />
          </div>
          <div
            className={`absolute ${
              listPhim[valuePhim].title === "Nửa Ngọt Nửa Đắng 2"
                ? isExpanded
                  ? "bottom-20"
                  : "bottom-1/4"
                : "bottom-1/4"
            } left-24 bg-gray-500 bg-opacity-35 p-4 flex flex-col gap-2 rounded-md w-[40%]`}
          >
            <span className="font-Bricolage font-medium text-[45px]">
              {listPhim[valuePhim].title}
            </span>
            <div className="flex gap-2">
              {listPhim[valuePhim].rank?.map((item, index) => (
                <span
                  key={index}
                  className={`${
                    item === "Top Bảng Xếp Hạng"
                      ? "bg-gray-500"
                      : "bg-green-500"
                  } font-semibold px-2 rounded-sm`}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-green-500 font-semibold">
                <IoStar />
                <span>{listPhim[valuePhim].evaluate?.[0]}</span>
              </div>
              <span>{listPhim[valuePhim].evaluate?.[1]}</span>
              <span>Số tập {listPhim[valuePhim].evaluate?.[2]}</span>
            </div>
            <div className="flex gap-2">
              {listPhim[valuePhim].kindPhim?.map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-400 bg-opacity-50 px-1 rounded-sm"
                >
                  {item}
                </span>
              ))}
            </div>
            <div>
              <span>
                {isExpanded
                  ? listPhim[valuePhim].description ||
                    "Chưa có mô tả cho phim này."
                  : `${(
                      listPhim[valuePhim].description ||
                      "Chưa có mô tả cho phim này."
                    ).slice(0, 120)}...`}
              </span>
              <button
                onClick={toggleContent}
                className="ml-2 text-blue-500 hover:underline"
              >
                {isExpanded ? "Thu gọn" : "Xem thêm"}
              </button>
            </div>
            <div className="flex gap-2 items-center h-14 overflow-hidden">
              <Link to={`/play/${listPhim[valuePhim].slug.split("/").pop()}`}>
                <div className="h-12 w-12 bg-green-500 rounded-full flex justify-center items-center text-center text-lg cursor-pointer hover:bg-green-400">
                  <FaPlay />
                </div>
              </Link>
              <div className="h-12 w-12 bg-gray-300 rounded-full flex justify-center items-center text-center text-xl text-black cursor-pointer hover:bg-gray-500 hover:text-gray-200">
                <MdBookmarkAdded />
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default Home;

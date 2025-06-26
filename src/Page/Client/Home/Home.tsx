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
    title: "Câu Chuyện Trên Đỉnh Núi",
    originalTitle: "Mountainhead",
    director: ["Jesse Armstrong"],
    category: ["Hài Hước", "Chính kịch"],
    country: ["Âu Mỹ"],
    year: 2025,
    duration: "105 Phút",
    quality: "HD",
    poster_url:
      "https://img.ophim.live/uploads/movies/cau-chuyen-tren-dinh-nui-poster.jpg",
    language: "Vietsub",
    actors: [
      "Steve Carell",
      "Jason Schwartzman",
      "Cory Michael Smith",
      "Ramy Youssef",
      "Daniel Oreskes",
      "Hadley Robinson",
      "David Thompson",
      "Ali Kinkade",
      "Ava Kostia",
      "Alex Peña",
    ],
    description:
      "Một nhóm bạn tỷ phú tụ họp lại trong bối cảnh cuộc khủng hoảng quốc tế đang diễn ra.",
    trailerUrl: "https://www.youtube.com/watch?v=27cN2_k0JF0",
    tmdbId: "1417059",
    imdbId: "tt35396529",
    viewCount: 0,
    slug: "https://ophim17.cc/phim/cau-chuyen-tren-dinh-nui",
  },
  {
    title: "Bảy Di Vật Tà Ám",
    originalTitle: "The Seven Relics of ill Omen",
    director: ["Tsai Yueh-Hsun"],
    category: ["Hành Động", "Viễn Tưởng", "Phiêu Lưu", "Khoa Học"],
    country: ["Trung Quốc"],
    year: 2025,
    duration: "45 phút/tập",
    quality: "HD",
    poster_url:
      "https://img.ophim.live/uploads/movies/bay-di-vat-ta-am-poster.jpg",
    language: "Vietsub",
    actors: ["宋威龙", "刘浩存", "敖瑞鵬", "王奕婷", "Zhang Yichi"],
    description:
      'Cải biên từ nguyên tác "Thất Căn Hung Giản" của Vỹ Ngư. Thời thượng cổ, một vật chất bí ẩn không rõ nguồn gốc xuất hiện ở Phượng Tử Lĩnh, có khả năng ký sinh lên cơ thể người, thay đổi tâm trí và dụ dẫn con người làm điều ác. Giờ đây, "Tâm Giản" tái xuất hiện, kéo theo hàng loạt vụ án kỳ lạ. Mộc Đại, La Nhận, Nhất Vạn Tam, Viêm Hồng Sa và Tào Nghiêm Hoa – năm bạn trẻ bình thường nhưng nhiệt huyết – vì những tình huống bất ngờ trong cuộc đời, họ lần lượt vướng vào sự kiện liên quan đến Tâm Giản. Họ cùng nhau thành lập đội Phượng Hoàng, bắt đầu hành trình thu phục hung giản đầy mạo hiểm...',
    trailerUrl: "https://www.youtube.com/watch?v=RH-9VXg9k7E",
    tmdbId: "290054",
    imdbId: "tt31721010",
    viewCount: 1331,
    slug: "https://ophim17.cc/phim/bay-di-vat-ta-am",
  },

  {
    title: "Dư Tẫn Hành Giả",
    originalTitle: "Embers",
    director: ["OPhim.Live"],
    category: ["Hành Động", "Phiêu Lưu"],
    country: ["Trung Quốc"],
    year: 2025,
    duration: "22 phút/tập",
    quality: "HD",
    poster_url:
      "https://img.ophim.live/uploads/movies/du-tan-hanh-gia-poster.jpg",
    language: "Vietsub",
    actors: [],
    description:
      "Đoan Mộc Dạ Vũ, thiếu niên mang ước mơ trở thành thợ săn địa ngục, vô tình cứu một người máy cải tạo và lấy đi vật dụng quan trọng trong nhiệm vụ tuyệt mật. Hành động vô ý ấy châm ngòi cho cuộc truy lùng quy mô lớn của phe phản diện, đẩy thành Dư Tẫn vào cuộc chiến sinh tử khởi nguồn từ lòng tốt ngây thơ của một cậu bé.",
    trailerUrl: "",
    tmdbId: "289273",
    imdbId: "",
    viewCount: 119,
    slug: "https://ophim17.cc/phim/du-tan-hanh-gia",
  },
  {
    title: "Nửa Ngọt Nửa Đắng 2",
    originalTitle: "Semi-Soeter",
    director: ["Joshua Rous"],
    category: ["Hài Hước"],
    country: ["Quốc Gia Khác"],
    year: 2025,
    duration: "92 Phút",
    quality: "HD",
    poster_url:
      "https://img.ophim.live/uploads/movies/nua-ngot-nua-dang-2-poster.jpg",
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
    title: "Tội Ác Ngủ Say",
    originalTitle: "Before I Go to Sleep",
    director: ["Rowan Joffe"],
    category: ["Bí ẩn"],
    country: ["Âu Mỹ", "Anh", "Pháp", "Thụy Điển"],
    year: 2014,
    duration: "92 Phút",
    quality: "HD",
    poster_url:
      "https://img.ophim.live/uploads/movies/toi-ac-ngu-say-poster.jpg",
    language: "Vietsub",
    actors: [
      "Nicole Kidman",
      "Colin Firth",
      "Mark Strong",
      "Ben Crompton",
      "Anne-Marie Duff",
      "Adam Levy",
      "Gabriel Strong",
      "Flynn MacArthur",
      "Dean-Charles Chapman",
      "Jing Lusi",
    ],
    description:
      "Ben Lucas và bác sĩ Nash đều tìm cách giúp đỡ vợ Ben lấy lại ký ức nhưng thực chất cả hai người này đều đang giấu giếm nhiều.",
    trailerUrl: "https://www.youtube.com/watch?v=L6ckwpaFbBM",
    tmdbId: "204922",
    imdbId: "tt1726592",
    viewCount: 101,
    slug: "https://ophim17.cc/phim/toi-ac-ngu-say",
  },

  {
    title: "Good Boy",
    originalTitle: "Good Boy",
    director: [""],
    category: ["Hành Động", "Hài Hước", "Hình Sự", "Phiêu Lưu", "Chính kịch"],
    country: ["Hàn Quốc"],
    year: 2025,
    duration: "45 phút/tập",
    quality: "HD",
    poster_url: "https://img.ophim.live/uploads/movies/good-boy-poster.jpg",
    language: "Vietsub",
    actors: [
      "박보검",
      "김소현",
      "오정세",
      "이상이",
      "허성태",
      "태원석",
      "서현철",
      "정만식",
      "박철민",
      "서정연",
    ],
    description:
      "Những người đoạt huy chương Olympic gia nhập lực lượng cảnh sát thông qua chương trình tuyển dụng đặc biệt, đổi huy chương lấy huy hiệu khi họ giải quyết tội phạm bạo lực và bất công bằng kỹ năng thể thao của mình.",
    trailerUrl: "",
    tmdbId: "231280",
    imdbId: "tt32361930",
    viewCount: 3503,
    slug: "https://ophim17.cc/phim/good-boy",
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

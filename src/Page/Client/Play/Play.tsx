import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Hls from "hls.js";
import { FiShare } from "react-icons/fi";
import { MdBookmarkAdded, MdLiveTv, MdOutlineStar } from "react-icons/md";
import { BiDownload } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight, FaListUl, FaPlay } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";
import { LiaThListSolid } from "react-icons/lia";

import Header from "../../../Components/Client/Header/Header";

// Define interfaces
interface Category {
  id?: string;
  name: string;
  slug?: string;
}

interface Country {
  id?: string;
  name: string;
  slug?: string;
}

interface Episode {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

interface Server {
  server_name: string;
  server_data: Episode[];
}

interface Tmdb {
  vote_average?: number;
}

interface Imdb {
  vote_average?: number;
}

interface Movie {
  _id?: string;
  name: string;
  slug: string;
  origin_name?: string;
  content?: string;
  year?: number;
  category?: Category[];
  country?: Country[];
  poster_url?: string;
  thumb_url?: string;
  sub_docquyen?: boolean;
  time?: string;
  episode_total?: string;
  episode_current?: string;
  actor?: string[];
  director?: string[];
  status?: string;
  quality?: string;
  lang?: string;
  episodes?: Server[];
  tmdb?: Tmdb;
  imdb?: Imdb;
}

interface NewMovie {
  _id?: string;
  name: string;
  slug: string;
  thumb_url: string;
  episode_current?: string;
}

interface ApiResponse {
  pageProps: {
    data: {
      item: Movie;
    };
  };
}

interface NewMoviesApiResponse {
  status: string;
  data: {
    items: NewMovie[];
    APP_DOMAIN_CDN_IMAGE: string;
  };
}

const Play: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { movieName } = useParams<{ movieName?: string }>();
  const navigate = useNavigate();
  const [active, setActive] = useState<number>(1);
  const [typeTapOrNoiDung, setTypeTapOrNoiDung] = useState<"tap" | "noidung">(
    "tap"
  );
  const [typeDisplay, setTypeDisplay] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const itemsPerPage = 6;

  // Resolve image URLs
  const IMAGE_BASE_URL = "https://img.ophim.live/uploads/movies/";
  const resolveImageUrl = (url?: string): string => {
    if (!url) return "/fallback-image.jpg";
    if (url.startsWith("http")) return url;
    return IMAGE_BASE_URL + url;
  };

  // Fetch movie data from API
  const fetchMovie = async (): Promise<Movie> => {
    if (!movieName) throw new Error("Movie name is required");
    const response = await axios.get<ApiResponse>(
      `http://localhost:8080/api/movie/${movieName}`
    );
    console.log("Movie API Response:", response.data);
    return response.data.pageProps.data.item;
  };

  const {
    data: movie,
    isLoading: isMovieLoading,
    error: movieError,
  } = useQuery({
    queryKey: ["movie", movieName],
    queryFn: fetchMovie,
    enabled: !!movieName,
  });

  // Fetch new movies for "Phim Đề Cử"
  const fetchNewMovies = async (): Promise<NewMovie[]> => {
    const response = await axios.get<NewMoviesApiResponse>(
      `https://ophim1.com/v1/api/danh-sach/phim-vietsub?page=1&sort_field=&category=${
        movie?.category?.[0]?.slug || "hinh-su"
      }&country=&year=`
    );
    console.log("New Movies API Response:", response.data);
    return response.data.data.items;
  };

  const {
    data: newMovies,
    isLoading: isNewMoviesLoading,
    error: newMoviesError,
  } = useQuery({
    queryKey: ["GoiY", movie?.category?.[0]?.slug],
    queryFn: fetchNewMovies,
    enabled: !!movie,
  });

  // Handle video playback
  const playEpisode = (link_m3u8: string, episodeSlug: string) => {
    if (!videoRef.current || !link_m3u8) return;

    setSelectedEpisode(episodeSlug);
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(link_m3u8);
      hls.attachMedia(video);
      video.play().catch((error) => console.error("Video play failed:", error));
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = link_m3u8;
      video.play().catch((error) => console.error("Video play failed:", error));
    }
  };

  // Auto-play first episode when movie data is loaded
  useEffect(() => {
    if (movie?.episodes?.[0]?.server_data?.[0]?.link_m3u8) {
      const firstEpisode = movie.episodes[0].server_data[0];
      setSelectedEpisode(firstEpisode.slug);
      playEpisode(firstEpisode.link_m3u8, firstEpisode.slug);
    }
  }, [movie]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const checkTypeTapOrNoiDung = (type: "tap" | "noidung") => {
    setTypeTapOrNoiDung(type);
  };

  if (isMovieLoading || isNewMoviesLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="text-white ml-3 text-lg font-medium">Đang tải...</span>
      </div>
    );
  }

  if (movieError || !movie || newMoviesError) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-red-200 mx-4">
        <div className="flex items-center">
          <div className="text-red-400 mr-3 text-xl">⚠️</div>
          <div>
            <h3 className="font-semibold text-lg">Lỗi tải dữ liệu</h3>
            <p className="text-red-300 mt-1">
              {movieError
                ? `Lỗi phim: ${
                    movieError instanceof Error
                      ? movieError.message
                      : "Unknown error"
                  }`
                : newMoviesError
                ? `Lỗi gợi ý: ${
                    newMoviesError instanceof Error
                      ? newMoviesError.message
                      : "Unknown error"
                  }`
                : "Không tìm thấy dữ liệu."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Map movie data
  const movieTitle = movie.name || movie.origin_name || "Không có tiêu đề";
  const movieDescription = movie.content || "Chưa có mô tả cho phim này.";
  const movieCategories = movie.category || [];
  const movieVoteAverage =
    movie.tmdb?.vote_average || movie.imdb?.vote_average || 0;
  const movieActors = movie.actor || [];
  const movieEpisodeTotal = movie.episode_total || "N/A";
  const episodes = movie?.episodes?.[0]?.server_data || [];

  return (
    <div style={{ background: "rgb(17, 19, 25)" }}>
      <Header />
      <div className="px-[150px] mt-5">
        <div className="flex h-[553px]">
          {/* Left: Video Player */}
          <div className="flex-[4] flex flex-col">
            <div className="bg-black h-[503px] overflow-hidden">
              <video ref={videoRef} controls className="w-full h-full"></video>
            </div>
            <div
              className="h-[50px] text-white px-10 flex justify-between"
              style={{ background: "rgb(26, 28, 34)" }}
            >
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-2 text-base cursor-pointer hover:text-green-400">
                  <div className="text-xl">
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
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-2 text-base cursor-pointer hover:text-green-400">
                  <div className="text-xl">
                    <MdLiveTv />
                  </div>
                  <span>Xem trên tivi</span>
                </div>
                <div className="flex items-center gap-2 text-base cursor-pointer hover:text-green-400">
                  <div className="text-xl">
                    <BiDownload />
                  </div>
                  <span>Chiếu ở thiết bị đầu cuối khách hàng</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Episode Selection */}
          <div
            className="flex-[1.2] flex flex-col px-4 py-5 gap-3 text-white"
            style={{ background: "rgb(26, 28, 34)" }}
          >
            <div>
              <span className="font-Bricolage font-semibold text-2xl">
                {movieTitle}
              </span>
            </div>
            <div className="flex justify-between">
              <button
                className={`flex items-center justify-center py-2 rounded-l gap-2 text-sm flex-1 ${
                  typeTapOrNoiDung === "tap" ? "bg-gray-700" : "bg-gray-800"
                } px-2 hover:text-green-400`}
                onClick={() => checkTypeTapOrNoiDung("tap")}
              >
                <FaPhotoVideo /> Chọn tập
              </button>
              <button
                className={`flex items-center justify-center py-2 rounded-r gap-2 text-sm flex-1 ${
                  typeTapOrNoiDung === "noidung" ? "bg-gray-700" : "bg-gray-800"
                } px-2 hover:text-green-400`}
                onClick={() => checkTypeTapOrNoiDung("noidung")}
              >
                Nội dung đặc sắc
              </button>
            </div>
            {typeTapOrNoiDung === "tap" ? (
              <>
                <div className="flex justify-between items-center text-xl">
                  <span className="text-sm hover:text-white">
                    Chọn tập 1-{movieEpisodeTotal}
                  </span>
                  <div
                    className={`hover:text-green-400 cursor-pointer ${
                      typeDisplay ? "text-2xl" : "text-xl"
                    }`}
                    onClick={() => setTypeDisplay(!typeDisplay)}
                  >
                    {typeDisplay ? <LiaThListSolid /> : <FaListUl />}
                  </div>
                </div>
                <div className="overflow-y-auto border-gray-700 custom-scrollbar">
                  {typeDisplay ? (
                    <ul className="flex flex-col gap-3">
                      {episodes.map((episode) => (
                        <li
                          key={episode.slug}
                          className={`flex gap-2 items-center hover:bg-gray-800 hover:text-green-400 cursor-pointer ${
                            selectedEpisode === episode.slug
                              ? "bg-gray-800 text-green-400"
                              : ""
                          }`}
                          onClick={() => {
                            if (videoRef.current && episode.link_m3u8) {
                              playEpisode(episode.link_m3u8, episode.slug);
                            }
                          }}
                        >
                          <div className="w-[45%] h-[70px] rounded">
                            <img
                              src={resolveImageUrl(movie.thumb_url)}
                              alt=""
                              className="w-full h-full rounded object-cover"
                            />
                          </div>
                          <span>
                            {movieTitle}{" "}
                            {episode.name === "Full"
                              ? "Full"
                              : `Tập ${episode.name}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="flex flex-wrap gap-3 justify-center pb-5 mb-7">
                      {episodes.map((episode) => (
                        <li
                          key={episode.slug}
                          className={`w-10 h-10 flex justify-center items-center text-lg font-Bricolage font-medium text-white hover:text-green-400 cursor-pointer ${
                            selectedEpisode === episode.slug
                              ? "bg-gray-800 text-green-400"
                              : "bg-gray-600"
                          }`}
                          onClick={() => {
                            if (videoRef.current && episode.link_m3u8) {
                              playEpisode(episode.link_m3u8, episode.slug);
                            }
                          }}
                        >
                          {episode.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-28">
                <span>Nội dung đang cập nhật ....</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-white py-6 flex">
          <div className="flex-[4]">
            <div className="text-white flex flex-col gap-3">
              <span className="font-Bricolage font-semibold text-[30px]">
                {movieTitle} {" > "}{" "}
                <span className="text-2xl">
                  {selectedEpisode
                    ? episodes.find((e) => e.slug === selectedEpisode)?.name ===
                      "Full"
                      ? "Full"
                      : `Tập ${
                          episodes.find((e) => e.slug === selectedEpisode)?.name
                        }`
                    : episodes[0]?.name || "1"}
                </span>
              </span>
              <div className="flex gap-2 items-center">
                <div className="flex items-center text-green-400">
                  <MdOutlineStar />
                  <span className="text-green-400">
                    {movieVoteAverage.toFixed(1) || "N/A"}
                  </span>
                </div>
                <span> ( Đang cập nhật lượng người đã đánh giá )</span>
              </div>
              <div className="flex gap-3">
                <span>Thể loại:</span>
                <ul className="flex gap-3 items-center">
                  {movieCategories.map((cat, index) => (
                    <li
                      key={cat.id || index}
                      className="rounded-sm px-2 bg-gray-500 text-white py-[3px] text-xs"
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap items-start gap-3">
                <span className="font-semibold text-sm text-white mt-[3px]">
                  Diễn viên:
                </span>
                <ul className="flex flex-wrap gap-2">
                  {movieActors.map((actor, index) => (
                    <li
                      key={index}
                      className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-full hover:bg-indigo-700 transition duration-200 shadow-sm"
                    >
                      {actor}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full pr-10">
                <span>Description:</span>
                <span dangerouslySetInnerHTML={{ __html: movieDescription }} />
              </div>
            </div>
            <div className="border-[0.01px] border-gray-500 mt-7 mr-10"></div>
            <div className="flex flex-col mt-10">
              <div className="flex justify-between">
                <span className="font-Bricolage font-semibold text-[25px] text-white">
                  Gợi ý phim
                </span>
              </div>
              <div className="flex items-center justify-between mt-5 w-[95%]">
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
                <div className="flex gap-4 justify-around w-[90%]">
                  {newMovies
                    ?.slice(startIndex, startIndex + itemsPerPage)
                    .map((item, index) => (
                      <div
                        key={item._id || index}
                        className="group w-[calc(99%/6-12px)] overflow-visible cursor-pointer mb bunny-10"
                        onClick={() => navigate(`/detailmovies/${item.slug}`)}
                      >
                        <div className="h-[200px] rounded-md relative group">
                          <div className="absolute bg-green-400 right-0 px-3 overflow-hidden rounded z-30">
                            <span className="font-Vip text-white">Free</span>
                          </div>
                          <img
                            src={`https://img.ophim.live/uploads/movies/${item.thumb_url}`}
                            alt={item.name}
                            className="w-full h-full object-cover transition rounded-md duration-300 transform group-hover:scale-105"
                          />
                          <div className="absolute bottom-2 left-2 z-50 text-xs">
                            {item.episode_current || "N/A"}
                          </div>
                          <div className="absolute top-1/2 left-1/2 z-50 rounded-full w-10 h-10 bg-green-400 flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2 text-sm opacity-0 group-hover:opacity-100">
                            <FaPlay />
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-white group-hover:text-green-400">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
                <div
                  className={`text-2xl cursor-pointer hover:text-gray-400 ${
                    startIndex + itemsPerPage >= newMovies?.length
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() =>
                    setStartIndex((prev) =>
                      Math.min(
                        newMovies?.length - itemsPerPage || 0,
                        prev + itemsPerPage
                      )
                    )
                  }
                >
                  <FaAngleRight />
                </div>
              </div>
            </div>
            <div className="border-[0.01px] border-gray-500 mt-7 mr-10"></div>
          </div>
          <div className="flex-[1.2] flex flex-col gap-4">
            <div>
              <span className="font-Bricolage text-xl font-bold">
                Bảng Xếp Hạng
              </span>
            </div>
            <div className="flex flex-col">
              <div onMouseLeave={() => setActive(1)}>
                {newMovies?.slice(0, 10).map((item, index) => (
                  <div
                    key={item._id || index}
                    className={`flex flex-col gap-2 px-3 py-3 rounded transition ${
                      active === index + 1 ? "bg-gray-800" : "bg-transparent"
                    }`}
                    onMouseEnter={() => setActive(index + 1)}
                  >
                    <div className="flex gap-3 font-Bricolage">
                      <span className="text-green-400 font-bold">
                        {index + 1}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    {active === index + 1 && (
                      <div className="pl-10">
                        <img
                          src={`https://img.ophim.live/uploads/movies/${item.thumb_url}`}
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

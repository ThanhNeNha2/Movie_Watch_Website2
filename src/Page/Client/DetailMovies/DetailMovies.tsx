import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import {
  MdBookmarkAdded,
  MdOutlineIosShare,
  MdOutlineStar,
} from "react-icons/md";
import { RiArrowDownBoxLine, RiVipCrown2Fill } from "react-icons/ri";
import Header from "../../../Components/Client/Header/Header";

// Define interfaces for the API response
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

interface Movie {
  _id?: string;
  name: string;
  slug: string;
  origin_name?: string;
  content?: string;
  year?: number;
  category?: Category[];
  country?: Country[];
  vote_average?: number;
  poster_url?: string;
  thumb_url?: string;
  sub_docquyen?: boolean;
  time?: string;
  episode_total?: string;
  actor?: string[];
  director?: string[];
  status?: string;
  quality?: string;
  lang?: string;
}

// Interface for new movies API response (assuming different structure)
interface NewMovie {
  _id?: string;
  name: string;
  slug: string;
  content?: string;
  year?: number;
  category?: Category[];
  vote_average?: number;
  poster_url?: string;
  thumb_url?: string;
  time?: string;
}

// API response structure for single movie
interface ApiResponse {
  pageProps: {
    data: {
      item: Movie;
    };
  };
}

// API response structure for new movies
interface NewMoviesApiResponse {
  data: {
    items: NewMovie[];
  };
}

const DetailMovies: React.FC = () => {
  const { movieName } = useParams<{ movieName: string }>();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  // Resolve image URLs
  const IMAGE_BASE_URL = "https://img.ophim.live/uploads/movies/";
  const resolveImageUrl = (url?: string): string => {
    if (!url) return "/fallback-image.jpg";
    if (url.startsWith("http")) return url;
    return IMAGE_BASE_URL + url;
  };

  // Fetch movie data from API
  const fetchMovie = async (): Promise<Movie> => {
    const response = await axios.get<ApiResponse>(
      `http://localhost:8080/api/movie/${movieName}`
    );
    console.log("Movie API Response:", response.data); // Log for debugging
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
    console.log("New Movies API Response:", response.data); // Log for debugging
    return response.data.data.items;
  };

  const {
    data: newMovies,
    isLoading: isNewMoviesLoading,
    error: newMoviesError,
  } = useQuery({
    queryKey: ["newMovies", movie?.category?.[0]?.slug],
    queryFn: fetchNewMovies,
    enabled: !!movie,
  });

  if (isMovieLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="text-white ml-3 text-lg font-medium">Đang tải...</span>
      </div>
    );
  }

  if (movieError || !movie) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-red-200 mx-4">
        <div className="flex items-center">
          <div className="text-red-400 mr-3 text-xl">⚠️</div>
          <div>
            <h3 className="font-semibold text-lg">Không tìm thấy phim</h3>
            <p className="text-red-300 mt-1">
              {movieError
                ? `Lỗi: ${movieError.message}`
                : "Phim không tồn tại."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Map movie data
  const movieTitle = movie.name || movie.origin_name || "Không có tiêu đề";
  const movieYear = movie.year || "N/A";
  const movieDescription = movie.content || "Chưa có mô tả cho phim này.";
  const movieCategories = movie.category || [];
  const movieVoteAverage = movie.vote_average || 0;
  const moviePosterUrl = resolveImageUrl(movie.poster_url || movie.thumb_url);
  const movieSubDocquyen = movie.sub_docquyen || false;
  const movieTime = movie.time || movie.episode_total || "N/A";
  console.log("moviePosterUrl", moviePosterUrl); // Log for debugging

  return (
    <div
      className="min-h-screen pb-5"
      style={{ background: "rgb(17, 19, 25)" }}
    >
      <Header />
      <div className="flex pl-12 relative">
        <div className="flex-1" style={{ background: "rgb(17, 19, 25)" }}></div>
        <div
          className="flex-[3] transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(17, 19, 25) 35%, rgba(17, 19, 25, 0.6) 40%, transparent 100%), 
              linear-gradient(to top, rgb(17, 19, 25) 10%, rgba(17, 19, 25, 0.6) 15%, transparent 30%),
              url('${moviePosterUrl}')
            `,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "561px",
          }}
        ></div>

        <div className="absolute top-[70px]">
          <div className="text-white flex flex-col gap-3">
            <span className="font-Bricolage font-semibold text-[40px]">
              {movieTitle}
            </span>
            <button
              className={`w-14 flex justify-center items-center rounded ${
                movieSubDocquyen ? "bg-yellow-400" : "bg-green-400"
              }`}
            >
              {movieSubDocquyen ? "Premium" : "Free"}
            </button>
            <div className="flex gap-2 items-center">
              <div className="flex items-center text-green-400">
                <MdOutlineStar />
                <span className="text-green-400">
                  {movieVoteAverage.toFixed(1)}
                </span>
              </div>
              <div className="border h-3"></div>
              <span className="text-white text-sm">T13</span>
              <div className="border h-3"></div>
              <span className="text-white text-sm">{movieYear}</span>
            </div>
            <div>
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
            <div>
              <button
                className="flex gap-1 items-center px-4 py-[7px] rounded font-Vip font-semibold text-black"
                style={{ background: "rgb(242, 191, 131)" }}
              >
                <RiVipCrown2Fill />
                Tháng đầu chỉ với 23,000Đ
              </button>
            </div>
            <div className="w-[40vw]">
              <span>Description:</span>
              <span dangerouslySetInnerHTML={{ __html: movieDescription }} />
            </div>
            <div className="flex gap-3">
              <Link to={`/play/${movie.slug}`}>
                <button className="py-1 px-4 bg-green-500 font-Vip text-lg text-white hover:bg-green-400 cursor-pointer flex items-center gap-2 rounded">
                  <FaPlay /> Play
                </button>
              </Link>
              <button className="py-1 px-4 bg-gray-700 font-Vip text-lg text-white hover:text-green-400 cursor-pointer flex items-center gap-2 rounded">
                <MdOutlineIosShare /> Share
              </button>
              <button className="py-1 px-4 bg-gray-700 font-Vip text-lg text-white hover:text-green-400 cursor-pointer flex items-center gap-2 rounded">
                <RiArrowDownBoxLine /> App
              </button>
              <button className="py-1 px-4 bg-gray-700 font-Vip text-lg text-white hover:text-green-400 cursor-pointer flex items-center gap-2 rounded">
                <MdBookmarkAdded /> Watch Later
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="px-12 h-auto flex flex-col gap-5 mt-5"
        style={{ background: "rgb(17, 19, 25)" }}
      >
        <div className="flex justify-between">
          <span className="font-Bricolage font-semibold text-[25px] text-white">
            Phim Đề Cử
          </span>
          <Link
            to="/movies"
            className="text-white hover:text-green-400 cursor-pointer"
          >
            Xem tất cả
          </Link>
        </div>
        {isNewMoviesLoading ? (
          <div className="text-white">Đang tải phim đề cử...</div>
        ) : newMoviesError ? (
          <div className="text-white">
            Lỗi: {(newMoviesError as Error).message}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between mt-5">
            {newMovies?.map((item, i) => (
              <div
                key={item._id || i}
                className="relative group w-[calc(100%/6-12px)] overflow-visible cursor-pointer mb-10 rounded"
              >
                <Link
                  to={`/detailmovies/${item.slug}`}
                  className="block h-full"
                >
                  <div className="h-[281px] rounded-md relative">
                    <div className="absolute bg-green-400 right-0 px-3 overflow-hidden rounded">
                      <span className="font-Vip text-white">
                        {item.sub_docquyen ? "Premium" : "Free"}
                      </span>
                    </div>
                    <img
                      src={
                        item.thumb_url
                          ? `https://img.ophim.live/uploads/movies/${item.thumb_url}`
                          : "/fallback-image.jpg"
                      }
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.src = "/fallback-image.jpg";
                      }}
                    />
                  </div>
                  <span className="text-white group-hover:text-green-400">
                    {item.name}
                  </span>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-[100]">
                    <div className="w-[285px] h-[400px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
                      <div className="h-[160px] relative overflow-hidden rounded-t-lg">
                        <div className="absolute top-2 right-2 z-10">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.sub_docquyen
                                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                                : "bg-gradient-to-r from-green-400 to-green-500 text-white"
                            } shadow-lg`}
                          >
                            {item.sub_docquyen ? "Premium" : "Free"}
                          </span>
                        </div>
                        <img
                          src={
                            item.poster_url
                              ? `https://img.ophim.live/uploads/movies/${item.poster_url}`
                              : "/fallback-image.jpg"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement, Event>
                          ) => {
                            e.currentTarget.src = "/fallback-image.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="p-4 h-[240px] flex flex-col justify-between">
                        <div className="space-y-3">
                          <h3 className="text-white text-lg font-bold leading-tight hover:text-green-400 transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1 text-yellow-400">
                              <MdOutlineStar className="text-lg" />
                              <span className="font-semibold">
                                {item.tmdb?.vote_average ||
                                  item.imdb?.vote_average ||
                                  "N/A"}
                              </span>
                            </div>
                            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                            <span className="text-gray-300">{item.time}</span>
                            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                            <span className="text-gray-300">{item.year}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.category?.slice(0, 3).map((cat, index) => (
                              <span
                                key={cat.id || index}
                                className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs hover:bg-gray-600 transition-colors"
                              >
                                {cat.name}
                              </span>
                            )) || (
                              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs hover:bg-gray-600 transition-colors">
                                Không rõ
                              </span>
                            )}
                          </div>
                          <div className="text-xs space-y-1">
                            {item.origin_name && (
                              <div className="text-gray-400">
                                <span className="text-green-400 font-medium">
                                  stipulates
                                </span>{" "}
                                {item.origin_name}
                              </div>
                            )}
                            <div className="flex gap-4 text-gray-400">
                              {item.quality && (
                                <span>
                                  <span className="text-green-400 font-medium">
                                    Chất lượng:
                                  </span>{" "}
                                  {item.quality}
                                </span>
                              )}
                              {item.lang && (
                                <span>
                                  <span className="text-green-400 font-medium">
                                    Ngôn ngữ:
                                  </span>{" "}
                                  {item.lang}
                                </span>
                              )}
                            </div>
                            {item.episode_current && (
                              <div className="text-gray-400">
                                <span className="text-green-400 font-medium">
                                  Tình trạng:
                                </span>{" "}
                                {item.episode_current}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end pt-2 border-t border-gray-700">
                          <Link
                            to={`/detailmovies/${item.slug}`}
                            className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center gap-1 transition-colors"
                          >
                            Xem chi tiết <span className="text-lg">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailMovies;

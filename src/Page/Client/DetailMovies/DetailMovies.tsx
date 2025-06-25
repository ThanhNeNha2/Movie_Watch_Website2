import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FaPlay } from "react-icons/fa";
import {
  MdBookmarkAdded,
  MdOutlineIosShare,
  MdOutlineStar,
} from "react-icons/md";
import { RiArrowDownBoxLine, RiVipCrown2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
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

// API response structure
interface ApiResponse {
  pageProps: {
    data: {
      item: Movie;
    };
  };
}

const DetailMovies: React.FC = () => {
  const { movieName } = useParams<{ movieName: string }>();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  // Fetch movie data from API
  const fetchMovie = async (): Promise<Movie> => {
    const response = await axios.get<ApiResponse>(
      `http://localhost:8080/api/movie/${movieName}`
    );
    console.log("API Response:", response.data); // Log API response for debugging
    return response.data.pageProps.data.item; // Extract the movie item
  };

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", movieName],
    queryFn: fetchMovie,
    enabled: !!movieName, // Only fetch when movieName exists
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="text-white ml-3 text-lg font-medium">Đang tải...</span>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-red-200 mx-4">
        <div className="flex items-center">
          <div className="text-red-400 mr-3 text-xl">⚠️</div>
          <div>
            <h3 className="font-semibold text-lg">Không tìm thấy phim</h3>
            <p className="text-red-300 mt-1">
              {error
                ? `Lỗi: ${(error as Error).message}`
                : "Phim không tồn tại."}
            </p>
          </div>
        </div>
      </div>
    );
  }
  console.log(" check ", movie);
  const IMAGE_BASE_URL = "https://img.ophim.live/uploads/movies/";

  const resolveImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return IMAGE_BASE_URL + url;
  };

  // Map API data to component
  const movieTitle = movie.name || movie.origin_name || "Không có tiêu đề";
  const movieYear = movie.year || "N/A";
  const movieDescription = movie.content || "Chưa có mô tả cho phim này.";
  const movieCategories = movie.category || [];
  const movieVoteAverage = movie.vote_average || 0;
  const moviePosterUrl = movie?.pageProps?.data?.seoOnPage?.image
    ? movie.pageProps.data.seoOnPage.image
    : movie.poster_url
    ? resolveImageUrl(movie.poster_url)
    : movie.thumb_url
    ? resolveImageUrl(movie.thumb_url)
    : "/fallback-image.jpg";
  const movieSubDocquyen = movie.sub_docquyen || false;
  const movieTime = movie.time || movie.episode_total || "N/A";

  return (
    <div className="" style={{ background: "rgb(17, 19, 25)" }}>
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
                  {movieVoteAverage.toFixed(1) || "N/A"}
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
              <span>{movieDescription}</span>
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
    </div>
  );
};

export default DetailMovies;

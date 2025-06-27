import React from "react";
import { MdOutlineStar } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Định nghĩa interface cho dữ liệu phim
interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tmdb {
  vote_average?: number;
}

interface Imdb {
  vote_average?: number;
}

interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name?: string;
  thumb_url: string;
  poster_url: string;
  sub_docquyen: boolean;
  time: string;
  year: number;
  quality?: string;
  lang?: string;
  episode_current?: string;
  category: Category[];
  tmdb?: Tmdb;
  imdb?: Imdb;
  description?: string;
}

const NewMovieUpdatedSeries: React.FC = () => {
  // Hàm fetch dữ liệu từ API
  const fetchSeriesMovies = async (): Promise<Movie[]> => {
    const response = await axios.get(
      "https://ophim1.com/v1/api/danh-sach/phim-bo?page=1&sort_field=&category=&country=&year="
    );
    return response.data.data.items;
  };

  // Sử dụng useQuery để fetch dữ liệu
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["seriesMovies"],
    queryFn: fetchSeriesMovies,
  });

  if (isLoading) return <div className="text-white">Đang tải...</div>;
  if (error)
    return <div className="text-white">Lỗi: {(error as Error).message}</div>;

  return (
    <div className="h-auto">
      <div className="flex justify-between">
        <span className="font-Bricolage font-semibold text-[25px] text-white">
          Phim Bộ Mới Cập Nhật
        </span>
        <Link
          to={
            "/ListMoveSearch?page=1&sort_field=&category=&country=&year=&type=phim-bo"
          }
        >
          <span className="text-white hover:text-green-400 cursor-pointer">
            Xem tất cả
          </span>
        </Link>
      </div>
      <div className="flex flex-wrap justify-between mt-5">
        {movies?.map((item: Movie) => (
          <div
            key={item._id}
            className="relative group w-[calc(100%/6-12px)] overflow-visible cursor-pointer mb-10 rounded"
          >
            <Link to={`/detailmovies/${item.slug}`} className="block h-full">
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
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
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
                        {item.category.slice(0, 3).map((cat) => (
                          <span
                            key={cat.id}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs hover:bg-gray-600 transition-colors"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>

                      <div className="text-xs space-y-1">
                        {item.origin_name && (
                          <div className="text-gray-400">
                            <span className="text-green-400 font-medium">
                              Tên gốc:
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
    </div>
  );
};

export default NewMovieUpdatedSeries;

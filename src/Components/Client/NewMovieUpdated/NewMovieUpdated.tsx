import React from "react";
import { MdOutlineStar } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const NewMovieUpdated = () => {
  // Hàm fetch dữ liệu từ API
  const fetchNewMovies = async () => {
    const response = await axios.get(
      "https://ophim1.com/v1/api/danh-sach/phim-le?page=1&sort_field=&category=&country=&year="
    );
    return response.data.data.items;
  };

  // Sử dụng useQuery để fetch dữ liệu
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newMovies"],
    queryFn: fetchNewMovies,
  });

  if (isLoading) return <div className="text-white">Đang tải...</div>;
  if (error) return <div className="text-white">Lỗi: {error.message}</div>;

  return (
    <div className="h-auto">
      <div className="flex justify-between">
        <span className="font-Bricolage font-semibold text-[25px] text-white">
          Phim Lẻ Mới Cập Nhật
        </span>
        <span className="text-white hover:text-green-400 cursor-pointer">
          Xem tất cả
        </span>
      </div>
      <div className="flex flex-wrap justify-between mt-5">
        {movies?.map((item) => (
          <div
            key={item._id}
            className="relative group w-[calc(100%/6-12px)] overflow-visible cursor-pointer mb-10"
          >
            <Link to={`/detailmovies/${item.slug}`} className="block h-full">
              {/* Thumbnail */}
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
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/fallback-image.jpg";
                  }}
                />
              </div>

              {/* Tên phim */}
              <span className="text-white group-hover:text-green-400">
                {item.name}
              </span>

              {/* Nội dung hiển thị khi hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 shadow-lg rounded-md">
                <div className="w-[285px] h-[350px] flex flex-col overflow-hidden rounded group cursor-pointer">
                  {/* Ảnh */}
                  <div className="flex-[2] rounded-md relative overflow-hidden">
                    <div className="absolute bg-green-400 right-0 px-3 rounded">
                      <span className="font-Vip text-white">
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
                      onError={(e) => {
                        e.target.src = "/fallback-image.jpg";
                      }}
                    />
                  </div>

                  {/* Nội dung */}
                  <div className="flex-[3] bg-gray-600 px-3 py-2 flex flex-col justify-between gap-1">
                    <div className="flex">
                      <span className="font-Vip text-white text-lg hover:text-green-400 w-full">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center text-green-400">
                        <MdOutlineStar />
                        <span className="text-green-400">
                          {item.tmdb?.vote_average ||
                            item.imdb?.vote_average ||
                            "N/A"}
                        </span>
                      </div>
                      <div className="border h-3"></div>
                      <span className="text-white text-sm">{item.time}</span>
                      <div className="border h-3"></div>
                      <span className="text-white text-sm">{item.year}</span>
                    </div>
                    <div>
                      <ul className="flex gap-3 items-center">
                        {item.category.map((cat) => (
                          <li
                            key={cat.id}
                            className="px-2 bg-gray-500 text-white py-[3px] text-xs"
                          >
                            {cat.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-white text-xs overflow-hidden line-clamp-6">
                        {item.description || "Chưa có mô tả cho phim này."}
                      </span>
                    </div>
                    <div>
                      <Link
                        to={`/detailmovies/${item.slug}`}
                        className="text-green-400 text-sm flex justify-end"
                      >
                        more info {">"}
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

export default NewMovieUpdated;

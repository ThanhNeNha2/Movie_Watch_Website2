import React from "react";
import { MdOutlineStar } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

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
  thumb_url: string;
  poster_url: string;
  sub_docquyen: boolean;
  time: string;
  year: number;
  category: Category[];
  tmdb?: Tmdb;
  imdb?: Imdb;
  description?: string;
}

interface Filters {
  page: number;
  sortField: string;
  filterCategory: string;
  filterCountry: string;
  filterYear: string;
}

const Content: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    page: parseInt(searchParams.get("page") || "1") || 1,
    sortField: searchParams.get("sort_field") || "",
    filterCategory: searchParams.get("category") || "",
    filterCountry: searchParams.get("country") || "",
    filterYear: searchParams.get("year") || "",
  });

  useEffect(() => {
    setFilters({
      page: parseInt(searchParams.get("page") || "1") || 1,
      sortField: searchParams.get("sort_field") || "",
      filterCategory: searchParams.get("category") || "",
      filterCountry: searchParams.get("country") || "",
      filterYear: searchParams.get("year") || "",
    });
  }, [searchParams]);

  const fetchMovies = async (): Promise<Movie[]> => {
    const response = await axios.get(
      "https://ophim1.com/v1/api/danh-sach/hoat-hinh",
      {
        params: {
          page: filters.page,
          sort_field: filters.sortField,
          filterCategory: filters.filterCategory
            ? [filters.filterCategory]
            : [],
          filterCountry: filters.filterCountry ? [filters.filterCountry] : [],
          filterYear: filters.filterYear,
        },
      }
    );
    return response.data.data.items;
  };

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", filters],
    queryFn: fetchMovies,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      page: filters.page.toString(),
      sort_field: filters.sortField,
      category: filters.filterCategory,
      country: filters.filterCountry,
      year: filters.filterYear,
    }).toString();
    setSearchParams(queryParams, { replace: true });
    // Cập nhật URL thành http://localhost:5173/danh-sach/hoat-hinh?...
    window.history.pushState(
      null,
      "",
      `http://localhost:5173/danh-sach/hoat-hinh?${queryParams}`
    );
  };

  if (isLoading) return <div className="text-white">Đang tải...</div>;
  if (error)
    return <div className="text-white">Lỗi: {(error as Error).message}</div>;

  return (
    <div className="h-auto">
      <div className="flex justify-between">
        <span className="font-Bricolage font-semibold text-[25px] text-white">
          Phim Đề Cử
        </span>
        <span className="text-white hover:text-green-400 cursor-pointer">
          Xem tất cả
        </span>
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
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 shadow-lg rounded-md">
                <div className="w-[285px] h-[400px] flex flex-col overflow-hidden rounded group cursor-pointer">
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
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.src = "/fallback-image.jpg";
                      }}
                    />
                  </div>
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
                            className="px-2 bg-gray-600 text-white py-[3px] text-xs"
                          >
                            {cat.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-white text-xs py-2 overflow-hidden line-clamp-6">
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

export default Content;

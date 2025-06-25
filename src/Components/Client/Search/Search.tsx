import React, { useState, useEffect } from "react";
import { MdOutlineStar, MdSearch, MdFilterList, MdClear } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
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

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);
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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handleSearch = (): void => {
    const queryParams = new URLSearchParams({
      page: filters.page.toString(),
      sort_field: filters.sortField,
      category: filters.filterCategory,
      country: filters.filterCountry,
      year: filters.filterYear,
    }).toString();
    setSearchParams(queryParams, { replace: true });
    window.history.pushState(
      null,
      "",
      `http://localhost:5173/danh-sach/hoat-hinh?${queryParams}`
    );
  };

  const clearFilters = (): void => {
    setFilters({
      page: 1,
      sortField: "",
      filterCategory: "",
      filterCountry: "",
      filterYear: "",
    });
  };

  const toggleFilters = (): void => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  const hasActiveFilters: boolean = Boolean(
    filters.sortField ||
      filters.filterCategory ||
      filters.filterCountry ||
      filters.filterYear
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="text-white ml-3 text-lg font-medium">Đang tải...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-red-200 mx-4">
        <div className="flex items-center">
          <div className="text-red-400 mr-3 text-xl">⚠️</div>
          <div>
            <h3 className="font-semibold text-lg">Có lỗi xảy ra</h3>
            <p className="text-red-300 mt-1">Lỗi: {(error as Error).message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 p-1">
          <div className="bg-gray-800/95 rounded-xl">
            {/* Title and Mobile Toggle */}
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <MdFilterList className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Lọc Phim Hoạt Hình
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Tìm kiếm phim theo sở thích của bạn
                  </p>
                </div>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={toggleFilters}
                className="lg:hidden p-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                aria-label="Toggle filters"
              >
                <MdFilterList
                  className={`text-white text-xl transform transition-transform duration-200 ${
                    isFilterExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Filters Container */}
            <div
              className={`px-6 pb-6 transition-all duration-500 ease-in-out overflow-hidden ${
                isFilterExpanded
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0 lg:max-h-screen lg:opacity-100"
              } lg:block`}
            >
              {/* Filter Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                {/* Sort Field */}
                <div className="space-y-3">
                  <label
                    htmlFor="sortField"
                    className="text-sm font-semibold text-gray-300 block uppercase tracking-wide"
                  >
                    Sắp xếp theo
                  </label>
                  <select
                    id="sortField"
                    name="sortField"
                    value={filters.sortField}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 bg-gray-700/90 text-white rounded-xl border border-gray-600/50 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-all duration-200
                             hover:bg-gray-700 hover:border-gray-500 cursor-pointer backdrop-blur-sm
                             appearance-none bg-no-repeat bg-right bg-[length:16px_16px] 
                             shadow-lg hover:shadow-xl font-medium"
                  >
                    <option value="">Thời gian cập nhật</option>
                    <option value="created.time">Thời gian đăng</option>
                    <option value="year">Năm sản xuất</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <label
                    htmlFor="filterCategory"
                    className="text-sm font-semibold text-gray-300 block uppercase tracking-wide"
                  >
                    Thể loại
                  </label>
                  <select
                    id="filterCategory"
                    name="filterCategory"
                    value={filters.filterCategory}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 bg-gray-700/90 text-white rounded-xl border border-gray-600/50 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-all duration-200
                             hover:bg-gray-700 hover:border-gray-500 cursor-pointer backdrop-blur-sm
                             shadow-lg hover:shadow-xl font-medium"
                  >
                    <option value="">Toàn bộ thể loại</option>
                    <option value="hanh-dong">Hành Động</option>
                    <option value="tinh-cam">Tình Cảm</option>
                    <option value="hai-huoc">Hài Hước</option>
                    <option value="co-trang">Cổ Trang</option>
                    <option value="tam-ly">Tâm Lý</option>
                    <option value="hinh-su">Hình Sự</option>
                    <option value="chien-tranh">Chiến Tranh</option>
                    <option value="the-thao">Thể Thao</option>
                    <option value="vo-thuat">Võ Thuật</option>
                    <option value="vien-tuong">Viễn Tưởng</option>
                    <option value="phieu-luu">Phiêu Lưu</option>
                    <option value="khoa-hoc">Khoa Học</option>
                    <option value="kinh-di">Kinh Dị</option>
                    <option value="am-nhac">Âm Nhạc</option>
                    <option value="than-thoai">Thần Thoại</option>
                    <option value="tai-lieu">Tài Liệu</option>
                    <option value="gia-dinh">Gia Đình</option>
                    <option value="chinh-kich">Chính Kịch</option>
                    <option value="bi-an">Bí Ẩn</option>
                    <option value="hoc-duong">Học Đường</option>
                    <option value="kinh-dien">Kinh Điển</option>
                    <option value="18+">18+</option>
                  </select>
                </div>

                {/* Country Filter */}
                <div className="space-y-3">
                  <label
                    htmlFor="filterCountry"
                    className="text-sm font-semibold text-gray-300 block uppercase tracking-wide"
                  >
                    Quốc gia
                  </label>
                  <select
                    id="filterCountry"
                    name="filterCountry"
                    value={filters.filterCountry}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 bg-gray-700/90 text-white rounded-xl border border-gray-600/50 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-all duration-200
                             hover:bg-gray-700 hover:border-gray-500 cursor-pointer backdrop-blur-sm
                             shadow-lg hover:shadow-xl font-medium"
                  >
                    <option value="">Toàn bộ Quốc gia</option>
                    <option value="trung-quoc">Trung Quốc</option>
                    <option value="han-quoc">Hàn Quốc</option>
                    <option value="nhat-ban">Nhật Bản</option>
                    <option value="thai-lan">Thái Lan</option>
                    <option value="au-my">Âu Mỹ</option>
                    <option value="dai-loan">Đài Loan</option>
                    <option value="hong-kong">Hồng Kông</option>
                    <option value="an-do">Ấn Độ</option>
                    <option value="anh">Anh</option>
                    <option value="phap">Pháp</option>
                    <option value="canada">Canada</option>
                    <option value="duc">Đức</option>
                    <option value="tay-ban-nha">Tây Ban Nha</option>
                    <option value="tho-nhi-ky">Thổ Nhĩ Kỳ</option>
                    <option value="ha-lan">Hà Lan</option>
                    <option value="indonesia">Indonesia</option>
                    <option value="nga">Nga</option>
                    <option value="mexico">Mexico</option>
                    <option value="ba-lan">Ba Lan</option>
                    <option value="uc">Úc</option>
                    <option value="thuy-dien">Thụy Điển</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="brazil">Brazil</option>
                    <option value="philippines">Philippines</option>
                    <option value="bo-dao-nha">Bồ Đào Nha</option>
                    <option value="y">Ý</option>
                    <option value="dan-mach">Đan Mạch</option>
                    <option value="uae">UAE</option>
                    <option value="na-uy">Na Uy</option>
                    <option value="thuy-si">Thụy Sĩ</option>
                    <option value="chau-phi">Châu Phi</option>
                    <option value="nam-phi">Nam Phi</option>
                    <option value="ukraina">Ukraina</option>
                    <option value="a-rap-xe-ut">Ả Rập Xê Út</option>
                  </select>
                </div>

                {/* Year Filter */}
                <div className="space-y-3">
                  <label
                    htmlFor="filterYear"
                    className="text-sm font-semibold text-gray-300 block uppercase tracking-wide"
                  >
                    Năm sản xuất
                  </label>
                  <select
                    id="filterYear"
                    name="filterYear"
                    value={filters.filterYear}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 bg-gray-700/90 text-white rounded-xl border border-gray-600/50 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-all duration-200
                             hover:bg-gray-700 hover:border-gray-500 cursor-pointer backdrop-blur-sm
                             shadow-lg hover:shadow-xl font-medium"
                  >
                    <option value="">Toàn bộ Năm</option>
                    {Array.from({ length: 26 }, (_, i) => 2025 - i).map(
                      (year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      )
                    )}
                    <option value="before-2000">Trước 2000</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pt-6 border-t border-gray-700/50">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleSearch}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 
                             text-white font-bold rounded-xl shadow-lg hover:shadow-2xl 
                             transform hover:scale-105 active:scale-95 transition-all duration-200 
                             flex items-center justify-center gap-3 min-w-[160px]
                             before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-700 before:via-purple-700 before:to-blue-700
                             before:rounded-xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200 before:-z-10"
                  >
                    <MdSearch className="text-xl group-hover:rotate-12 transition-transform duration-200" />
                    <span className="text-lg">Tìm Kiếm</span>
                  </button>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="group px-6 py-4 bg-gray-600/80 hover:bg-gray-600 text-white font-semibold 
                               rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95
                               flex items-center justify-center gap-2 min-w-[140px]"
                    >
                      <MdClear className="text-lg group-hover:rotate-180 transition-transform duration-200" />
                      <span>Xóa Bộ Lọc</span>
                    </button>
                  )}
                </div>

                {/* Active Filters Indicator */}
                {hasActiveFilters && (
                  <div className="flex items-center gap-3 text-sm text-gray-300 bg-gray-700/50 rounded-lg px-4 py-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Đang áp dụng bộ lọc</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

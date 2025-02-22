import { MdOutlineStar } from "react-icons/md";

import { Link } from "react-router-dom";
import { arrContent } from "../../../Util/apiFake";
const Content = () => {
  return (
    <div className="h-auto ">
      <div className="flex justify-center items-center gap-5 bg-gray-800 h-[60px] mt-7 mb-5 rounded">
        <span className="text-white font-Bricolage font-medium text-xl">
          Lọc Phim
        </span>
        {/* THOI GIAN PHIM  */}
        <div>
          <select
            name="sort"
            id="sort"
            className="py-[6px] px-2 rounded bg-gray-700 text-white border "
          >
            <option value="update_time">Thời gian cập nhật</option>
            <option value="post_time">Thời gian đăng</option>
            <option value="production_year">Năm sản xuất</option>
          </select>
        </div>
        {/* PHIM MOI .... */}
        <div>
          <select
            name="sort"
            id="sort"
            className="py-[6px] px-2 rounded bg-gray-700 text-white border "
          >
            <option value="post_time">Phim Mới </option>
            <option value="update_time">Phim Bộ </option>
            <option value="production_year">Phim Lẻ </option>
            <option value="production_year">TV Shows </option>
            <option value="production_year">Hoạt Hình</option>
            <option value="production_year">Phim Vietsub</option>
            <option value="production_year">Phim Thuyết Minh</option>
            <option value="production_year">Phim Lồng Tiếng</option>
            <option value="production_year">Phim Bộ Đang Chiếu</option>
            <option value="production_year">Phim Trọn Bộ </option>
            <option value="production_year">Phim Sắp Chiếu </option>
            <option value="production_year">Subteam</option>
          </select>
        </div>
        {/* THE LOAI PHIM */}
        <div>
          <select
            name="sort"
            id="sort"
            className="py-[6px] px-2 rounded bg-gray-700 text-white border"
          >
            <option value="post_time">Toàn bộ thể loại</option>
            <option value="update_time">Hành Động</option>
            <option value="production_year">Tình Cảm </option>
            <option value="production_year">Hài Hước</option>
            <option value="production_year">Cổ trang</option>
            <option value="production_year">Tâm Lý</option>
            <option value="production_year">Hình Sự</option>
            <option value="production_year">Chiến tranh </option>
            <option value="production_year">Thể Thao</option>
            <option value="production_year">Võ Thuật</option>
            <option value="production_year">Viễn Tưởng </option>
            <option value="production_year">Phiêu Lưu</option>
            <option value="production_year">Khoa Học </option>
            <option value="production_year">Kinh Dị </option>{" "}
            <option value="production_year">Âm Nhạc </option>
            <option value="production_year">Thần Thoại </option>{" "}
            <option value="production_year">Tài Liệu </option>
            <option value="production_year">Gia Đình </option>
            <option value="production_year">Chính Kịch </option>
            <option value="production_year">Bí Ẩn</option>
            <option value="production_year">Học Đường </option>
            <option value="production_year">Kinh Điển </option>
            <option value="production_year">18+</option>
          </select>
        </div>
        {/* QUOC GIA  */}
        <div>
          <select
            name="sort"
            id="sort"
            className="py-[6px] px-2 rounded bg-gray-700 text-white border "
          >
            <option value="update_time">Toàn bộ Quốc gia</option>
            <option value="post_time">Trung Quốc </option>
            <option value="update_time">Hàn Quốc </option>
            <option value="production_year">Nhật Bản </option>
            <option value="production_year">Thái Lan </option>
            <option value="production_year">Âu Mỹ </option>
            <option value="production_year">Đài Loan </option>
            <option value="production_year">Hồng Kông</option>
            <option value="production_year">Ấn Độ</option>
            <option value="production_year">Anh </option>
            <option value="production_year">Pháp </option>
            <option value="production_year">Canada </option>
            <option value="production_year">Quốc Gia Khác </option>
            <option value="production_year">Đức </option>
            <option value="production_year">Tây Ban Nha </option>{" "}
            <option value="production_year">Thổ Nhĩ Kỳ </option>
            <option value="production_year">Hà Lan </option>{" "}
            <option value="production_year"> Indonesia</option>
            <option value="production_year">Nga</option>
            <option value="production_year">Mexico </option>
            <option value="production_year">Ba Lan</option>
            <option value="production_year">Úc </option>
            <option value="production_year">Thụy Điển </option>
            <option value="production_year">Malaysia</option>
            <option value="production_year">Brazil</option>
            <option value="production_year">Philippines</option>
            <option value="production_year">Bồ Đào Nha</option>
            <option value="production_year">ý</option>
            <option value="production_year">Đan Mạch</option>
            <option value="production_year">UAEA</option>
            <option value="production_year">Na Uy</option>
            <option value="production_year">Thụy Sĩ </option>
            <option value="production_year">Châu Phi </option>
            <option value="production_year">Nam Phi </option>
            <option value="production_year">Ukraina</option>
            <option value="production_year">Ả Rập Xê Út</option>
          </select>
        </div>
        {/* NAM */}
        <div>
          <select
            name="sort"
            id="sort"
            className="py-[6px] px-2 rounded bg-gray-700 text-white border "
          >
            <option value="update_time">Toàn bộ Năm </option>
            <option value="production_year">2025</option>
            <option value="production_year">2024</option>
            <option value="production_year">2023</option>
            <option value="production_year">2022</option>
            <option value="production_year">2021</option>
            <option value="production_year">2020</option>
            <option value="production_year">2019</option>
            <option value="production_year">2018</option>
            <option value="production_year">2017</option>
            <option value="production_year">2016</option>
            <option value="production_year">2015</option>
            <option value="production_year">2014</option>
            <option value="production_year">2013</option>
            <option value="production_year">2012</option>
            <option value="production_year">2011</option>
            <option value="production_year">2010</option>
            <option value="production_year">2009</option>
            <option value="production_year">2008</option>
            <option value="production_year">2007</option>
            <option value="production_year">2006</option>
            <option value="production_year">2005</option>
            <option value="production_year">2004</option>
            <option value="production_year">2003</option>
            <option value="production_year">2002</option>
            <option value="production_year">2001</option>
            <option value="production_year">2000</option>
            <option value="production_year">Trước 2000</option>
          </select>
        </div>
        <button className="bg-green-500 hover:border-b-green-400 text-white py-2 px-3 font-Vip rounded ">
          Tìm Phim{" "}
        </button>
      </div>
      <div className="flex justify-between">
        {" "}
        <span className=" font-Bricolage font-semibold text-[25px] text-white  ">
          {" "}
          Phim Đề Cử
        </span>
        <span className="text-white hover:text-green-400 cursor-pointer">
          Xem tất cả
        </span>
      </div>
      <div className="flex flex-wrap justify-between  mt-5  ">
        {arrContent.map((item, i) => (
          <div
            key={i}
            className="relative group w-[calc(100%/6-12px)] overflow-visible cursor-pointer mb-10 rounded"
          >
            <Link to={"/detailmovies"} className="block h-full">
              {/* Thumbnail */}
              <div className="h-[281px] rounded-md relative">
                <div className="absolute bg-green-400 right-0 px-3 overflow-hidden rounded">
                  <span className="font-Vip text-white">Free</span>
                </div>
                <img
                  src={item.thumb_url}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Tên phim */}
              <span className="text-white group-hover:text-green-400">
                {item.name}
              </span>

              {/* Nội dung hiển thị khi hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5  bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 shadow-lg rounded-md">
                {/* Phim 1  */}
                <div className=" w-[285px] h-[350px] flex flex-col  overflow-hidden rounded group cursor-pointer ">
                  {/* img */}
                  <div className="  flex-[2] rounded-md relative overflow-hidden">
                    <div className="absolute bg-green-400 right-0 px-3  rounded">
                      <span className="font-Vip text-white">Free</span>
                    </div>
                    <img
                      src={item.poster_url}
                      alt=""
                      className="w-full h-full object-cover "
                    />
                  </div>

                  {/* Nội dung */}
                  <div className="flex-[3] bg-gray-600 px-3 py-2 flex flex-col justify-between gap-1">
                    <div className="flex  ">
                      <span className="font-Vip text-white text-lg hover:text-green-400 w-full">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center   ">
                      <div className="flex items-center text-green-400 ">
                        {" "}
                        <MdOutlineStar />{" "}
                        <span className="text-green-400">
                          {item.movie.tmdb.vote_average}
                        </span>
                      </div>
                      <div className="border h-3"></div>
                      <span className="text-white text-sm">{item.time}</span>
                      <div className="border h-3"></div>
                      <span className="text-white text-sm">{item.year}</span>
                    </div>
                    <div>
                      <ul className="flex gap-3 items-center">
                        <li className="px-2 bg-gray-500 text-white py-[3px] text-xs">
                          Cổ trang{" "}
                        </li>
                        <li className="px-2 bg-gray-500 text-white py-[3px] text-xs">
                          Tiên Hiệp
                        </li>
                        <li className="px-2 bg-gray-500 text-white py-[3px] text-xs">
                          Tu Tiên
                        </li>
                      </ul>
                    </div>
                    <div className="">
                      <span className="text-white text-xs  overflow-hidden line-clamp-6">
                        {item.content}
                      </span>
                    </div>
                    <div className="">
                      <a
                        href=""
                        className="text-green-400 text-sm flex justify-end"
                      >
                        more info {">"}{" "}
                      </a>
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

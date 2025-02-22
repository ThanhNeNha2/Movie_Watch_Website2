import TienNghich from "../../../../public/Slider/454973789_1043086304140741_634917588460075684_n.jpg";
import TheGioHoanMy from "../../../../public/Slider/423583069_299995016419669_3530185539043776265_n.jpg";
import ThuongNguyenDo from "../../../../public/Slider/453533518_1509423359658094_2018197872288129407_n.jpg";
import DauPha from "../../../../public/Slider/7c608196a571c76a3124b9faa17ae511.jpg";
import DauLa from "../../../../public/Slider/422a7eef94dbdabba4ceeee76e95720e.jpg";

import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

import { MdBookmarkAdded } from "react-icons/md";
import { useEffect, useState } from "react";
import { InfoPhim } from "../../../Util/typeApi";
import Header from "../../../Components/Client/Header/Header";
import Content from "../../../Components/Client/Content/Content";
import NewMovieUpdated from "../../../Components/Client/NewMovieUpdated/NewMovieUpdated";
import Flooter from "../../../Components/Client/Flooter/Flooter";
import NewMovieUpdatedSeries from "../../../Components/Client/NewMovieUpdatedSeries/NewMovieUpdatedSeries";
import { Link } from "react-router-dom";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Quản lý trạng thái hiển thị
  const [valuePhim, setvaluePhim] = useState(0); // Quản lý trạng thái hiển thị

  const toggleContent = () => {
    setIsExpanded(!isExpanded); // Đổi trạng thái giữa thu gọn và mở rộng
  };

  const listPhim: InfoPhim[] = [
    {
      imgMain: TienNghich,
      name: "Tiên Nghịch",
      rank: [
        "Top 1",
        "Top Bảng Xếp Hạng",
        "CTPlay Sản Xuất ",
        "Chỉ Có Trên CTPlay",
      ],
      evaluate: [8.8, 2025, "72/??"],
      kindPhim: ["CN Animation", "Cổ Trang", "Huyền Huyễn", "Tiên Hiệp"], // Có ít thể loại hơn
      description:
        "“Tiên Nghịch” của tác giả Nhĩ Căn, kể về thiếu niên bình phàm Vương Lâm xuất thân nông thôn, mang theo nhiệt huyết, tu luyện nghịch tiên, không chỉ cầu trường sinh, mà còn muốn thoát khỏi thân phận giun dế. Hắn tin rằng đạo do người quyết định, dùng tư chất bình phàm bước vào con đường tu chân, trải qua bao phong ba bão táp, dựa vào trí tuệ sáng suốt, từng bước một bước lên đỉnh cao, dựa vào sức một người, danh chấn Tu chân giới.",
    },
    {
      imgMain: TheGioHoanMy,
      name: "Thế Giới Hoàn Mỹ ",
      rank: [
        "Top6",
        "Top Bảng Xếp Hạng",
        "CTPlay Sản Xuất ",
        "Chỉ Có Trên CTPlay",
      ],
      evaluate: [8.2, 2021, "198/??"],
      kindPhim: ["CN Animation", "HHKungFu", "Huyền Huyễn", "Tiên Hiệp"], // Có ít thể loại hơn

      description:
        "Thế Giới Hoàn Mỹ cải biên từ tiểu thuyết cùng tên. Hắn vì tu đạo mà sinh, vì ứng kiếp mà đến. Hắn hoá thân thành vô vàn mưa máu, vẩy rơi năm tháng vạn cổ, trải qua vô số tu luyện của thời không và thử thách của dòng chảy tháng năm. Hắn hoá thành vạn cổ, hoá thành tự tại. Xem nam chính Thạch Hạo làm thế nào đạt đến huy hoàng đỉnh cao một đời, tạo ra truyền thuyết vô tận.",
    },
    {
      imgMain: ThuongNguyenDo,
      name: "Thương Nguyên Đồ ",
      rank: [
        "Top 2",
        "Top Bảng Xếp Hạng",
        "CTPlay Sản Xuất ",
        "Chỉ Có Trên CTPlay",
      ],
      evaluate: [9.6, 2023, "38/??"],
      kindPhim: ["CN Animation", "Cổ Trang", "Huyền Huyễn", "HHKungFu"], // Có ít thể loại hơn
      description:
        "“Thương Nguyên Đồ” Nói về yêu tà hoành hành ở Thương Nguyên giới, loài người chịu đủ tàn phá, nam chính Mạnh Xuyên từ nhỏ đã lập lời thề phải báo thù cho mẫu thân. Lấy đạo viện Kính Hồ làm khởi điểm, dựa vào tâm chí kiên nghị không sợ hãi và thân thủ đao pháp nhanh nhạt, trừng phạt gian ác, tiêu diệt yêu tộc, đăng đỉnh tứ đại đạo viện, nổi danh Đông Minh phủ, bái Thượng Nguyên Sơ Sơn, trở thành một Thần Ma.",
    },
    {
      imgMain: DauPha,
      name: "Đấu Phá Thương Khung",
      rank: [
        "Top 3",
        "Top Bảng Xếp Hạng",
        "CTPlay Sản Xuất ",
        "Chỉ Có Trên CTPlay",
      ],
      evaluate: [9.1, 2025, "130/??"],
      kindPhim: ["CN Animation", "Cổ Trang", "Huyền Huyễn"], // Có ít thể loại hơn
      description:
        "“Đấu Phá Thương Khung ” kể về một thế giới thuộc về Đấu Khí, không hề có ma pháp hoa tiếu diễm lệ, chỉ có đấu khí cương mãnh phồn thịnh! Đấu Phá Thương Khung cũng là nơi mà các Luyện Dược Sư, những nhà luyện đan dược giúp tăng cấp tu luyện, phục hồi sức lực, hay thậm chí cửu tử hoàn sinh vô cùng được trọng vọng bởi tư chất hiếm có của họ. Tưởng tượng thế giới đó sẽ phát triển ra sao? Mời các bạn xem Đấu Phá Thương Khung! Hệ Thống Tu Luyện: Đấu Giả, Đấu Sư, Đại Đấu Sư, Đấu Linh, Đấu Vương, Đấu Hoàng, Đấu Tông, Đấu Tôn, Đấu Thánh, Đấu Đế. Hãy Bắt Đầu Từ Tiêu Viêm – một thiên tài tu luyện trong phút chốc trở thành phế vật, từ phế vật lại từng bước khẳng định lại chính mình! Trên bước đường từng bước khẳng định lại bản thân, trở thành một cao thủ siêu hạng, cũng như một Luyện Dược Sư đỉnh cao, Tiêu Viêm được một vị tôn sư bí mật có thân phận cùng năng lực cực cao không ngừng chỉ dạy. Hãy cùng bắt đầu cuộc hành trình đó với Đấu Phá Thương Khung.",
    },
    {
      imgMain: DauLa,
      name: "Đấu La Đại Lục ",
      rank: [
        "Top 4",
        "Top Bảng Xếp Hạng",
        "CTPlay Sản Xuất ",
        "Chỉ Có Trên CTPlay",
      ],
      evaluate: [8.2, 2025, "258/258"],
      kindPhim: [
        "CN Animation",
        "HHKungFu",
        "Huyền Huyễn",
        "Tiên Hiệp",
        "Trùng Sinh",
      ], // Có ít thể loại hơn
      description:
        "“ Đấu La Đại Lục ” là một trong những tác phẩm đặc sắc của Đường Gia Tam Thiếu. Tác phẩm thuộc thể loại Huyễn Hiệp, mang đến cho độc giả một cái nhìn, một cảm nhận mới về thế giới hiệp khách huyền ảo. Câu chuyện với nhân vật chính, con một thợ rèn, một thợ rèn trở thành tửu quỷ, vì thê tử đã mất, sẵn sàng lôi cuốn người đọc ngay từ những chương đầu tiên.",
    },
  ];
  const handleMove = (type: string) => {
    if (type === "increase") {
      setvaluePhim((prev) => (prev + 1) % listPhim.length); // Tăng giá trị (xoay vòng)
    }
    if (type === "reduce") {
      setvaluePhim((prev) => (prev - 1 + listPhim.length) % listPhim.length); // Giảm giá trị (xoay vòng)
    }
  };
  useEffect(() => {
    // SetInterval để tự động chuyển ảnh mỗi 6 giây
    const intervalId = setInterval(() => {
      setvaluePhim((prev) => (prev + 1) % listPhim.length); // Tăng giá trị (xoay vòng)
    }, 5000); // 6000ms = 6s

    // Cleanup function để dừng setInterval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  //  Khi cuộn chuột
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra nếu cuộn chuột xuống > 300px
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Dọn dẹp sự kiện khi component bị unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="h-auto">
      {/*  */}
      {isScrolled && <Header isScrolled={isScrolled} />}

      <div
        className="h-[951px] transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${listPhim[valuePhim].imgMain})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed", // Cố định ảnh nền khi cuộn
        }}
      >
        {!isScrolled && <Header isScrolled={isScrolled} />}
        <div className="relative flex justify-between items-center h-screen px-4 text-white ">
          <div
            className="bg-gray-500 p-3 rounded-full cursor-pointer"
            onClick={() => handleMove("reduce")}
          >
            <FaChevronLeft />
          </div>
          <div
            className="bg-gray-500 p-3 rounded-full cursor-pointer "
            onClick={() => handleMove("increase")}
          >
            <FaChevronRight />
          </div>

          {/* THONG TIN PHIM  */}
          <div
            className={`absolute ${
              listPhim[valuePhim].name === "Đấu Phá Thương Khung"
                ? isExpanded
                  ? "bottom-20"
                  : "bottom-1/4"
                : "bottom-1/4"
            }  left-24  bg-gray-500 bg-opacity-35 p-4 flex flex-col gap-2 rounded-md w-[40%]`}
          >
            <span className="font-Bricolage font-medium text-[45px]   ">
              {listPhim[valuePhim].name}
            </span>

            {/* Bang xep hang  */}
            <div className="flex gap-2">
              {listPhim[valuePhim].rank.map((item, index) => (
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

            {/* Dánh gia  */}
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-green-500 font-semibold">
                <IoStar /> <span> {listPhim[valuePhim].evaluate[0]} </span>
              </div>

              <span> {listPhim[valuePhim].evaluate[1]} </span>

              <span> Số tập {listPhim[valuePhim].evaluate[2]} </span>
            </div>
            {/*  Loại phim */}
            <div className="flex  gap-2">
              {listPhim[valuePhim].kindPhim.map((item, index) => (
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
                  ? listPhim[valuePhim].description
                  : `${listPhim[valuePhim].description.slice(0, 120)}...`}{" "}
                {/* Hiển thị 30 chữ (~90 ký tự) nếu chưa mở rộng */}
              </span>
              <button
                onClick={toggleContent}
                className="ml-2 text-blue-500 hover:underline"
              >
                {isExpanded ? "Thu gọn" : "Xem thêm"} {/* Nút chuyển đổi */}
              </button>
            </div>
            <div className="flex gap-2 items-center h-14 overflow-hidden">
              <Link to={"/play"}>
                <div className="h-12 w-12 bg-green-500 rounded-full flex justify-center items-center text-center text-lg cursor-pointer hover:bg-green-400">
                  {" "}
                  <FaPlay />{" "}
                </div>
              </Link>
              <div className=" h-12 w-12 bg-gray-300 rounded-full flex justify-center items-center text-center  text-xl text-black cursor-pointer hover:bg-gray-500 hover:text-gray-200">
                {" "}
                <MdBookmarkAdded />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CONTENT */}
      <div className="bg-gray-900 px-12 h-auto flex flex-col gap-5">
        <Content />
        <NewMovieUpdated />
        <NewMovieUpdatedSeries />
      </div>
      <Flooter />
    </div>
  );
};

export default Home;

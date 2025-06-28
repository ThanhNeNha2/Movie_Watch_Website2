// ResponsiveWarning.tsx
import React, { useEffect, useState } from "react";

const ResponsiveWarning = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        // iPad và dưới
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize(); // Kiểm tra ngay khi load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000d0",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        <h2>
          ⚠️ Ứng dụng chưa hỗ trợ trên thiết bị di động hoặc máy tính bảng
        </h2>
        <p>Vui lòng truy cập bằng máy tính để có trải nghiệm tốt nhất.</p>
      </div>
    </div>
  );
};

export default ResponsiveWarning;

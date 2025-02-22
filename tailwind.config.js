/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Vip: ["SFPro-Bold", '"SF Pro"'],
        Bricolage: ["Bricolage Grotesque"], // Thêm font Bricolage Grotesque
      },
      colors: {
        customRed: "#FF0000", // Màu đỏ tùy chỉnh
      },
    },
  },
  plugins: [],
};

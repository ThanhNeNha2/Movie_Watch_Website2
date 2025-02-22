module.exports = {
  preset: "ts-jest", // Sử dụng ts-jest để xử lý TypeScript
  testEnvironment: "jest-environment-jsdom", // Đảm bảo sử dụng jsdom
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Biên dịch TypeScript
    "^.+\\.(js|jsx)$": "babel-jest", // Biên dịch JavaScript nếu cần
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Đường dẫn đến setup file
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

// HandleMove.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { FaChevronLeft } from "react-icons/fa";
import React, { useState } from "react";
import "@testing-library/jest-dom";
const Component = () => {
  const [valuePhim, setvaluePhim] = useState(0);
  const listPhim = ["film1", "film2", "film3"]; // Một list phim giả để test

  const handleMove = (type: string) => {
    if (type === "increase") {
      setvaluePhim((prev) => (prev + 1) % listPhim.length); // Tăng giá trị (xoay vòng)
    }
    if (type === "reduce") {
      setvaluePhim((prev) => (prev - 1 + listPhim.length) % listPhim.length); // Giảm giá trị (xoay vòng)
    }
  };

  return (
    <div>
      <button
        className="bg-gray-500 p-3 rounded-full cursor-pointer"
        onClick={() => handleMove("reduce")}
        aria-label="reduce"
      >
        <FaChevronLeft />
      </button>
      <button
        className="bg-gray-500 p-3 rounded-full cursor-pointer"
        onClick={() => handleMove("increase")}
        aria-label="increase"
      >
        +
      </button>
      <div data-testid="valuePhim">{valuePhim}</div>
    </div>
  );
};

describe("handleMove", () => {
  test("should reduce valuePhim when clicking on reduce button", () => {
    render(<Component />);

    // Click vào nút giảm
    const button = screen.getByRole("button", { name: /reduce/i });
    fireEvent.click(button);

    // Kiểm tra giá trị giảm đúng
    expect(screen.getByTestId("valuePhim")).toHaveTextContent("2");
  });

  test("should increase valuePhim when clicking on increase button", () => {
    render(<Component />);

    // Click vào nút tăng
    const button = screen.getByRole("button", { name: /increase/i });
    fireEvent.click(button);

    // Kiểm tra giá trị sau khi tăng
    expect(screen.getByTestId("valuePhim")).toHaveTextContent("1");
  });
});

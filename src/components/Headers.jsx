import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./style.css";
import { useTheme } from "../context/ThemeConvert";

const Headers = () => {
  const { currentTheme, Togglefn } = useTheme();
  const { carts } = useSelector((state) => state.allCart);

  return (
    <>
      <div
        className={`${
          currentTheme === "light"
            ? "bg-[#DAD4B5] text-[#952323]"
            : "bg-[#952323] text-[#DAD4B5] w-screen"
        } fixed top-0 left-0 z-10 w-screen h-14`}
      >
        <div className="p0 flex justify-between items-center h-14 text-xl mx-12">
          <NavLink to="/">
            <h3>Ecommerce</h3>
          </NavLink>
          <NavLink to="/cart">
            <div id="ex4">
              <span className="p1" data-count={carts.length}>
              </span>
                <FaShoppingCart />
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Headers;

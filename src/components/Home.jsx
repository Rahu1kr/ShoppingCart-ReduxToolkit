import React, { useState } from "react";
import CardData from "./CardData";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeConvert";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();
  const { currentTheme, Togglefn } = useTheme();

  // add to card
  const send = (e) => {
    dispatch(addToCart(e));
    toast.success("Item added in your cart");
  };

  return (
    <>
      <div
        className={`${
          currentTheme === "light"
            ? "bg-[#EEEEEE] text-[#222831]"
            : "bg-[#31363F] text-[#EEEEEE] "
        } mt-14 w-screen h-auto`}
      >
        <div className="py-4 px-6">
          <div
            onClick={Togglefn}
            className={`fixed z-10 flex justify-center items-center align-middle bottom-10 right-10 w-10 h-10 ${
              currentTheme === "light" ? "bg-[#F2E8C6] " : "bg-white text-black"
            } rounded-[50%] cursor-pointer`}
          >
            <button>
              {currentTheme === "light" ? (
                <MdDarkMode />
              ) : (
                <MdOutlineDarkMode />
              )}
            </button>
          </div>
          <h2 className=" text-xl mb-4">Restaurants in New Delhi Open now</h2>
          <div className=" flex flex-wrap  lg:gap-6 md:gap-16">
            {CardData.map((element, index) => {
              return (
                <div>
                  <div
                    className={`flex flex-col w-full max-w-[22rem] border border-red-900 rounded-lg shadow ${
                      currentTheme === "light"
                        ? " bg-[#31363F] border-[#952322] "
                        : " bg-[#952322] border-[#F2E7C6]"
                    }`}
                  >
                    <a href="#">
                      <img
                        className="p-8 rounded-t-lg w-[350px] h-[300px]"
                        src={element.imgdata}
                        alt="product image"
                      />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {element.dish.charAt(0).toUpperCase() +
                            element.dish.slice(1)}
                        </h5>
                      </a>
                      <h5
                        className={`${
                          element.rating >= 4.0
                            ? " text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {element.rating}&nbsp;★
                      </h5>
                      <p
                        className={`${
                          currentTheme === "light"
                            ? " text-white"
                            : "text-white"
                        } mb-2`}
                      >
                        {element.address}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {element.price}
                        </span>
                        <a
                          href="#"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => send(element)}
                        >
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

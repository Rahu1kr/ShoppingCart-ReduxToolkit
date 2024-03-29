import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeToCart,
  removeSingleItems,
  emptycartIteam,
} from "../redux/features/cartSlice";
import toast from "react-hot-toast";
import { FaTrash, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { useTheme } from "../context/ThemeConvert";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

const CartDetails = () => {
  const { currentTheme, Togglefn } = useTheme();

  const { carts } = useSelector((state) => state.allCart);

  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(1);

  const dispatch = useDispatch();

  // add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  // remove to cart
  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
    toast.success("Item remove from your cart");
  };

  // remove single item
  const handlesingleDecrement = (e) => {
    dispatch(removeSingleItems(e));
  };

  // empty cart
  const emptycart = () => {
    dispatch(emptycartIteam());
    toast.success("Your cart is empty");
  };

  // count total price
  const total = () => {
    let totalprice = 0;
    carts.map((ele, ind) => {
      totalprice = ele.qnty * ele.price + totalprice;
    });
    setPrice(totalprice);
  };

  // count total quantity
  const countquantity = () => {
    let totalquantity = 0;
    carts.map((ele, ind) => {
      totalquantity = ele.qnty + totalquantity;
    });
    setTotalQuantity(totalquantity);
  };

  useEffect(() => {
    total();
  }, [total]);

  useEffect(() => {
    countquantity();
  }, [countquantity]);
  return (
    <>
      <div
        className={`${
          currentTheme === "light"
            ? "bg-[#EEEEEE] text-[#222831]"
            : "bg-[#31363F] text-[#EEEEEE] "
        } mt-14 w-screen min-h-[91vh]`}
      >
        <div
          onClick={Togglefn}
          className={`fixed z-10 flex justify-center items-center align-middle bottom-10 right-10 w-10 h-10 ${
            currentTheme === "light" ? "bg-[#F2E8C6] " : "bg-[#952323]"
          } rounded-[50%] cursor-pointer`}
        >
          <button>
            {currentTheme === "light" ? <MdDarkMode /> : <MdOutlineDarkMode />}
          </button>
        </div>
        <div className="flex justify-center items-center w-full h-full w-min-screen h-min-screen ">
          <div className="flex flex-col w-[700px] ">
            <div
              className={` ${
                currentTheme === "light" ? "bg-gray-400" : " bg-[#756b6a]"
              } flex justify-between items-center h-10 p-6 rounded-md mt-10`}
            >
              <h5>
                Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}
              </h5>
              {carts.length > 0 ? (
                <button onClick={emptycart} className=" flex items-center">
                  <FaTrash />
                  <span className=" pl-2">EmptyCart</span>
                </button>
              ) : (
                ""
              )}
            </div>
            <div className=" border-black border-2 rounded-b-md w-full mb-10">
              {carts.length === 0 ? (
                <table>
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div
                          className={`${
                            currentTheme === "light"
                              ? "bg-gray-200"
                              : " bg-[#665c5c]"
                          } w-[694px] rounded-b-md flex justify-center items-center gap-5 h-28`}
                        >
                          <FaShoppingCart />
                          <p>Your Cart Is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table
                  className={`w-full py-2 ${
                    currentTheme === "light" ? "bg-gray-100" : " bg-[#9e8f8e]"
                  } rounded-b-md`}
                >
                  <thead className=" border-b-2">
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>
                        <span id="amount">Total Amount</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <td className=" flex justify-center">
                              <button onClick={() => handleDecrement(data.id)}>
                                <FaTrash />
                              </button>
                            </td>
                            <td>
                              <div className=" flex justify-center w-18 h-12">
                                <img
                                  src={data.imgdata}
                                  alt=""
                                  className=" w-[80px] rounded-sm pr-4 pl-2"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="pl-4">
                                <p>{data.dish.charAt(0).toUpperCase() + data.dish.slice(1)}</p>
                              </div>
                            </td>
                            <td>₹{data.price}</td>
                            <td>
                              <div className=" flex justify-center gap-4">
                                <button
                                  type="button"
                                  onClick={
                                    data.qnty <= 1
                                      ? () => handleDecrement(data.id)
                                      : () => handlesingleDecrement(data)
                                  }
                                >
                                  <FaMinus />
                                </button>
                                <input
                                  type="text"
                                  value={data.qnty}
                                  disabled
                                  name=""
                                  id=""
                                  className={` w-2 ${
                                    currentTheme === "light"
                                      ? "bg-gray-100"
                                      : " bg-[#9e8f8e]"
                                  }`}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleIncrement(data)}
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            </td>
                            <div className=" flex justify-center pt-2">
                              <td>₹ {data.qnty * data.price}</td>
                            </div>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>
                        Items in cart <span>:</span>
                        <span>{totalquantity}</span>
                      </th>
                      <th>
                        Total Price<span>:</span>
                        <span>₹ {totalprice}</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;

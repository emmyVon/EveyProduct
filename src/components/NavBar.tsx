import { memo, useState } from "react";
import { Search } from "./Search";
import { productdetails } from "../utils/type";
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

import { Filter } from "./Filter";

export const NavBar = memo(
  ({
    arr,
    setproduct,
    origin,
  }: {
    arr: productdetails[] | undefined;
    setproduct: (items: productdetails[]) => void;
    origin: productdetails[] | undefined;
  }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [selections, setSelections] = useState({
      category: "",
      min_price: 0,
      max_price: 1000,
    });
    const location = useLocation();

    const isProductsPage = location.pathname === "/";
    const toggleMenu = () => {
      if (openMenu) {
        document.body.style.overflow = "scroll";
      } else {
        document.body.style.overflow = "hidden";
      }
      setOpenMenu((prev) => !prev);
    };
    return (
      <nav className=" w-[100vw] bg-[#171d25]  sticky top-0 z-30 left-0 right-0">
        <div className="bg-black">
          {openMenu && (
            <div
              className="absolute top-[5rem] z-10 inset-0 h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-600/50 to-gray-500/50"
              onClick={toggleMenu}
            />
          )}
          <div
            className={` container  ${
              isProductsPage ? "flex-col lg:gap-3" : ""
            } flex md:flex-row justify-between  w-full h-full items-center`}
          >
            <Link
              to={"/"}
              className={`text-white text-lg lg:text-2xl font-bold ${
                isProductsPage ? "" : "flex-1"
              }`}
            >
              <h1>MORESTORE</h1>
            </Link>
            <div
              className={` ${
                isProductsPage
                  ? "w-full flex-2 flex gap-2 items-center justify-between"
                  : ""
              }`}
            >
              {isProductsPage && (
                <Search
                  arr={arr}
                  origin={origin}
                  setproduct={setproduct}
                  selection={selections}
                />
              )}
              <IoIosMenu
                className="text-white text-xl flex lg:hidden cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
            <ul
              className={`flex  justify-center flex-1 gap-3 text-white ${
                openMenu ? "openmenu" : "hide "
              }`}
            >
              {openMenu && <div onClick={toggleMenu}>x</div>}
              <Link
                to="/"
                onClick={() => {
                  setOpenMenu(false);
                  document.body.style.overflow = "scroll";
                }}
              >
                <li>Home</li>
              </Link>
              <Link
                to="/"
                onClick={() => {
                  setOpenMenu(false);
                  document.body.style.overflow = "scroll";
                }}
              >
                <li>Inventory</li>
              </Link>
              <Link
                to="/"
                onClick={() => {
                  setOpenMenu(false);
                  document.body.style.overflow = "scroll";
                }}
              >
                <li>About-us</li>
              </Link>
            </ul>
          </div>
        </div>
        {isProductsPage && (
          <div className="container relative  w-full flex justify-end">
            <Filter
              arr={arr}
              setproduct={setproduct}
              origin={origin}
              selections={selections}
              setSelections={setSelections}
            />
          </div>
        )}
      </nav>
    );
  }
);

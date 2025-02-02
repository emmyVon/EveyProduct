import { memo, useState } from "react";
import { Search } from "./Search";
import { productdetails } from "../utils/type";
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

export const NavBar = memo(
  ({
    arr,
    setproduct,
  }: {
    arr: productdetails[] | null;
    setproduct: (items: productdetails[]) => void;
  }) => {
    const [openMenu, setOpenMenu] = useState(false);
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
      <nav className="bg-black  h-[5rem] fixed top-0 z-30 left-0 right-0">
        {openMenu && (
          <div
            className="absolute top-[5rem] z-10 inset-0 h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-600/50 to-gray-500/50"
            onClick={toggleMenu}
          />
        )}
        <div
          className={` container ${
            isProductsPage ? "flex-col" : ""
          } flex md:flex-row justify-between w-full h-full items-center`}
        >
          <Link to={"/"}>
            <h1 className="text-white text-lg lg:text-2xl font-bold flex-1">
              MORESTORE
            </h1>
          </Link>
          <div
            className={` ${
              isProductsPage
                ? "w-full flex-2 flex gap-2 items-center justify-between"
                : ""
            }`}
          >
            {isProductsPage && <Search arr={arr} setproduct={setproduct} />}
            <IoIosMenu
              className="text-white text-xl flex lg:hidden cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <ul
            className={`flex w-full justify-center flex-1 gap-3 text-white ${
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
      </nav>
    );
  }
);

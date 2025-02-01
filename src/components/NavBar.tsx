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
    return (
      <nav className="bg-black  h-[5rem]">
        <div className=" container flex-col flex md:flex-row justify-between w-full h-full items-center">
          <h1 className="text-white text-lg lg:text-2xl font-bold flex-1">
            MORESTORE
          </h1>
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
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          </div>
          <ul
            className={`flex w-full justify-center flex-1 gap-3 text-white ${
              openMenu ? "openmenu" : "hide "
            }`}
          >
            {openMenu && <div>x</div>}
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/">
              <li>Inventory</li>
            </Link>
            <Link to="/">
              <li>About-us</li>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
);

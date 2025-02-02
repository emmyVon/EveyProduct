import { useEffect, useState } from "react";
import { productdetails } from "../utils/type";
import { IoIosArrowDown } from "react-icons/io";
import { handleFiltration } from "../utils/Helpers";
import { MdOutlineFilterList } from "react-icons/md";

export const Filter = ({
  arr,
  origin,
  setproduct,
  selections,
  setSelections,
}: {
  arr: productdetails[] | undefined;
  origin: productdetails[] | undefined;
  setproduct: (items: productdetails[]) => void;
  selections: { category: string; min_price: number; max_price: number };
  setSelections: React.Dispatch<
    React.SetStateAction<{
      category: string;
      min_price: number;
      max_price: number;
    }>
  >;
}) => {
  // Gets all Unique Categorys in products
  const AvailableCategories = origin?.reduce<string[]>((acc, curr) => {
    return !acc.includes(curr.category) ? [...acc, curr.category] : acc;
  }, []);

  const [openFilters, setOpenFilters] = useState(false);

  // toggles filter icon on small screen
  const toggleFilter = () => {
    setOpenFilters((prev) => {
      if (prev === true) {
        setSelections((prv) => ({
          ...prv,
          category: "",
          max_price: 1000,
          min_price: 0,
        }));
        return false;
      } else {
        return true;
      }
    });
  };

  // calls filter function after 1seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleFiltration(arr, origin, selections, setproduct);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [selections, arr]);

  return (
    <div>
      <label className="flex gap-2 bg-gray-600 text-white lg:hidden">
        <p>Filters</p>
        <MdOutlineFilterList onClick={toggleFilter} />
      </label>
      <div
        className={`top-full right-0 lg:w-min  w-full  flex  filter gap-3  rounded-lg ${
          openFilters ? "openmenu" : "hide"
        }`}
        style={{ paddingInline: "1rem", paddingBlock: "0.3rem" }}
      >
        <label className="">
          <p className="font-semibold text-xs lg:text-lg text-gray-200">
            category filter
          </p>
          <div className="relative">
            <select
              aria-placeholder="category"
              id="categoryselect"
              className="flex-1 outline-none relative appearance-none cursor-pointer text-sm lg:text-lg font-medium bg-white border rounded-lg"
              style={{ paddingRight: "1.4rem" }}
              value={selections.category}
              onChange={(e) =>
                setSelections((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="">Select</option>
              {AvailableCategories?.map((item) => (
                <option
                  value={item}
                  className="absolute bottom-0 cursor-pointer w-full hover:font-semibold rounded-lg bg-gray-300"
                >
                  {item}
                </option>
              ))}
            </select>
            <label
              htmlFor="categoryselect"
              className="absolute top-[25%] right-2 text-red cursor-pointer pointer-events-none"
            >
              <IoIosArrowDown />
            </label>
          </div>
        </label>
        <label className="">
          <p className="font-semibold text-xs lg:text-lg text-gray-200">
            Price Range
          </p>
          <div className="flex lg:flex-1 flex-2 gap-1">
            <input
              placeholder="Min"
              type="number"
              min={0}
              max={99910}
              className="form-control  rounded-lg focus:appearance-none font-medium"
              value={selections.min_price}
              onChange={(e) =>
                setSelections((prev) => {
                  return {
                    ...prev,
                    min_price:
                      parseFloat(e.target.value) > selections.max_price
                        ? selections.max_price
                        : Math.min(parseFloat(e.target.value), 99910),
                  };
                })
              }
            />
            <p className="text-lg text-white">-</p>
            <input
              type="number"
              placeholder="Max"
              className="form-control rounded-lg appearance-none font-medium"
              value={selections.max_price}
              onChange={(e) =>
                setSelections((prev) => {
                  return {
                    ...prev,
                    max_price: Math.max(
                      Math.min(parseFloat(e.target.value), 10000),
                      0
                    ),
                  };
                })
              }
            />
          </div>
        </label>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { productdetails } from "../utils/type";
import { IoIosArrowDown } from "react-icons/io";

export const Filter = ({
  arr,
  origin,
  setproduct,
}: {
  arr: productdetails[] | undefined;
  origin: productdetails[] | undefined;
  setproduct: (items: productdetails[]) => void;
}) => {
  const [selections, setSelections] = useState({
    category: "",
    min_price: 0,
    max_price: 1000,
  });
  const AvailableCategories = origin?.reduce<string[]>((acc, curr) => {
    return !acc.includes(curr.category) ? [...acc, curr.category] : acc;
  }, []);
  const handlefiltration = () => {
    if (!arr || !origin) return;
    const copyArray = [...arr];

    if (
      selections.category &&
      selections.min_price <= 0 &&
      selections.max_price >= 1000
    ) {
      const product = copyArray.filter(
        (item) => item.category === selections.category
      );
      setproduct(product.length > 0 ? product : origin);
    } else if (
      !selections.category &&
      ((selections.min_price >= 0 && selections.max_price <= 1000) ||
        (selections.min_price === 0 && selections.max_price < 1000))
    ) {
      const product = copyArray.filter(
        (item) =>
          item.price >= selections.min_price &&
          item.price <= selections.max_price
      );
      setproduct(product.length > 0 ? product : origin);
    } else if (
      selections.category &&
      ((selections.min_price >= 0 && selections.max_price <= 1000) ||
        (selections.min_price === 0 && selections.max_price < 1000))
    ) {
      const product = copyArray.filter((item) => {
        return (
          item.category === selections.category &&
          item.price >= selections.min_price &&
          item.price <= selections.max_price
        );
      });
      setproduct(product.length > 0 ? product : origin);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handlefiltration();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [selections]);
  return (
    <div
      className="  lg:w-min w-full flex-1 flex justify-between filter gap-5 lg:self-end rounded-lg"
      style={{ paddingInline: "1rem", paddingBlock: "0.3rem" }}
    >
      <label htmlFor="">
        <p className="font-semibold text-gray-200">category filter</p>
        <div className="relative">
          <select
            className="flex-1 outline-none relative appearance-none cursor-pointer  font-medium bg-white border rounded-lg"
            style={{ paddingRight: "1.4rem" }}
            value={selections.category}
            onChange={(e) =>
              setSelections((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">Select a Category</option>
            {AvailableCategories?.map((item) => (
              <option
                value={item}
                className="absolute bottom-0 cursor-pointer w-full hover:font-semibold rounded-lg bg-gray-300"
              >
                {item}
              </option>
            ))}
          </select>
          <IoIosArrowDown className="absolute top-1/3 right-2" />
        </div>
      </label>
      <label>
        <p className="font-semibold text-gray-200">Price Range</p>
        <div className="flex flex-1 gap-3">
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
  );
};

import { useEffect, useState, useCallback } from "react";
import { productdetails } from "../utils/type";
import { CiSearch } from "react-icons/ci";
import { handleFiltration } from "../utils/Helpers";

export const Search = ({
  delay = 2000,
  arr,
  setproduct,
  origin,
  selection,
}: {
  delay?: number;
  origin: productdetails[] | undefined;
  arr: productdetails[] | undefined;
  setproduct: (items: productdetails[]) => void;
  selection: { category: string; min_price: number; max_price: number };
}) => {
  const [searchterm, setSearchTerm] = useState("");
  const searchItem = useCallback(
    (arr: productdetails[] | undefined, text: string) => {
      console.log(arr);
      if (!arr) return;
      //   if (text.trim() === "") return arr;
      const productClone = [...arr];
      const matchProduct = productClone.filter(
        (item) =>
          item.title.toLowerCase().includes(text.toLowerCase().trim()) ||
          item.description.toLowerCase().includes(text.toLowerCase().trim())
      );
      handleFiltration(matchProduct, origin, selection, setproduct);

      // setproduct(matchProduct.length > 0 ? matchProduct : arr);

      return matchProduct.length > 0 ? matchProduct : arr;
    },
    [searchterm]
  );
  useEffect(() => {
    const debounce = setTimeout(() => {
      searchItem(arr, searchterm);
    }, delay);
    return () => clearTimeout(debounce);
  }, [searchterm, delay, arr, searchItem]);
  return (
    <div className="relative flex-3 w-full">
      <input
        className="rounded-2xl border outline-none w-full border-gray-400  bg-white"
        style={{ paddingLeft: "1.2rem", paddingBlock: "0.4rem" }}
        type="text"
        value={searchterm}
        disabled={!arr || arr.length === 0}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Anything"
      />
      <CiSearch
        className="absolute right-4 top-1/4 cursor-pointer"
        size={20}
        onClick={() => {
          searchItem(arr, searchterm);
        }}
      />
    </div>
  );
};

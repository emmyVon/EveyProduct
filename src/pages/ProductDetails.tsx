import { useQuery } from "@tanstack/react-query";

import { Link, useParams } from "react-router-dom";
import { productdetails } from "../utils/type";
import { StarRating } from "../components/StarRating";
import { IoMdArrowBack } from "react-icons/io";

export const ProductDetails = () => {
  const { id } = useParams();

  const fetchProduct = async (): Promise<productdetails> => {
    const request = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!request.ok)
      throw new Error("There was an error with your Request, Try Again!!!");
    return await request.json();
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["singleproduct"],
    queryFn: () => fetchProduct(),
  });

  if (isLoading)
    return (
      <p className="h-[90vh] text-white opacity-80 grid place-items-center w-screen font-bold text-2xl">
        Loading...
      </p>
    );

  if (isError)
    return (
      <div className="h-[90vh] grid text-white place-items-center w-screen">
        <div>
          <h3 className="font-bold text-2xl ">Error fetching data</h3>
          <p className="opacity-80 ">
            {error?.message} <span>check your connection and try again</span>
          </p>
        </div>
      </div>
    );
  if (data) {
    console.log(data);
    const { title, image, category, price, description, rating } = data;
    return (
      <div className="single-p ">
        <Link
          to={"/"}
          className="flex gap-2 text-white  items-center text-xl"
          style={{ marginBottom: "1.5rem" }}
        >
          <IoMdArrowBack /> Back
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  overflow-auto h-screen">
          <div className="max-h-[calc(50vh-5rem)] lg:max-h-[calc(70vh-5rem)] bg-gray-600">
            <img
              src={image}
              alt="product"
              className="object-fit-cover h-full w-full"
            />
          </div>
          <div className="flex flex-col text-white items-center lg:items-start gap-3 w-full lg:w-3/4 ">
            <h2 className="font-medium">{category}</h2>
            <h3 className="font-semibold text-xl lg:text-3xl">{title}</h3>
            <p className="font-semibold text-2xl">${price}</p>
            <div className="text-sm lg:text-lg items-center gap-1 flex ">
              <StarRating rating={rating?.rate || 0} />
              <p>
                {rating.rate || 0} <span>({rating?.count} Reviews)</span>
              </p>
            </div>
            <p className="text-lg lg:text-xl text-center lg:text-left opacity-80 leading-8">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

// import React from "react";

// export const ProductDetails = () => {
//   return <div>heloo</div>;
// };

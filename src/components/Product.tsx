import { FaStar } from "react-icons/fa6";
import { productdetails } from "../utils/type";
import { Link } from "react-router-dom";

export const Product = ({
  id,
  image: media,
  title,
  price,
  rating,
  category,
}: productdetails) => {
  return (
    <Link
      to={`/products/${id}`}
      className="bg-white rounded-lg w-full cursor-pointer lg:max-w-[30rem] product max-h-[30rem]"
    >
      <div className="flex flex-col h-full ">
        <div className="flex-2 max-h-[60%] w-full">
          <img src={media} className="object-fit w-full h-full" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-end ">
          <p>{category}</p>
          <p className="text-lg font-semibold opacity-70">{title}</p>
          <p className="font-semibold">${price}</p>
          <div className="flex gap-3 items-center">
            <FaStar className="text-yellow-400" />
            <p className="font-semibold">
              {rating.rate}{" "}
              <span className="font-medium opacity-80">
                ({rating.count} reviews)
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

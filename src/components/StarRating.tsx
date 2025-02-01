import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";

export const StarRating = ({ rating }: { rating: number }) => {
  const [fullStars, decimalPart] = rating
    .toString()
    .split(".")
    .map((num) => Number(num));
  const hasHalfStar = decimalPart >= 1 && decimalPart <= 9;
  const totalStars = 5;

  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar key={i} />
      ))}

      {hasHalfStar && <FaRegStarHalfStroke />}

      {Array.from(
        { length: totalStars - fullStars - (hasHalfStar ? 1 : 0) },
        (_, i) => (
          <FaRegStar key={i + fullStars + 1} />
        )
      )}
    </div>
  );
};

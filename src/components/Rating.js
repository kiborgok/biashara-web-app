import React from "react";
import Rating from "react-rating";
import { Star, StarFill } from "react-bootstrap-icons";

export default function RatingApp({ rating, setRating }) {
  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <Rating
      onClick={handleRating}
      initialRating={rating}
      emptySymbol={<Star color="orange" size={30} />}
      fullSymbol={<StarFill color="orange" size={30} />}
    />
  );
}

import React, { useState } from "react";
import Rating from "react-rating";
import { Star, StarFill } from "react-bootstrap-icons";

export default function RatingApp() {
  const [rating, setRating] = useState(0); // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    console.log(rate);
    setRating(rate);
    // other logic
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

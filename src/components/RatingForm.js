import React, { useContext, useState } from "react";
import { addRating } from "../api/businessApi";
import useUser from "../hooks/useUser";
import Rating from "./Rating";

export default function RatingForm({ item }) {
  const user = useUser()
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  async function adRating() {
    await addRating({
      business_id: item.id,
      rate: rating,
      comment: comment,
      user_id: user.userId
    });
  }
  function handleSubmit(e) {
    e.preventDefault();

    adRating();
  }
  return (
    <div className="min-h-screen bg-white-300 py-6 flex flex-col justify-center sm:py-12">
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div className="px-12 pb-5">
            <h2 className="text-gray-800 text-2xl font-semibold">
              Your opinion matters to us!
            </h2>
          </div>
          <div className="bg-gray-200 w-full flex flex-col items-center">
            <div className="flex flex-col items-center py-6 space-y-3">
              <span className="text-lg text-gray-800">
                How was the quality of our service ?
              </span>
              <Rating rating={rating} setRating={setRating} />
            </div>
            <form className="w-3/4 flex flex-col" onSubmit={handleSubmit}>
              <textarea
                rows="3"
                className="p-4 text-gray-500 rounded-xl resize-none"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
              >
                Rate now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

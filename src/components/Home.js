// import ItemOverlay from "./ItemOverlay";
import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import { Star, StarFill } from "react-bootstrap-icons";
import LoadingComponent from "./LoadingComponent";

import ItemDetails from "./ItemDetails";
import Header from "./Header";
import { getBusinesses, getRatings } from "../api/businessApi";

export function RatingApp({ initialRating }) {
  return (
    <Rating
      emptySymbol={<Star color="orange" size={20} />}
      fullSymbol={<StarFill color="orange" size={20} />}
      readonly={true}
      initialRating={initialRating}
    />
  );
}

function Home() {
  const [businesses, setBusinesses] = useState([]);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchRatings() {
    const ratings = await getRatings();
    setRatings(ratings);
  }

  async function fetchBusinesses() {
    const data = await getBusinesses();
    setBusinesses(data);
  }

  useEffect(() => {
    fetchBusinesses();
  }, []);

  useEffect(() => {
    fetchRatings();
  }, []);
  function dedupe(list) {
    const mergedList = list.reduce((arr, obj, index) => {
      index = arr.findIndex((el) => el.id === obj.id);
      if (index !== -1) {
        const key = Object.keys(obj)[1];
        arr[index][key] = obj[key];
      } else {
        arr = [...arr, obj];
      }
      return arr;
    }, []);
    return mergedList;
  }
  const duplicateCategories = businesses.map(business => business.category_id)
  const categoriesToDisplay = dedupe(duplicateCategories)
  const businessesToDisplay = businesses.filter(business => business.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <main>
      <Header search={search} setSearch={setSearch} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {businesses.length === 0 && (
                <LoadingComponent />
              )}
              {categoriesToDisplay.map((category) => (
                <div
                  key={category.id}
                  className="max-w-2xl mx-auto pb-16 sm:pb-24 lg:pb-24 lg:max-w-none"
                >
                  <h2 className="text-2xl font-extrabold text-yellow-300">
                    {category.name}
                  </h2>
                  <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
                    {businessesToDisplay.map((business) => {
                      const businessRating = business.reviews
                        .map((review) => review ? review.rate : 0)
                        .reduce((prev, curr) => prev + curr, 0);
                      const rate = Math.floor(
                        businessRating / business.reviews.length
                      );
                      return category.name === business.category_id.name ? (
                        <div
                          key={business.id}
                          className="group relative bg-violet-100"
                          onClick={() => {
                            setItem(business);
                            setShow((show) => !show);
                          }}
                        >
                          <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                            <img
                              src={business.image_url}
                              alt={business.name}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="flex flex-col p-2">
                            <p className="mt-6 text-base font-semibold text-gray-900">
                              {business.name}
                            </p>
                            <h3 className="mt-3 text-sm text-gray-500">
                              <span className="absolute inset-0" />
                              {`${business.description.slice(0, 70)} ...`}
                            </h3>

                            <p
                              className="flex mt-2 items-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="mr-1 text-gray-400 text-lg">
                                {Number.isNaN(rate)
                                  ? 0
                                  : rate > 0
                                  ? `${rate}.0`
                                  : rate}
                              </span>
                              <span>{<RatingApp initialRating={rate} />}</span>{" "}
                              <span className="ml-2 text-gray-400">
                                (
                                {business.reviews.length === 1
                                  ? `${business.reviews.length} Review`
                                  : `${business.reviews.length} Reviews`}
                                )
                              </span>
                            </p>
                            <div className="flex justify-end mt-3">
                              <button className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full">
                                See More
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
        {show ? (
          <ItemDetails
            setShow={setShow}
            show={show}
            item={item}
            ratings={ratings}
          />
        ) : null}

        {/* /End replace */}
      </div>
    </main>
  );
}

export default Home;

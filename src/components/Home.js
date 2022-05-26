// import ItemOverlay from "./ItemOverlay";
import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import { Star, StarFill } from "react-bootstrap-icons";

import ItemDetails from "./ItemDetails";
import Header from "./Header";
import { getCategories } from "../api/categoryApi";
import { getBusinesses } from "../api/businessApi";

function RatingApp({ initialRating }) {
  return (
    <Rating
      emptySymbol={<Star color="orange" size={30} />}
      fullSymbol={<StarFill color="orange" size={30} />}
      readonly={true}
      initialRating={initialRating}
    />
  );
}

function Home() {
  const [categories, setCategories] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  async function fetchCategories() {
    const categories = await getCategories();
    setCategories(categories);
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  async function fetchBusinesses() {
    const data = await getBusinesses();
    setBusinesses(data);
  }

  useEffect(() => {
    fetchBusinesses();
  }, []);
  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="max-w-2xl mx-auto pb-16 sm:pb-24 lg:pb-24 lg:max-w-none"
                >
                  <h2 className="text-2xl font-extrabold text-gray-900">
                    {category.name}
                  </h2>
                  <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
                    {businesses.map((business) => {
                      return (category.name === business.category.name) 
                        ? (
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
                                src={business.image}
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
                                  {business.rating > 0
                                    ? `${business.rating}.0`
                                    : business.rating}
                                </span>
                                <span>
                                  {
                                    <RatingApp
                                      initialRating={business.rating}
                                    />
                                  }
                                </span>{" "}
                                <span className="ml-2 text-gray-400">(23)</span>
                              </p>
                              <div className="flex justify-end mt-3">
                                <button className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                  See More
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null
                      
                    })}
                  </div>{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
        {show ? (
          <ItemDetails setShow={setShow} show={show} item={item} />
        ) : null}

        {/* /End replace */}
      </div>
    </main>
  );
}

export default Home;

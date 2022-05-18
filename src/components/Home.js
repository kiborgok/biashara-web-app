// import ItemOverlay from "./ItemOverlay";
import React, { useState } from "react";
// import { Link } from "react-router-dom";

import ItemDetails from "./ItemDetails";
import ProfilePage from "./ProfilePage";
import Rating from "./Rating";

const callouts = [
  {
    name: "Quickmart is a homegrown supermarket established in 2006 with our first branch in Nakuru, Kenya.",
    description: "Quickmatt Supermarket",
    imageSrc: require("../images/quickmat.png"),
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    to: "/itemDetails",
    rating: <Rating />,
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc: require("../images/chandarana.jpg"),
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    to: "/itemDetails",
    rating: <Rating />,
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc: require("../images/naivas.png"),
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    to: "/itemDetails",
    rating: <Rating />,
  },
  {
    name: "Travel1",
    description: "Daily commute essentials",
    imageSrc: require("../images/uchumi.png"),
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    to: "/itemDetails",
    rating: <Rating />,
  },
  {
    name: "Travel2",
    description: "Daily commute essentials",
    imageSrc: require("../images/naivas.png"),
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    to: "/itemDetails",
    rating: <Rating />,
  },
];
function Home() {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Replace with your content */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-24 lg:max-w-none">
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Collections
                </h2>
                <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
                  {callouts.map((callout) => (
                    <div
                      key={callout.name}
                      className="group relative bg-violet-100"
                      onClick={() => {
                        setItem(callout);
                        setShow((show) => !show);
                      }}
                    >
                      <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        <img
                          src={callout.imageSrc}
                          alt={callout.imageAlt}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="flex flex-col p-2">
                        <p className="mt-6 text-base font-semibold text-gray-900">
                          {callout.description}
                        </p>
                        <h3 className="mt-3 text-sm text-gray-500">
                          <span className="absolute inset-0" />
                          {callout.name}
                        </h3>

                        <p
                          className="flex mt-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{callout.rating}</span>{" "}
                          <span className="ml-2 text-gray-400">(23)</span>
                        </p>
                        <div className="flex justify-end mt-3">
                          <button className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            See More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>{" "}
              </div>
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

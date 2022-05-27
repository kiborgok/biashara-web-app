import React, { useEffect, useState } from "react";
import { getBusinesses } from "../../api/businessApi";
import { getCategories } from "../../api/categoryApi";
function Dashboard() {
  const [businesses, setBusinesses] = useState([]);
  async function fetchBiz() {
    try {
      const bizz = await getBusinesses();
      setBusinesses(bizz);
    } catch (error) {}
  }
  const [categories, setCategories] = useState([]);
  async function fetchCategories() {
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {}
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchBiz();
  }, []);
  return (
    <div className="container items-center px-4 py-8 m-auto mt-5">
      <div className="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">
        <div className="w-full p-2 lg:w-1/4 md:w-1/2">
          <div className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
            <div className="flex flex-row justify-between items-center">
              <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 group-hover:text-gray-50"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">
              {businesses.length === 0 ? "Loading..." : businesses.length}
            </h1>
            <div className="flex flex-row justify-between group-hover:text-gray-200">
              <p>Registered businesses</p>
            </div>
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/4 md:w-1/2">
          <div className="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
            <div className="flex flex-row justify-between items-center">
              <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 group-hover:text-gray-50"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">
              {categories.length === 0 ? "Loading..." : categories.length}
            </h1>
            <div className="flex flex-row justify-between group-hover:text-gray-200">
              <p>Registered categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

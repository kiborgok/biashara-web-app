import { useState, useEffect } from "react";
import { getCategories } from "../../api/categoryApi";
import { addBusiness, getBusinesses } from "../../api/businessApi";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../api/firebaseConfig";

export default function BusinessesTable() {
  const [businesses, setBusinesses] = useState([]);
  const [services, setServices] = useState([]);
  const [business, setBusiness] = useState({
    category: {
      id: "NULL",
      name: "SELECT CATEGORY",
    },
    name: "",
    description: "",
    services: "",
  });

  const [categories, setCategories] = useState([business.category]);

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const storage = getStorage(app);

  function handleChange(e) {
    let { name, value } = e.target;
    value = name === "category" ? JSON.parse(value) : value;
    setBusiness({
      ...business,
      [name]: value,
    });
  }

  async function fetchCategories() {
    const data = await getCategories();
    setCategories([business.category, ...data]);
  }

  async function fetchBusinesses() {
    const data = await getBusinesses();
    setBusinesses(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  function handleImageChange(e) {
    e.preventDefault();
    const file = e.target?.files[0];

    if (!file) return alert("Input an image");

    const storageRef = ref(storage, `biz-photos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (business.category.id === "NULL") return alert("Select category please");
    if (!imgUrl) return alert("Please choose an image");
    if (services.length === 0) return alert("Add atleast 1 service you provide");
    const businessObj = {
      ...business,
      category_id: business.category.id,
      image_url: imgUrl,
      services,
      rating: 0,
    };
    const response = await addBusiness(businessObj);
    console.log(response)
    setBusinesses([...businesses, response]);
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <form
        className="mb-8 space-y-4 w-full md:w-2/4 lg:w-2/5"
        onSubmit={handleSubmit}
      >
        <div className="rounded-md shadow-sm space-y-2">
          <h1 className="py-3 text-lg">Create Business</h1>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              id="default_size"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {progresspercent > 0 && progresspercent < 100 ? (
              <span className="text-red-600">
                {`Uploading... ${progresspercent}%`}
              </span>
            ) : progresspercent === 100 ? (
              <span className="text-green-600">Upload complete</span>
            ) : null}
          </div>
          <div>
            <label htmlFor="category-name">Select an option</label>
            <select
              name="category"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              id="category-name"
              value={JSON.stringify(business.category)}
              onChange={handleChange}
            >
              {categories.map((category) => {
                return (
                  <option
                    className="w-fit"
                    key={category.id}
                    value={JSON.stringify(category)}
                  >
                    {category.name.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="name" className="sr-only">
              Business name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              value={business.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Business description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              autoComplete="description"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Description"
              value={business.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="services" className="sr-only">
              Business services
            </label>
            <div className="flex">
              <input
                id="services"
                name="services"
                type="text"
                autoComplete="services"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="A service"
                value={business.services}
                onChange={handleChange}
              />
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if(business.services === "") return 
                  setServices((services) => [...services, business.services]);
                  setBusiness((business) => ({
                    ...business,
                    services: "",
                  }));
                }}
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
            <div className="flex">
              {services.map((service,index) => (
                <span
                  key={index}
                  className="text-green-400 border border-orange-300 p-2 rounded-md m-1"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="mb-7 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Business
          </button>
        </div>
      </form>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business) => (
            <tr
              key={business['id']}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {business['id']}
              </th>
              <td className="px-6 py-4">
                <img className="h-10 w-10 rounded-full" src={business.image_url} alt={business.name}/>
              </td>
              <td className="px-6 py-4">{business.name}</td>
              <td className="px-6 py-4">{business.category_id.name}</td>
              <td className="px-6 py-4">{business.description}</td>
              <td className="px-6 py-4 text-right">
                <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

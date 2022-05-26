import { useState, useEffect } from "react";
import { addCategory, getCategories } from "../../api/categoryApi";
export default function CategoriesTable() {
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = await addCategory(name)
    setCategories([...categories, {id,name}])
  }
  async function fetchCategories() {
    const categories = await getCategories()
    setCategories(categories)
  }
  useEffect(() => {
    console.log(categories.length);
    categories.length === 0 && fetchCategories();
    
  }, [categories]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <form
        className="mb-8 space-y-4 w-full md:w-2/4 lg:w-2/5"
        onSubmit={handleSubmit}
      >
        <div className="rounded-md shadow-sm -space-y-px">
          <h1 className="py-3 text-lg">Create Category</h1>
          <div>
            <label htmlFor="category" className="sr-only">
              Business Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="category"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Category name"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="mb-7 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Category
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
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {category.id}
              </th>
              <td className="px-6 py-4">{ category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

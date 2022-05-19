function Header() {
  return (
    <header className="bg-white shadow">
      <div className="flex flex-col md:flex-row justify-between md: justify-center max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="m-2 text-center text-3xl font-bold text-gray-900">
          Biashara Hub
        </h1>

        <div className="flex items-center justify-center">
          <div className="flex border-2 rounded">
            <input
              type="text"
              className="px-4 py-2"
              placeholder="Search..."
            />
            <button className="flex items-center justify-center px-4 border-l">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

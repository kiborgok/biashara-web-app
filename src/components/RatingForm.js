import Rating from './Rating'
export default function RatingForm() {
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
                <Rating />
              </div>
              <div className="w-3/4 flex flex-col">
                <textarea
                  rows="3"
                  className="p-4 text-gray-500 rounded-xl resize-none"
                >
                  Leave a message, if you want
                </textarea>
                <button className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">
                  Rate now
                </button>
              </div>
            </div>
            {/* <div className="h-20 flex items-center justify-center">
              <Link to="#" className="text-gray-600">
                Maybe later
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    );
}
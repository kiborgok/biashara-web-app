/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationIcon } from "@heroicons/react/outline";
import RatingForm from "./RatingForm";
// import { UserContext } from "../context/UserContext";
import useUser from "../hooks/useUser";
import { RatingApp } from "./Home";

export function ItemDetails({ setShow, show, item, ratings }) {
  const user = useUser();
  const [open, setOpen] = useState(true);
  // const [itemData, setItemData] = useState(item);

  const cancelButtonRef = useRef(null);

  const owner = user
    ? ratings.find(
        (rating) =>
          rating.user_id === user.userId && rating.business_id === item.id
      )
    : null;
  console.log(owner);

  return (
    <Transition.Root show={open} as={Fragment} onClick={() => setShow(!show)}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div
                    className="flex justify-center sm:flex sm:items-start "
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <div className="max-w-sm rounded overflow-hidden shadow">
                        <img
                          className="w-full"
                          src={item.image_url}
                          alt="Sunset in the mountains"
                        />
                        <div className="px-6 py-4">
                          <div className="font-bold text-xl mb-2">
                            {item.name}
                          </div>
                          <p className="text-gray-700 text-base">
                            {item.description}
                          </p>
                        </div>

                        <div className="px-6 pt-4">
                          <div className="font-bold text-xl mb-3">
                            Services we offer
                          </div>
                          {item.services.map((service) => (
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                              {service}
                            </span>
                          ))}
                        </div>
                        {user ? (
                          owner ? null : (
                            <RatingForm item={item} />
                          )
                        ) : null}
                        <div className="px-6 py-4">
                          <div className="font-bold text-xl mb-2">Reviews</div>
                          <>
                            {ratings
                              .filter(
                                (review) =>
                                  review && review.business_id === item.id
                              )
                              .map((review) => (
                                <div
                                  key={review.id}
                                  className="border-2 border-orange-500 rounded-md px-2 py-2 my-2"
                                >
                                  <h4>
                                    <span className="font-bold">Rating:</span>{" "}
                                    <RatingApp initialRating={review.rate} />
                                  </h4>
                                  <h3>
                                    <span className="font-bold">Name:</span>{" "}
                                    {review.user.first_name}{" "}
                                    {review.user.last_name}
                                  </h3>
                                  <p>
                                    <span className="font-bold">Comment:</span>{" "}
                                    {review.comment}
                                  </p>
                                </div>
                              ))}
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ItemDetails;

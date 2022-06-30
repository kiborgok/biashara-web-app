import { Fragment, useContext, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import app from "../api/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useUser from "../hooks/useUser";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Sign Up", to: "/signup" },
  { name: "Sign In", to: "/signin" },
  { name: "Admin", to: "/admin" },
];
const userNavigation = [
  { name: "Your Profile", to: "#" },
  { name: "Sign out", to: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ showProfile, setShowProfile }) {
  const user = useUser()
  const auth = getAuth(app);
  const navigate = useNavigate();
  return (
    <Disclosure as="nav" className="bg-yellow-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://img.icons8.com/5686E1/androidL/2x/fitbit.png"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => {
                      return user &&
                        (item.to === "/admin" || item.to === "/") ? (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-red-600 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )
                          }
                          aria-current={({ isActive }) =>
                            isActive ? "page" : undefined
                          }
                        >
                          {item.name}
                        </NavLink>
                      ) : !user &&
                        (item.to === "/" ||
                          item.to === "/signin" ||
                          item.to === "/signup") ? (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-red-600 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )
                          }
                          aria-current={({ isActive }) =>
                            isActive ? "page" : undefined
                          }
                        >
                          {item.name}
                        </NavLink>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
              {user ? (
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              user
                                ? user.photo_url === ""
                                  ? "https://firebasestorage.googleapis.com/v0/b/biashara-hub.appspot.com/o/3599743.jpg?alt=media&token=190c1a9d-0465-4ac9-9959-9697da8a8c84"
                                  : user.photo_url
                                : "https://firebasestorage.googleapis.com/v0/b/biashara-hub.appspot.com/o/3599743.jpg?alt=media&token=190c1a9d-0465-4ac9-9959-9697da8a8c84"
                            }
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <NavLink
                                  onClick={() => {
                                    if (item.name === "Your Profile")
                                      return setShowProfile(!showProfile);
                                    else if (item.name === "Sign out") {
                                      if (item.name === "Sign out") {
                                        localStorage.removeItem("token");
                                        window.location.reload();
                                      }
                                    }
                                  }}
                                  to={item.to}
                                  className={({ isActive }) =>
                                    classNames(
                                      isActive ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )
                                  }
                                >
                                  {item.name}
                                </NavLink>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              ) : null}
              <div className="flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => {
                return user && (item.to === "/" || item.to === "/admin") ? (
                  <Disclosure.Button
                    key={item.name}
                    as={NavLink}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )
                    }
                    aria-current={({ isActive }) =>
                      isActive ? "page" : undefined
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                ) : !user &&
                  (item.to === "/" ||
                    item.to === "signin" ||
                    item.to === "signup") ? (
                  <Disclosure.Button
                    key={item.name}
                    as={NavLink}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )
                    }
                    aria-current={({ isActive }) =>
                      isActive ? "page" : undefined
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                ) : null;
              })}
            </div>
            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        user ? (
                          user.photo_url === "" ? (
                            "https://firebasestorage.googleapis.com/v0/b/biashara-hub.appspot.com/o/3599743.jpg?alt=media&token=190c1a9d-0465-4ac9-9959-9697da8a8c84"
                          ) : (
                            user.photo_url
                          )
                        ) : (
                          <h6>Loading...</h6>
                        )
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {""}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user ? user.email : <h6>Loading...</h6>}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      onClick={() => {
                        item.name === "Your Profile" &&
                          setShowProfile(!showProfile);
                        if (item.name === "Sign out"){
                          localStorage.removeItem("token");
                          window.location.reload()
                        }
                      }}
                      key={item.name}
                      as="a"
                      to={item.to}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            ) : null}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;

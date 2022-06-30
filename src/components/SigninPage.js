import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { signIn } from "../api/authApi";
import { Navigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import useUser from "../hooks/useUser";

function SigninPage() {
  const [, setToken] = useToken();
  const user = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setSigninData({
      ...signinData,
      [name]: value,
    });
  }

  async function loginUser() {
    setLoading(true);
    const response = await signIn(signinData);
    if (response && response.token) {
      await setToken(response.token);
      window.location.reload();
      setLoading(false);
    } else if(response && response.message) {
      setError(() => response.message);
      setLoading(false);
    } else {
      setError(() => "Check your internet connection and try again.");
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginUser();
  }

  if (user) return <Navigate to="/" />;

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://img.icons8.com/5686E1/androidL/2x/fitbit.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-2">
            {error ? <p className="text-red-600">{error}</p> : null}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-yellow-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
                value={signinData.email}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-yellow-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
                value={signinData.password}
              />
            </div>
          </div>

          <div className="flex items-center justify-between"></div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {loading ? "Processing..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

import { getAuth, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../api/firebaseConfig";
const auth = getAuth(app);
const storage = getStorage(app);

export default function ProfileContent() {
  const { user, setUser } = useContext(UserContext);
  const [progresspercent, setProgresspercent] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFirstName(user ? (!user.first_name ? "" : user.first_name) : "");
    setLastName(user ? (!user.last_name ? "" : user.first_name) : "");
    setEmail(user ? user.email : "");
  }, [user]);

  function updatePhoto(uri) {
    updateProfile(auth.currentUser, {
      photoURL: uri,
    })
      .then(() => {
        setUser({ ...user, photoURL: uri });
        setProfile("Profile updated successfully")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChange(e) {
    // console.log(e.target?.files[0].name);
    e.preventDefault();
    const file = e.target?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
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
          updatePhoto(downloadURL);
        });
      }
    );
  }

  function handleSubmit(e) {
    
    e.preventDefault();
    // setLoading(true);
    // const loginAndUpdate = async () => {
    //   await updateProfile(auth.currentUser, {
    //     displayName,
    //   })
    //     .then(() => {
    //       setLoading(false);
    //       setMsg("Display name updated successfully")
    //     })
    //     .catch((error) => {
    //       setLoading(false);
    //     });
    // };
    // loginAndUpdate();
  }

  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  {progresspercent > 0 && progresspercent < 100 ? (
                    <h2 className="text-orange-400">{progresspercent}%</h2>
                  ) : null}

                  {profile ? (
                    <h2 className="text-green-400">{profile}</h2>
                  ) : null}
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 flex items-center">
                    {!user ? (
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    ) : (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          user && user.photoURL !== null
                            ? user.photoURL
                            : "https://firebasestorage.googleapis.com/v0/b/biashara-hub.appspot.com/o/3599743.jpg?alt=media&token=190c1a9d-0465-4ac9-9959-9697da8a8c84"
                        }
                        alt="Profile"
                      />
                    )}
                    <input
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="default_size"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    {msg ? <h2 className="text-green-400">{msg}</h2> : null}
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                    />
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      disabled
                      type="text"
                      name="email-address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email-address"
                      autoComplete="email"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? "Saving" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}

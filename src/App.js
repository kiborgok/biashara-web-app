/* Requires Tailwind CSS v2.0+ */
import React, { useContext, useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import app from "./api/firebaseConfig";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

import "./App.css";
import LoginPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage";
import Admin from "./components/admin/Admin";
import { UserContext } from "./context/UserContect";

function App() {
  const auth = getAuth(app);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUser(user);
      } else {
        setLoading(false);
        setUser(null);
      }
    });
  }

  if (loading && !user)
    return (
      <div
        style={{
          backgroundColor: "smoke",
          position: "absolute",
          top: "0px",
          bottom: "0px",
          right: "0px",
          left: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );

  return (
    <>
      <div className="min-h-full">
        <NavBar showProfile={showProfile} setShowProfile={setShowProfile} />
        {showProfile ? (
          <ProfilePage
            showProfile={showProfile}
            setShowProfile={setShowProfile}
          />
        ) : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

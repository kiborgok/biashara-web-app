// import logo from './logo.svg';
/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

import "./App.css";
import LoginPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage";
// import ItemDetails from "./components/ItemDetails";

function App() {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <>
      <div className="min-h-full">
        <NavBar showProfile={showProfile} setShowProfile={setShowProfile} />
        <Header />
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
          {/* <Route path="/itemDetails" element={<ItemDetails />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;

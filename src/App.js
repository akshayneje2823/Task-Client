import "./app.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Routes } from 'react-router-dom'
import ShoppingCart from "./components/ShoppingCart";
import { useState } from "react";
import AppBarComp from "./components/Appbar";

const App = () => {



  return (
    <div>
       <AppBarComp />
      <Routes>
        <Route path="/" exact element={<Home  />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/signIn" element={<Login />} />

        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>

    </div>
  );
};

export default App;
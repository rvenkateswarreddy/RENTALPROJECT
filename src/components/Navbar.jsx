import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="logo text-lime-300 text-2xl">
        <Link to="/">RENTIFY</Link>
      </div>
      <div className="middle-links flex gap-5">
        <Link to="/" className="mx-2">
          Home
        </Link>
        <Link to="/services" className="mx-2">
          Services
        </Link>
        <Link to="/team" className="mx-2">
          Meet Our Team
        </Link>
        <Link to="/contact-us" className="mx-2">
          Contact Us
        </Link>
      </div>
      <div className="auth-links">
        <Link to="/login" className="mx-2">
          Login
        </Link>
        <Link to="/register" className="mx-2">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

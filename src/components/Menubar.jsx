import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Menubar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="logo text-lime-300 text-2xl">
        <Link to="/">RENTIFY</Link>
      </div>
      {user.isSeller ? (
        <div className="middle-links flex gap-5">
          <Link to="/seller/sellerhome" className="mx-2">
            Home
          </Link>
          <Link to="/seller/addproperty" className="mx-2">
            Addproperty
          </Link>
          <Link to="/seller/allproperties" className="mx-2">
            All Properties
          </Link>
          <Link to="/seller/sellerproperties" className="mx-2">
            Seller Property
          </Link>
          <Link to="/seller/interest" className="mx-2">
            Interest
          </Link>
          <Link to="/seller/likes" className="mx-2">
            Likes
          </Link>
        </div>
      ) : (
        <div className="middle-links flex gap-5">
          <Link to="/buyer/buyerhome" className="mx-2">
            Home
          </Link>
          <Link to="/buyer/buyerproperty" className="mx-2">
            Property
          </Link>
          <Link to="/buyer/buyerowner" className="mx-2">
            Owner
          </Link>
        </div>
      )}
      <div className="auth-links">
        <button onClick={handleLogout} className="btn text-white mx-2">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menubar;

import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <div
      style={{
        backgroundImage:
          "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzka0agigJYdMc3vuOuWVcx9Fu8-y49cGk-g&s",
        height: "90vh",
        backgroundSize: "cover",
      }}
    >
      <div className="text-white text-center pt-48 w-[100%] flex justify-center gap-24 items-center flex-col">
        <div>
          <h1 className="text-5xl font-bold mb-3">
            Welcome to Our {user.isSeller ? "Seller" : "Buyer"} Dashboard
          </h1>
          <p className="text-xl">
            Explore the best properties at your convenience.
          </p>
        </div>
        <div className="flex justify-center items-center ">
          <button className="bg-red-600 hover:bg-zinc-50 hover:text-black px-6 py-4 rounded-md">
            Explore all
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

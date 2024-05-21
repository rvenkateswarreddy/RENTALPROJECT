import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://rental-uq1z.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user data
        const user = JSON.parse(localStorage.getItem("user")); // Parse user data for navigation decision
        if (user.isSeller) {
          navigate("/seller"); // Navigate to Seller Dashboard
        } else {
          navigate("/buyer"); // Navigate to Buyer Dashboard
        }
      } else {
        throw new Error(data.message || "Unable to login");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Increase the padding and set a minimum width */}
      <div className="p-12 bg-white shadow-xl rounded-xl w-full max-w-[400px]">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

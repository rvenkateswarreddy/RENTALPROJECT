import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to handle loading
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when login starts
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
      setLoading(false); // Set loading to false once the response is received
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
      setLoading(false); // Ensure loading is false if there's an error
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-12 bg-white shadow-xl rounded-xl w-full max-w-[400px]">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

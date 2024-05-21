import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isSeller: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(
        "https://rental-uq1z.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unable to register");
      }
      alert("Registration successful, please log in.");
      console.log("registaration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      alert(error.toString());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-8 bg-white shadow-xl rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered w-[300px]"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered w-full"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input input-bordered w-full"
            value={userData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isSeller"
              checked={userData.isSeller}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
            <span className="ml-2">Register as a Seller</span>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home";
import Services from "./components/Services";
import Team from "./components/Team";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import SellerDashboard from "./components/SellerDashboard";
import BuyerDashboard from "./components/BuyerDashboard";
import Property from "./components/Property";
import SellerHome from "./components/SellerHome";
import Interest from "./components/Interest";
import Buyer from "./components/Buyer";
import AddingProperty from "./components/AddingProperty";
import { Toaster } from "react-hot-toast";
import BuyerOwner from "./components/BuyerOwner";
import LikedComponent from "./components/LikedComponent";
import Eachservice from "./components/Eachservice";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        {/* Common layout with Navbar */}
        <Route path="/" element={<LayoutWithNavbar />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:userId" element={<Eachservice />} />
          <Route path="team" element={<Team />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/seller" element={<SellerDashboard />}>
          <Route index element={<SellerHome />} /> {/* Corrected Path */}
          <Route path="sellerhome" element={<SellerHome />} />{" "}
          {/* Corrected Path */}
          <Route path="property" element={<Property />} />
          <Route path="interest" element={<Interest />} />
          <Route path="addproperty" element={<AddingProperty />} />
          <Route path="likes" element={<LikedComponent />} />
        </Route>

        {/* Buyer Dashboard */}
        <Route path="/buyer" element={<BuyerDashboard />}>
          <Route index element={<SellerHome />} />{" "}
          <Route path="buyerhome" element={<SellerHome />} />{" "}
          <Route path="buyerproperty" element={<Buyer />} />
          <Route path="buyerowner" element={<BuyerOwner />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
};

// Component that includes the Navbar
const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Renders the matched child route component. */}
    </>
  );
};

export default App;

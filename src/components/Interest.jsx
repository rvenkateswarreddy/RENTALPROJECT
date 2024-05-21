import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Interest = () => {
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [interestedBuyers, setInterestedBuyers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const response = await fetch(
      "https://rental-uq1z.onrender.com/api/properties",
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setProperties(data.properties);
    } else {
      toast.error("Failed to fetch properties: " + data.message);
    }
  };

  const fetchInterestedBuyers = async (propertyId) => {
    setSelectedPropertyId(propertyId);
    const response = await fetch(
      `https://rental-uq1z.onrender.com/api/properties/${propertyId}/interest`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    const data = await response.json();
    if (response.ok) {
      if (data.interestedBuyers.length > 0) {
        setInterestedBuyers(data.interestedBuyers);
      } else {
        toast("No interested buyers yet.", { icon: "👀" });
        setInterestedBuyers([]);
      }
      setShowModal(true);
    } else {
      toast.error("Failed to load interested buyers: " + data.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setInterestedBuyers([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Your Properties</h2>
        <div className="grid grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property._id}
              className="card bg-base-100 shadow-2xl mb-2 p-4 border-solid"
            >
              <h1 className="text-2xl text-blue-500 ">
                Title:{property.title}
              </h1>
              <h3 className="text-lg">Description:{property.description}</h3>
              <h3 className="text-lg">Price:{property.price}</h3>
              <h3 className="text-lg">Bedrooms:{property.bedrooms}</h3>
              <h3 className="text-lg">Location:{property.location}</h3>
              <h3 className="text-lg">Amenities:{property.amenities}</h3>
              <button
                className="btn btn-secondary mt-3"
                onClick={() => fetchInterestedBuyers(property._id)}
              >
                View Interested Buyers
              </button>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Interested Buyers
            </h3>
            <div className="mt-2">
              {interestedBuyers.length > 0 ? (
                interestedBuyers.map((buyer) => (
                  <p key={buyer._id}>
                    <h1>Email:{buyer.email}</h1>
                    <h1>Firstname:{buyer.firstName}</h1>
                    <h1>Firstname:{buyer.lastName}</h1>
                    <h1>PhoneNumber:{buyer.phone}</h1>
                  </p>
                ))
              ) : (
                <p>No interested buyers found.</p>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={handleCloseModal} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interest;

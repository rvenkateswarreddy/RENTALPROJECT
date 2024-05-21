import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const BuyerOwner = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);
  const [filters, setFilters] = useState({
    search: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
  });
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, [currentPage, filters]);

  const fetchProperties = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      page: currentPage,
      limit: propertiesPerPage,
      search: filters.search,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      bedrooms: filters.bedrooms,
    }).toString();

    const response = await fetch(
      `https://rental-uq1z.onrender.com/api/properties?${query}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      setProperties(data.properties);
    } else {
      toast.error("Failed to fetch properties: " + data.message);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewOwner = async (propertyId) => {
    const response = await fetch(
      `https://rental-uq1z.onrender.com/api/properties/${propertyId}/owner`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setSelectedOwner(data.owner);
      setShowOwnerModal(true);
    } else {
      toast.error("Failed to fetch owner details: " + data.message);
    }
  };

  const handleCloseModal = () => {
    setShowOwnerModal(false);
    setSelectedOwner(null);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Properties List</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search by title"
          value={filters.search}
          onChange={handleFilterChange}
          className="input input-bordered"
        />
        <input
          type="number"
          name="priceMin"
          placeholder="Min Price"
          value={filters.priceMin}
          onChange={handleFilterChange}
          className="input input-bordered"
        />
        <input
          type="number"
          name="priceMax"
          placeholder="Max Price"
          value={filters.priceMax}
          onChange={handleFilterChange}
          className="input input-bordered"
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={filters.bedrooms}
          onChange={handleFilterChange}
          className="input input-bordered"
        />
        <button onClick={fetchProperties} className="btn btn-primary">
          Apply Filters
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property._id} className="card bg-base-100 shadow-xl p-4">
            <img
              src="https://propmania.in/images/gallery/201710031105031270919089.jpg"
              alt=""
            />
            <h2 className="text-lg font-bold">{property.title}</h2>
            <h3 className="text-lg">description:{property.description}</h3>
            <h3 className="text-lg">price:{property.price}</h3>
            <h3 className="text-lg">bedrooms:{property.bedrooms}</h3>
            <h3 className="text-lg">bathrooms:{property.bathrooms}</h3>
            <h3 className="text-lg">location:{property.location}</h3>
            <h3 className="text-lg">amenities:{property.amenities}</h3>
            <button
              onClick={() => handleViewOwner(property._id)}
              className="btn btn-secondary"
            >
              View Owner
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="btn btn-outline"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          Previous
        </button>
        <button className="btn btn-outline" onClick={nextPage}>
          Next
        </button>
      </div>
      {showOwnerModal && selectedOwner && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white p-5 rounded shadow-lg">
            <h3 className="text-lg font-bold">Owner Details</h3>
            <p>FirstName: {selectedOwner.firstName}</p>
            <p>LastName: {selectedOwner.lastName}</p>
            <p>Email: {selectedOwner.email}</p>
            <p>Phone: {selectedOwner.phone}</p>
            <button onClick={handleCloseModal} className="btn mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerOwner;

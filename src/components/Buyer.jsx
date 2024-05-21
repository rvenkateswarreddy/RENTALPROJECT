import React, { useState, useEffect } from "react";

const Buyer = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6); // Adjust as needed
  const [filters, setFilters] = useState({
    search: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
  });

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
    if (response.ok) {
      setProperties(data.properties);
    } else {
      alert(data.message);
    }
    setLoading(false);
  };

  const handleExpressInterest = async (propertyId) => {
    const response = await fetch(
      `https://rental-uq1z.onrender.com/api/properties/${propertyId}/interest`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const data = await response.json();
    if (response.ok) {
      alert("Interest expressed successfully!");
    } else {
      alert(data.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleLikeProperty = async (propertyId) => {
    const response = await fetch(
      `https://rental-uq1z.onrender.com/api/properties/${propertyId}/like`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.ok) {
      // On successful like, re-fetch properties to get updated likes
      fetchProperties();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Properties List</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search by title"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          name="priceMin"
          value={filters.priceMin}
          onChange={handleFilterChange}
          placeholder="Min Price"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          name="priceMax"
          value={filters.priceMax}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleFilterChange}
          placeholder="Bedrooms"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={fetchProperties} className="btn btn-primary">
          Apply Filters
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleLikeProperty(property._id)}
                className="btn btn-primary"
              >
                Like ({property.likes || 0})
              </button>
              <button
                onClick={() => handleExpressInterest(property._id)}
                className="btn btn-secondary mt-2"
              >
                Express Interest
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="btn btn-outline"
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="btn btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Buyer;

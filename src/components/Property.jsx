import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);
  const [filters, setFilters] = useState({
    search: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
  });

  useEffect(() => {
    fetchProperties();
  }, [currentPage, filters]);

  const fetchProperties = async () => {
    const query = new URLSearchParams({
      ...filters,
      page: currentPage,
      limit: propertiesPerPage,
    }).toString();

    const response = await fetch(
      `https://rental-uq1z.onrender.com/api/properties?${query}`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setProperties(data.properties);
    } else {
      toast.error(data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showEditForm) {
      setCurrentProperty((prev) => ({ ...prev, [name]: value }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://rental-uq1z.onrender.com/api/properties/${currentProperty._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(currentProperty),
      }
    );
    const data = await response.json();
    if (response.ok) {
      fetchProperties();
      setShowEditForm(false);
      toast.success("Property updated successfully!");
    } else {
      toast.error(data.message);
    }
  };

  const startEdit = (property) => {
    setCurrentProperty(property);
    setShowEditForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      const response = await fetch(
        `https://rental-uq1z.onrender.com/api/properties/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (response.ok) {
        fetchProperties();
        toast.success("Property deleted successfully!");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    }
  };

  return (
    <div className="p-4">
      <div>
        <h2 className="text-xl font-semibold mb-3">Search Filters</h2>
        <input
          className="input input-bordered mb-2"
          type="text"
          name="search"
          placeholder="Search by title..."
          value={filters.search}
          onChange={handleInputChange}
        />
        <input
          className="input input-bordered mb-2"
          type="number"
          name="priceMin"
          placeholder="Minimum Price"
          value={filters.priceMin}
          onChange={handleInputChange}
        />
        <input
          className="input input-bordered mb-2"
          type="number"
          name="priceMax"
          placeholder="Maximum Price"
          value={filters.priceMax}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={() => fetchProperties()}>
          Apply Filters
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property._id} className="card bg-base-100 shadow-xl p-4">
            <h3 className="text-lg">{property.title}</h3>
            <h3 className="text-lg">description:{property.description}</h3>
            <h3 className="text-lg">price:{property.price}</h3>
            <h3 className="text-lg">bedrooms:{property.bedrooms}</h3>
            <h3 className="text-lg">bathrooms:{property.bathrooms}</h3>
            <h3 className="text-lg">location:{property.location}</h3>
            <h3 className="text-lg">amenities:{property.amenities}</h3>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => startEdit(property)}
                className="btn btn-success"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(property._id)}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="btn"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <button className="btn" onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
      {showEditForm && currentProperty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit Property
            </h3>
            <form onSubmit={handleSubmit} className="mt-2">
              <input
                className="input input-bordered w-full mb-2"
                type="text"
                name="title"
                placeholder="Title"
                value={currentProperty.title}
                onChange={handleInputChange}
              />
              <input
                className="input input-bordered w-full mb-2"
                type="text"
                name="description"
                placeholder="description"
                value={currentProperty.description}
                onChange={handleInputChange}
              />
              <input
                className="input input-bordered w-full mb-2"
                type="text"
                name="price"
                placeholder="price"
                value={currentProperty.price}
                onChange={handleInputChange}
              />
              <input
                className="input input-bordered w-full mb-2"
                type="text"
                name="bedrooms"
                placeholder="bedrooms"
                value={currentProperty.bedrooms}
                onChange={handleInputChange}
              />
              <input
                className="input input-bordered w-full mb-2"
                type="text"
                name="bathrooms"
                placeholder="bathrooms"
                value={currentProperty.bathrooms}
                onChange={handleInputChange}
              />
              <input
                className="input input-bordered w-full mb-2"
                type="text"
                name="location"
                placeholder="location"
                value={currentProperty.location}
                onChange={handleInputChange}
              />
              <input
                className="input input-bordered w-full mb-2"
                type="text"
                name="amenities"
                placeholder="amenities"
                value={currentProperty.amenities}
                onChange={handleInputChange}
              />

              <div className="flex justify-between mt-4">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => setShowEditForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Property;

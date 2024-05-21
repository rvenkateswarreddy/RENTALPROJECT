import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const SellerProperties = () => {
  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(5);
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
      ...filters,
      page: currentPage,
      limit: propertiesPerPage,
    }).toString();

    const response = await fetch(
      `https://rental-uq1z.onrender.com/api/properties/myproperties?${query}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const data = await response.json();
    console.log(data);
    setLoading(false);
    if (response.ok) {
      setProperties(data);
    } else {
      toast.error(data.message || "Failed to load properties");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    const response = await fetch(
      `https://rental-uq1z.onrender.com/api/properties/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (response.ok) {
      toast.success("Property deleted successfully");
      fetchProperties();
    } else {
      toast.error("Failed to delete property");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProperty({ ...currentProperty, [name]: value });
  };

  const handleEdit = (property) => {
    setCurrentProperty(property);
    setShowEditModal(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://rental-uq1z.onrender.com/api/properties/${currentProperty._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(currentProperty),
      }
    );
    if (response.ok) {
      toast.success("Property updated successfully");
      setShowEditModal(false);
      fetchProperties();
    } else {
      const data = await response.json();
      toast.error("Failed to update property: " + data.message);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Properties</h1>
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search properties"
          className="input input-bordered"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <input
          type="number"
          name="priceMin"
          placeholder="Min price"
          className="input input-bordered"
          value={filters.priceMin}
          onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
        />
        <input
          type="number"
          name="priceMax"
          placeholder="Max price"
          className="input input-bordered"
          value={filters.priceMax}
          onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          className="input input-bordered"
          value={filters.bedrooms}
          onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
        />
        <button onClick={fetchProperties} className="btn btn-primary">
          Apply Filters
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties &&
          properties.map((property) => (
            <div key={property._id} className="card bg-base-100 shadow-xl p-4">
              <img
                src="https://propmania.in/images/gallery/201710031105031270919089.jpg"
                alt=""
              />
              <h2 className="text-lg font-bold">{property.title}</h2>
              <h3 className="text-lg">Description: {property.description}</h3>
              <h3 className="text-lg">Price: {property.price}</h3>
              <h3 className="text-lg">Bedrooms: {property.bedrooms}</h3>
              <h3 className="text-lg">Location: {property.location}</h3>
              <h3 className="text-lg">Amenities: {property.amenities}</h3>
              <div className="flex justify-between">
                <button
                  className="btn btn-success"
                  onClick={() => handleEdit(property)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="btn"
        >
          Previous
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} className="btn">
          Next
        </button>
      </div>
      {showEditModal && currentProperty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white p-5 rounded shadow-lg">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit Property
            </h3>
            <form onSubmit={handleSubmitEdit} className="space-y-3 mt-2">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="input input-bordered w-full"
                value={currentProperty.title}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={currentProperty.description}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="input input-bordered w-full"
                value={currentProperty.price}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                className="input input-bordered w-full"
                value={currentProperty.bedrooms}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="input input-bordered w-full"
                value={currentProperty.location}
                onChange={handleInputChange}
              />
              <textarea
                name="amenities"
                placeholder="Amenities"
                className="textarea textarea-bordered w-full"
                value={currentProperty.amenities}
                onChange={handleInputChange}
              />
              <div className="flex justify-between">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                <button onClick={handleCloseModal} className="btn btn-error">
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

export default SellerProperties;

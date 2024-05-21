import React, { useState } from "react";
import toast from "react-hot-toast";

const AddingProperty = () => {
  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    amenities: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://rental-uq1z.onrender.com/api/properties",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(newProperty),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setNewProperty({
        title: "",
        description: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        location: "",
        amenities: "",
      });
      // Refresh the properties list after adding
      toast.success("Property added successfully!");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          className="input input-bordered w-full mb-2"
          type="text"
          name="title"
          placeholder="Title"
          value={newProperty.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          className="textarea textarea-bordered w-full mb-2"
          name="description"
          placeholder="Description"
          value={newProperty.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          className="input input-bordered w-full mb-2"
          type="number"
          name="price"
          placeholder="Price"
          value={newProperty.price}
          onChange={handleInputChange}
        />
        <input
          className="input input-bordered w-full mb-2"
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={newProperty.bedrooms}
          onChange={handleInputChange}
        />
        <input
          className="input input-bordered w-full mb-2"
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={newProperty.bathrooms}
          onChange={handleInputChange}
        />
        <input
          className="input input-bordered w-full mb-2"
          type="text"
          name="location"
          placeholder="Location"
          value={newProperty.location}
          onChange={handleInputChange}
        />
        <input
          className="input input-bordered w-full mb-2"
          type="text"
          name="amenities"
          placeholder="Amenities"
          value={newProperty.amenities}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddingProperty;

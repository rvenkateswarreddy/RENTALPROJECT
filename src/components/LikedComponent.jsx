import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LikedComponent = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchLikedProperties();
  }, []);

  const fetchLikedProperties = async () => {
    const response = await fetch(
      "https://rental-uq1z.onrender.com/api/properties/myproperties",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setProperties(data);
    } else {
      toast.error("Failed to fetch properties");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Liked Properties</h2>
      <div className="grid grid-cols-3 gap-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="card bg-base-100 shadow-xl p-4">
              <img
                src="https://propmania.in/images/gallery/201710031105031270919089.jpg"
                alt=""
              />
              <h3 className="text-lg font-bold">{property.title}</h3>
              <h3 className="text-lg">description:{property.description}</h3>
              <h3 className="text-lg">price:{property.price}</h3>
              <h3 className="text-lg">bedrooms:{property.bedrooms}</h3>
              <h3 className="text-lg">bathrooms:{property.bathrooms}</h3>
              <h3 className="text-lg">location:{property.location}</h3>
              <h3 className="text-lg">amenities:{property.amenities}</h3>
              <div className="text-red-600">Likes: {property.likes}</div>
              <div>
                <h4 className="font-semibold mt-2">Liked by:</h4>
                <ul>
                  {property.likedBy.map((user) => (
                    <li key={user._id}>
                      {user.firstName} {user.lastName} - {user.email}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center">No properties liked yet.</div>
        )}
      </div>
    </div>
  );
};

export default LikedComponent;

import React from "react";

// Sample data for the team members
const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "CEO",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YXS6L7FodALRsFGKIBkv5XX6in_WK3Decg&s",
    bio: "Alice is a visionary leader with over 10 years of experience in the tech industry.",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "CTO",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YXS6L7FodALRsFGKIBkv5XX6in_WK3Decg&s",
    bio: "Bob is an expert in cybersecurity and AI technologies, driving innovation at our company.",
  },
  {
    id: 3,
    name: "Carol White",
    role: "CFO",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YXS6L7FodALRsFGKIBkv5XX6in_WK3Decg&s",
    bio: "Carol oversees financial strategies and brings over 15 years of experience in finance management.",
  },
  {
    id: 4,
    name: "Dave Brown",
    role: "COO",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YXS6L7FodALRsFGKIBkv5XX6in_WK3Decg&s",
    bio: "Dave ensures operational excellence across all departments, fostering teamwork and efficiency.",
  },
];

const Team = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-indigo-600">{member.role}</p>
                <p className="text-gray-700 text-sm mt-4">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;

import React from "react";
import services from "./servicesData";
import "./Services.css";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <div className="Servicewhole">
      <div className="servicewrapper">
        <h1 style={{ borderBottom: "1px solid white" }}>SERVICES</h1>
        <div className="servicescontainer">
          {services.map((each, index) => (
            <Link key={index} className="totalLink" to={`/services/${each.id}`}>
              <div className="eachservice">
                <img src={each.image} />
                <div className="matter">
                  <h4>
                    <span>Title:</span>
                    {each.title}
                  </h4>
                  <h5>
                    <span>Description:</span>
                    {each.description}
                  </h5>
                  <div className="btndiv">
                    <button className="btnview">VIEW MORE</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

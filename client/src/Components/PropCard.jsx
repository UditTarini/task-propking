import React from "react";
import "./Components.css";

const PropCard = () => {
  return (
    <div className="prop_card ">
      <div className="card-body">
        <h5 className="prop_card_title"> Pranathi Panorama</h5>
        <h5 className="prop_card_info"><i class="fa fa-map-marker me-1" aria-hidden="true"></i> Narsingi, Hyderabad, India</h5>
        <h5 className="prop_card_info"> 1000 - 2000 sft</h5>


        {/* <a href="#" className="btn btn-primary">
          Go somewhere
        </a> */}
      </div>
    </div>
  );
};

export default PropCard;

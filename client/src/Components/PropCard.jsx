import React from "react";
import { useHistory } from "react-router";
import {isAuthenticated} from "../APIcalls/auth";
import "./Components.css";
const PropCard = ({landData}) => {

  const history = useHistory()
  const onUpdate = () => {
    history.push("/update");
  };
  return (
    <div className="prop_card ">
      <div className="card-body">
        <h5 className="prop_card_title"> {landData.name}</h5>
        <h5 className="prop_card_info">
          <i class="fa fa-map-marker me-1" aria-hidden="true"></i>
          {landData.city}, {landData.state}, {landData.country}
        </h5>
        <h5 className="prop_card_info"> {landData.area} sft</h5>
        {isAuthenticated() && (
          <button
            type="button"
            class="btn btn-dark update_btn"
            onClick={onUpdate}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default PropCard;

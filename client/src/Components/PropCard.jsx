import React from "react";
import {useHistory} from "react-router";
import {isAuthenticated} from "../APIcalls/auth";
import { deleteLand } from "../APIcalls/land";
import "./Components.css";

const PropCard = ({landData,setDelete}) => {
  const history = useHistory();
  const {auth_token} = isAuthenticated()
  const onUpdate = (landId) => {
    history.push({
      pathname: "/update",
      state: {
        id: landId,
      },
    });
  };

  const onDelete = (landId) => {
    deleteLand(landId, auth_token).then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
          setDelete(true)
      }
    });
  }
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
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              type="button"
              class="btn btn-dark update_btn"
              onClick={() => onUpdate(landData._id)}
            >
              Update
            </button>
            <i class="fas fa-trash-alt text-danger"  onClick={() => onDelete(landData._id)} ></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropCard;

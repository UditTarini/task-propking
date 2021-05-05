import React, {useState} from "react";
import {isAuthenticated} from "../APIcalls/auth";
import {createLand} from "../APIcalls/land";

import Base from "../Components/Base";

const Create = () => {
  const {auth_token} = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    area: "",
    city: "",
    state: "",
    country: "",
    error: "",
  });

  const {name, area, city, state, country, error} = values;

  const handleOnChange = (field) => (event) => {
    setValues({...values, error: false, [field]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    createLand({name, area, city, state, country}, auth_token)
      .then((data) => {
        if (data.error) {
          setValues({...values, error: data.error});
        } else {
          setValues({
            ...values,
            name: "",
            area: "",
            city: "",
            state: "",
            country: "",
          });
          alert("created");
        }
      })
      .catch(console.log("error in signin"));
  };
  return (
    <Base>
      <div className="login_container">
        <p className="text-danger">{error}</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleOnChange("name")}
        />
        <input
          type="test"
          placeholder="Area"
          value={area}
          onChange={handleOnChange("area")}
        />
        <input
          type="City"
          placeholder="City"
          value={city}
          onChange={handleOnChange("city")}
        />
        <input
          type="State"
          placeholder="State"
          value={state}
          onChange={handleOnChange("state")}
        />
        <input
          type="Country"
          placeholder="Country"
          value={country}
          onChange={handleOnChange("country")}
        />
        <button type="button" class="btn btn-dark" onClick={onSubmit}>
          Create
        </button>
      </div>
    </Base>
  );
};

export default Create;

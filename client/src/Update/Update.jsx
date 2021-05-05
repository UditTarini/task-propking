import React, {useEffect, useState} from "react";
import {isAuthenticated} from "../APIcalls/auth";
import {updateLand, loadLandInfo} from "../APIcalls/land";
import Base from "../Components/Base";
import {useHistory, useLocation} from "react-router-dom";

const Update = () => {
  const location = useLocation();
  const history = useHistory();
  const {auth_token} = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    area: "",
    city: "",
    state: "",
    country: "",
    error: "",
    loading: false,
  });

  useEffect(() => {
    preFetch();
  }, []);

  const {name, area, city, state, country, error, loading} = values;

  const handleOnChange = (field) => (event) => {
    setValues({...values, error: "", [field]: event.target.value});
  };

  const preFetch = () => {
    loadLandInfo(location.state.id).then((data) => {
      console.log(data);
      setValues({
        ...values,
        name: data.name,
        area: data.area,
        city: data.city,
        state: data.state,
        country: data.country,
      });
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    updateLand(
      {name, area, city, state, country},
      auth_token,
      location.state.id
    )
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
          alert("updated");
          history.push("/");
        }
      })
      .catch(console.log("error in update"));
  };
  return (
    <Base>
      <div className="login_container">
        <p className="text-danger">{error}</p>
        <p>Land ID - {location.state.id}</p>
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
          Update
        </button>
      </div>
    </Base>
  );
};

export default Update;

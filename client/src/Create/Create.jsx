import React, {useState} from "react";
import {authenticate, login} from "../APIcalls/auth";
import Base from "../Components/Base";

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    error: "",
    didRedirect: false,
  });

  const {name, password, error, didRedirect} = values;

  const handleOnChange = (field) => (event) => {
    setValues({...values, error: false, [field]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    login({name, password})
      .then((data) => {
        if (data.error) {
          setValues({...values, error: data.error});
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              loading: false,
              didRedirect: true,
            });
          });
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
          value={password}
          onChange={handleOnChange("password")}
        />
        <input
          type="City"
          placeholder="City"
          value={password}
          onChange={handleOnChange("password")}
        />
        <input
          type="State"
          placeholder="State"
          value={password}
          onChange={handleOnChange("password")}
        />
        <input
          type="Country"
          placeholder="Country"
          value={password}
          onChange={handleOnChange("password")}
        />
        <button type="button" class="btn btn-dark" onClick={onSubmit}>
          Create
        </button>
      </div>
    </Base>
  );
};

export default Create;

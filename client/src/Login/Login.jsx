import React, {useState} from "react";
import {login, authenticate} from "../APIcalls/auth";
import "./Login.css";
import {Redirect} from "react-router-dom";
import Base from '../Components/Base'

const Login = () => {
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

  const redirectOperation = () => {
   return didRedirect && <Redirect to="/" />;
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
        type="password"
        placeholder="Password"
        value={password}
        onChange={handleOnChange("password")}
      />
      <button type="button" class="btn btn-dark" onClick={onSubmit}>
        Submit
      </button>
      {redirectOperation()}
    </div>
    </Base>
   
  );
};

export default Login;

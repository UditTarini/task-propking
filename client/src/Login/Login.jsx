import React from "react";
import "./Login.css"

const Login = () => {
  return (
    <div className="login_container">
      <input type="text" placeholder="Name" />
      <input type="password" placeholder="Password" />
      <button type="button" class="btn btn-dark">Submit</button>

    </div>
  );
};

export default Login;

import React, {useEffect, useState} from "react";
import {Link, NavLink, useHistory} from "react-router-dom";
import {isAuthenticated, logout} from "../APIcalls/auth";

const Navabr = () => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between">
        <NavLink className="navbar-brand" to="/">
          Property Glance{" "}
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated() && (
         
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create">
                    Create
                  </NavLink>
                </li>
         
            )}
            <li className="nav-item">
              {isAuthenticated() ? (
                <Link className="nav-link" onClick={() => logout()}>
                  Log out
                </Link>
              ) : (
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navabr;

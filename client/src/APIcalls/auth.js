import {base_route} from "../backend";

export const login = (user) => {
  return fetch(`${base_route}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  })
    .then((resp) => {
        console.log("resp",resp);
      return resp.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window != "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const logout = () => {
    if (typeof window != "undefined") {
      localStorage.removeItem("jwt");

      return fetch(`${base_route}/signout`, {
        method: "GET",
      })
        .then((res) => {
          console.log("signout success");
        })
        .catch((err) => console.log(err));
    }
  };
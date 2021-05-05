import {base_route} from "../backend";

export const createLand = (land, token) => {
  return fetch(`${base_route}/land/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(land),
  })
    .then((resp) => {
      console.log("resp", resp);
      return resp.json();
    })
    .catch((err) => console.log(err));
};

export const getAllLand = () => {
  return fetch(`${base_route}/land/all`, {
    method: "GET",
  })
  .then((resp)=>{
      return resp.json()
  })
  .catch((err)=>console.log(err))
};

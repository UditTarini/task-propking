import React, {useEffect, useState} from "react";
import PropCard from "../Components/PropCard";
import "./Home.css";
import Base from "../Components/Base";
import {getAllLand} from "../APIcalls/land";

const Home = () => {
  const [land, setLand] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setDelete] = useState(false);

  const loadAllLand = () => {
    getAllLand().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setLand(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
   loadAllLand();
  }, []);

  useEffect(() => {
    isDeleted && loadAllLand();
    setDelete(false);
  }, [isDeleted]);

  return (
    <Base>
      <div className="my-5 d-flex  justify-content-between flex-wrap">
        {loading ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            {land.map((data) => (
              <PropCard landData={data} setDelete={setDelete} key={data.name} />
            ))}
          </>
        )}
      </div>
    </Base>
  );
};

export default Home;

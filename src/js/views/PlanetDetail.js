import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const PlanetDetail = () => {
  const { uid } = useParams();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPlanetDetails(uid);
  }, [uid]);

  if (store.loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border star-wars-spinner" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!store.planet) {
    return <div className="container mt-5 alert alert-danger">Planet not found</div>;
  }

  const {
    name,
    diameter,
    rotation_period,
    orbital_period,
    gravity,
    population,
    climate,
    terrain,
    surface_water
  } = store.planet.properties;

  return (
    <div className="container mt-5">
      <div className="star-wars-card p-4">
        <div className="row d-flex align-items-center">
          <div className="col-md-4">
            <img
              src={actions.getUrlImgPlanet(uid)}
              alt={name}
              className="img-fluid mb-3 mb-md-0"
            />
          </div>
          <div className="col-md-8">
            <h1 className="star-wars-title text-center mb-4">{name}</h1>
            <div className="row mt-5 d-flex align-items-center">
              <div className="col-md-6">
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Diameter:</span> {diameter}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Rotation Period:</span> {rotation_period}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Orbital Period:</span> {orbital_period}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Gravity:</span> {gravity}
                </p>
              </div>
              <div className="col-md-6">
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Population:</span> {population}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Climate:</span> {climate}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Terrain:</span> {terrain}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Surface Water:</span> {surface_water}
                </p>
              </div>
            </div>
            <p className="star-wars-text mt-4">
              <span className="star-wars-subtitle">Description:</span> {store.planet.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default PlanetDetail;

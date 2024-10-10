import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const VehicleDetail = () => {
  const { uid } = useParams();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getVehicleDetails(uid);
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

  if (!store.vehicle) {
    return <div className="container mt-5 alert alert-danger">Vehicle not found</div>;
  }

  const {
    name,
    model,
    manufacturer,
    cost_in_credits,
    length,
    max_atmosphering_speed,
    crew,
    passengers,
    cargo_capacity,
    consumables,
    vehicle_class
  } = store.vehicle.properties;

  return (
    <div className="container mt-5">
      <div className="star-wars-card p-4">
        <div className="row d-flex align-items-center">
          <div className="col-md-4">
            <img
              src={actions.getUrlImgVehicle(uid)}
              alt={name}
              className="img-fluid mb-3 mb-md-0"
            />
          </div>
          <div className="col-md-8">
            <h1 className="star-wars-title text-center mb-4">{name}</h1>
            <div className="row mt-5 d-flex align-items-center">
              <div className="col-md-6">
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Model:</span> {model}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Manufacturer:</span> {manufacturer}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Cost in Credits:</span> {cost_in_credits}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Length:</span> {length}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Max Atmosphering Speed:</span> {max_atmosphering_speed}
                </p>
              </div>
              <div className="col-md-6">
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Crew:</span> {crew}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Passengers:</span> {passengers}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Cargo Capacity:</span> {cargo_capacity}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Consumables:</span> {consumables}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Vehicle Class:</span> {vehicle_class}
                </p>
              </div>
            </div>
            <p className="star-wars-text mt-4">
              <span className="star-wars-subtitle">Description:</span> {store.vehicle.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default VehicleDetail;

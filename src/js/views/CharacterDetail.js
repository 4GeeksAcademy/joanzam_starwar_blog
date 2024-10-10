
import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const CharacterDetail = () => {
  const { uid } = useParams();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const getDataFromAPI = async () => {
      await actions.getCharacterDetails(uid);
    };
    getDataFromAPI();
  }, [uid]);

  useEffect(() => {
    const getHomeworldNameFromAPI = async (homeworldUrl) => {
      await actions.getHomeWorldName(homeworldUrl);
    };

    if (store.character && store.character.properties) {
      getHomeworldNameFromAPI(store.character.properties.homeworld);
    }
  }, [store.character]);

  if (store.loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border star-wars-spinner" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!store.character) {
    return (
      <div className="container mt-5 alert alert-danger">
        Character not found
      </div>
    );
  }

  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    url,
  } = store.character.properties;

  return (
    <div className="container mt-5">
      <div className="star-wars-card p-4">
        <div className="row d-flex align-items-center">
          <div className="col-md-4">
            <img
              src={actions.getUrlImgCharacter(uid)}
              alt={name}
              className="img-fluid mb-3 mb-md-0"
            />
          </div>
          <div className="col-md-8">
            <h1 className="star-wars-title text-center mb-4">{name}</h1>
            <div className="row mt-5 d-flex align-items-center">
              <div className="col-md-6">
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Height:</span> {height}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Mass:</span> {mass}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Hair Color:</span>{" "}
                  {hair_color}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Skin Color:</span>{" "}
                  {skin_color}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Eye Color:</span>{" "}
                  {eye_color}
                </p>
              </div>
              <div className="col-md-6">
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Birth Year:</span>{" "}
                  {birth_year}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Gender:</span> {gender}
                </p>
                <p className="star-wars-text">
                  <span className="star-wars-subtitle">Homeworld:</span>{" "}
                  {store.homeworld || "Loading..."}
                </p>
              </div>
            </div>
            <p className="star-wars-text mt-4">
              <span className="star-wars-subtitle">Description:</span>{" "}
              {store.character.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;

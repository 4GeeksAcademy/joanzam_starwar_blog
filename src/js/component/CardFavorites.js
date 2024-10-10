import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

const CardFavorites = ({ name, uid, type }) => {
  // Obtén las acciones desde el contexto global
  const { actions } = useContext(Context);

  // Hook para la navegación programática
  const navigate = useNavigate();

  // Determina la fuente de la imagen basada en el tipo de elemento
  let imgSrc;
  switch (type) {
    case "characters":
      imgSrc = actions.getUrlImgCharacter(uid); // Obtén la URL de la imagen para personajes
      break;
    case "vehicles":
      imgSrc = actions.getUrlImgVehicle(uid); // Obtén la URL de la imagen para vehículos
      break;
    case "planets":
      imgSrc = actions.getUrlImgPlanet(uid); // Obtén la URL de la imagen para planetas
      break;
    default:
      imgSrc = "https://placehold.co/400"; // Imagen de placeholder si el tipo no coincide
  }

  return (
    <div className="card star-wars-card">
      <img
        className="card-img-top img-fluid"
        src={imgSrc} // Fuente de la imagen determinada anteriormente
        alt={`${name} image`} // Texto alternativo descriptivo
        onClick={() => navigate(`/${type}/${uid}`)} // Navega a la ruta específica al hacer clic en la imagen
        style={{ cursor: "pointer" }} // Cambia el cursor a pointer al pasar sobre la imagen
      />
      <div className="card-body">
        <h5 className="card-title star-wars-title">{name}</h5> {/* Título de la tarjeta */}
        <div className="row d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-outline-info px-1 col-8 mb-3 col-sm-6 mb-sm-0 col-md-6 col-xl-6 col-xxl-4"
            onClick={() => navigate(`/${type}/${uid}`)} // Navega a la ruta específica al hacer clic en el botón
          >
            See more details
          </button>
          <button
            type="button"
            className="btn btn-outline-danger px-1 col-8 mb-3 col-sm-6 mb-sm-0 col-md-6 col-xl-6 col-xxl-4"
            onClick={() => actions.removeFromFav(uid)} // Llama a la acción para eliminar de favoritos
          >
            Delete from fav
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFavorites; // Exporta el componente CardFavorites como la exportación por defecto
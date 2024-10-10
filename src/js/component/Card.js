import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

const Card = (props) => {
  // Obtén el estado global y las acciones desde el contexto
  const { store, actions } = useContext(Context);

  // Hook para la navegación programática
  const navigate = useNavigate();

  return (
    <div className="card star-wars-card">
      <img
        className="card-img-top img-fluid"
        src={props.img} // Fuente de la imagen pasada como prop
        alt="Card image cap"
        onClick={() => navigate(`/${props.type}/${props.uid}`)} // Navega a la ruta específica al hacer clic en la imagen
        style={{ cursor: "pointer" }} // Cambia el cursor a pointer al pasar sobre la imagen
      />
      <div className="card-body">
        <h5 className="card-title star-wars-title">{props.name}</h5> {/* Título de la tarjeta */}
        <div className="row d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-warning px-1 col-8 mb-3 col-sm-6 mb-sm-0 col-md-6 col-xl-6 col-xxl-4"
            onClick={() => {
              actions.saveToFav(props.uid, props.type); // Llama a la acción para guardar en favoritos
            }}
          >
            Add to Favorites
          </button>
          <br className="d-sm-none" /> {/* Salto de línea visible solo en pantallas pequeñas */}
          <button
            type="button"
            className="btn btn-secondary px-1 col-8 mb-3 col-sm-6 mb-sm-0 col-md-6 col-xl-6 col-xxl-4"
            onClick={() => navigate(`/${props.type}/${props.uid}`)} // Navega a la ruta específica al hacer clic en el botón
          >
            See more details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card; // Exporta el componente Card como la exportación por defecto
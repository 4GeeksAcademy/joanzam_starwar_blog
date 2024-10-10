import React from 'react';
import { useNavigate } from 'react-router';
import "../../styles/home.css";
import backgroundImg from '../../img/starwars.jpg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <div
        className="my-5 bg"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover', // Ajusta el tamaño de la imagen para cubrir el div
          backgroundPosition: 'center', // Centra la imagen en el div
          backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
          height: '800px',
        }}
      >
      </div>
    </div>
  );
};

export default Home;
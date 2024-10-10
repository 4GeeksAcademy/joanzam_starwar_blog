import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "../component/Card";

function Characters() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCharacters();
  }, []);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#000'
  };

  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px'
  };

  const cardStyle = {
    flex: '1 1 calc(25% - 15px)', /* Ajusta el tamaño de las tarjetas según el diseño */
    maxWidth: '25%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#000'
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        {store.characters?.map((character) => (
          <div key={character.uid} style={cardStyle}>
            <Card
              name={character.name}
              uid={character.uid}
              type="characters"
              img={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Characters;
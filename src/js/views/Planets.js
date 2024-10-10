import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "../component/Card";

function Planets() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPlanets();
  }, []);

  return (
    <>
      <div className="mx-4">
      </div>
      <div className="row mx-3 mt-3">
        {store.planets?.map((planet) => (
          <div
            key={planet.uid}
            className="col-12 col-md-6 col-lg-4 col-xl-3 my-3"
          >
            <Card name={planet.name} uid={planet.uid} type="planets" img={actions.getUrlImgPlanet(planet.uid)} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Planets;

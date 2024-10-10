import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "../component/Card";

function Vehicles() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getVehicles();
  }, []);

  return (
    <>
      <div className="row mx-3 mt-3">
        {store.vehicles?.map((vehicle) => (
          <div
            key={vehicle.uid}
            className="col-12 col-md-6 col-lg-4 col-xl-3 my-3"
          >
            <Card name={vehicle.name} uid={vehicle.uid} type="vehicles" img={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Vehicles;
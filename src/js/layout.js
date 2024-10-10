import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import Home from "./views/home";
import Characters from "./views/Characters";
import Vehicles from "./views/Vehicles";
import Planets from "./views/Planets";
import Favorites from "./views/Favorites";
import CharacterDetail from "./views/CharacterDetail.js";
import VehicleDetail from "./views/VehicleDetail.js";
import PlanetDetail from "./views/PlanetDetail.js";

import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.getCharacters();
    actions.getVehicles();
    actions.getPlanets();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <main className="flex-grow-1 mb-4">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/characters" element={<Characters />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/planets" element={<Planets />} />

              <Route path="/favorites" element={<Favorites />} />

              <Route path="/characters/:uid" element={<CharacterDetail />} />
              <Route path="/vehicles/:uid" element={<VehicleDetail />} />
              <Route path="/planets/:uid" element={<PlanetDetail />} />

              <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>
          </main>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};



export default injectContext(Layout);
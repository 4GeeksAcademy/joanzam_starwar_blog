import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import starWarsLogo from "../../img/LogoS.jpg";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length > 1) {
      const results = [
        ...store.characters
          .filter((char) => char.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((char) => ({ ...char, type: 'characters' })),
        ...store.vehicles
          .filter((vehicle) => vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((vehicle) => ({ ...vehicle, type: 'vehicles' })),
        ...store.planets
          .filter((planet) => planet.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((planet) => ({ ...planet, type: 'planets' })),
      ];
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, store.characters, store.vehicles, store.planets]);

  const handleSearch = (item) => {
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/${item.type}/${item.uid}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3 px-3 shadow">
      <Link to="/" className="navbar-brand">
        <img src={starWarsLogo} alt="Star Wars Logo" height="60" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <div className="position-relative">
              <input
                type="text"
                className="form-control bg-light text-dark border-0"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: "20px" }}
              />
              {searchResults.length > 0 && (
                <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
                  {searchResults.map((item) => (
                    <li
                      key={item.uid}
                      className="list-group-item bg-light text-dark"
                      onClick={() => handleSearch(item)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li className="nav-item">
            <Link to="/characters" className="nav-link text-light">
              Characters
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/vehicles" className="nav-link text-light">
              Vehicles
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/planets" className="nav-link text-light">
              Planets
            </Link>
          </li>
          <li className="nav-item">
            <div className="btn-group d-flex flex-column">
              <button
                type="button"
                className="btn btn-warning dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites
              </button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start dropdown-menu-dark">
                {store.favorites.length === 0 ? (
                  <li className="dropdown-item text-light">No favorites</li>
                ) : (
                  store.favorites.map((fav, index) => (
                    <li
                      className="dropdown-item d-flex justify-content-between align-items-center"
                      key={index}
                    >
                      <span className="text-light" onClick={() => navigate(`/${fav.type}/${fav.uid}`)}>{fav.name}</span>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => actions.removeFromFav(fav.uid)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </li>
                  ))
                )}
                <li>
                  <Link to="/favorites" className="dropdown-item text-center text-light">
                    View All
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

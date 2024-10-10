import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    // Initial state of the application
    store: {
      characters: JSON.parse(localStorage.getItem("characters")) || [],
      vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
      planets: JSON.parse(localStorage.getItem("planets")) || [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      character: JSON.parse(localStorage.getItem("character")) || null,
      vehicle: JSON.parse(localStorage.getItem("vehicle")) || null,
      planet: JSON.parse(localStorage.getItem("planet")) || null,
      loading: true,
      homeworld: "",
    },
    // Actions to manipulate the state
    actions: {
      // Fetches the list of characters from the API
      getCharacters: async () => {
        try {
          const response = await axios.get("https://www.swapi.tech/api/people/");
          if (response && response.data) {
            const characters = response.data.results;
            setStore({ characters });
            localStorage.setItem("characters", JSON.stringify(characters));
          } else {
            console.log("Data not received");
          }
        } catch (error) {
          console.log("getCharacters failed", error);
        }
      },
      // Fetches the list of vehicles from the API
      getVehicles: async () => {
        try {
          const response = await axios.get("https://www.swapi.tech/api/vehicles/");
          if (response && response.data) {
            const vehicles = response.data.results;
            setStore({ vehicles });
            localStorage.setItem("vehicles", JSON.stringify(vehicles));
          } else {
            console.log("Data not received");
          }
        } catch (error) {
          console.log("getVehicles failed", error);
        }
      },
      // Fetches the list of planets from the API
      getPlanets: async () => {
        try {
          const response = await axios.get("https://www.swapi.tech/api/planets/");
          if (response && response.data) {
            const planets = response.data.results;
            setStore({ planets });
            localStorage.setItem("planets", JSON.stringify(planets));
          } else {
            console.log("Data not received");
          }
        } catch (error) {
          console.log("getPlanets failed", error);
        }
      },
      // Adds an item to the favorites list
      saveToFav: (uid, type) => {
        const store = getStore();
        let arr;
        if (type === "characters") {
          arr = store.characters;
        } else if (type === "vehicles") {
          arr = store.vehicles;
        } else if (type === "planets") {
          arr = store.planets;
        }
        const newFav = arr.find((item) => item.uid === uid);
        if (!newFav) {
          console.log("Item not found in array");
          return;
        }
        if (store.favorites.some((fav) => fav.uid === uid && fav.type === type)) {
          console.log("Item already in favorites");
          return;
        }
        const updatedFavorites = [...store.favorites, { ...newFav, type }];
        setStore({ favorites: updatedFavorites });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      },
      // Removes an item from the favorites list
      removeFromFav: (uid) => {
        const store = getStore();
        const updatedFavorites = store.favorites.filter((fav) => fav.uid !== uid);
        setStore({ favorites: updatedFavorites });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      },
      // Fetches character details from the API
      getCharacterDetails: async (uid) => {
        setStore({ loading: true });
        let character = JSON.parse(localStorage.getItem(`character_${uid}`));
        if (character) {
          setStore({ character });
          setStore({ loading: false });
          return;
        }
        try {
          const response = await axios.get(`https://www.swapi.tech/api/people/${uid}`);
          if (response && response.data && response.data.result) {
            character = response.data.result;
            setStore({ character });
            localStorage.setItem(`character_${uid}`, JSON.stringify(character));
          }
        } catch (error) {
          console.log("Error fetching character details:", error);
        } finally {
          setStore({ loading: false });
        }
      },
      // Fetches vehicle details from the API
      getVehicleDetails: async (uid) => {
        setStore({ loading: true });
        let vehicle = JSON.parse(localStorage.getItem(`vehicle_${uid}`));
        if (vehicle) {
          setStore({ vehicle });
          setStore({ loading: false });
          return;
        }
        try {
          const response = await axios.get(`https://www.swapi.tech/api/vehicles/${uid}`);
          if (response && response.data && response.data.result) {
            vehicle = response.data.result;
            setStore({ vehicle });
            localStorage.setItem(`vehicle_${uid}`, JSON.stringify(vehicle));
          }
        } catch (error) {
          console.log("Error fetching vehicle details:", error);
        } finally {
          setStore({ loading: false });
        }
      },
      // Fetches planet details from the API
      getPlanetDetails: async (uid) => {
        setStore({ loading: true });
        let planet = JSON.parse(localStorage.getItem(`planet_${uid}`));
        if (planet) {
          setStore({ planet });
          setStore({ loading: false });
          return;
        }
        try {
          const response = await axios.get(`https://www.swapi.tech/api/planets/${uid}`);
          if (response && response.data && response.data.result) {
            planet = response.data.result;
            setStore({ planet });
            localStorage.setItem(`planet_${uid}`, JSON.stringify(planet));
          }
        } catch (error) {
          console.log("Error fetching planet details:", error);
        } finally {
          setStore({ loading: false });
        }
      },
      // Fetches the name of the homeworld of a character from the API
      getHomeWorldName: async (homeworld) => {
        setStore({ homeworld: "" });
        try {
          const response = await axios.get(`${homeworld}`);
          if (response) {
            setStore({ homeworld: response.data.result.properties.name });
          }
        } catch (error) {
          console.error(error);
        }
      },
      // Gets the URL for a character image
      getUrlImgCharacter: (id) => {
        return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
      },
      // Gets the URL for a vehicle image
      getUrlImgVehicle: (id) => {
        return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
      },
      // Gets the URL for a planet image
      getUrlImgPlanet: (id) => {
        if (id === "1") {
          return "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg";
        } else {
          return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
        }
      },
    },
  };
};
``
export default getState;
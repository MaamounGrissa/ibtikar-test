import { initialBuildings } from "./LocalData";

// Check if state is saved in localStorage
let state = [];
if (localStorage.getItem('state')) {
    // Get state from localStorage
    state = JSON.parse(localStorage.getItem('state'));
} else {
    // Set state from localData
    state = initialBuildings;
    localStorage.setItem('state', JSON.stringify(state));
}

// Initial State and Actions
export const initialState = {
    buildings: state,
};
  
// Define Actions
export const actions = {
    ADD_BUILDING: "ADD_BUILDING",
    EDIT_BUILDING: "EDIT_BUILDING",
    REMOVE_BUILDING: "REMOVE_BUILDING",
};
  
  // Reducer to Handle Actions
export const reducer = (state, action) => {
    switch (action.type) {
    // Add Building
      case actions.ADD_BUILDING:
          const updatedBuildings = [ ...state.buildings, {
              id: new Date().valueOf(),
              userId: action.payload.userId,
              name: action.payload.name,
              country: action.payload.country
            }
          ]
          localStorage.setItem('state', JSON.stringify(updatedBuildings));
          return {
            buildings: updatedBuildings
        };
    // Edit Building
      case actions.EDIT_BUILDING: {
        const updatedBuildings = state.buildings.map((building) =>
          building.id === action.payload.id
            ? { ...building,
                name: action.payload.name, 
                country: action.payload.country 
              }
            : building
        );
        localStorage.setItem('state', JSON.stringify(updatedBuildings));
        return { buildings: updatedBuildings };
      }
    // Remove Building
      case actions.REMOVE_BUILDING: {
        const filtredBuildings = state.buildings.filter(
          (building) => building.id !== action.payload
        );
        localStorage.setItem('state', JSON.stringify(filtredBuildings));
        return { buildings: filtredBuildings };
      }
      default:
        return state;
    }
  };
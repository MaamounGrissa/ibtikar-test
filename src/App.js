import { createContext, useEffect, useReducer, useState } from 'react';
import './App.css';
import BuildingForm from './components/BuildingForm';
import BuildingsList from './components/BuildingsList';
import MapView from './components/MapView';
import { users } from './LocalData';
import { initialState, reducer, actions } from './Reducer';

// Create Context
export const BuildingsContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [geoLocations, setGeoLocations] = useState([]);

  // Get countries list from Json File

  useEffect(() => {
    fetch('/data/countriesList.json').then(response => {
      return response.json();
    }).then(data => {
      setCountriesList(data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  // Get geoLocations from Json File

  useEffect(() => {
    fetch('/data/countries.geojson').then(response => {
      return response.json();
    }).then(data => {
      setGeoLocations(data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <BuildingsContext.Provider value={{state, dispatch}}>
      <div className="App">
        <div className='app-container'>
          <div className='app-header'>
            <div className='infos-container'>
              <img src="/images/logo.png" alt='Logo' />
              <div className='infos'>
                <h2>Ibtikar Technical Test</h2>
                <p>By <a href="https://maamoungrissa.me" target="_blanc" rel="noreferrer noopener">
                    Maamoun Grissa</a></p>
              </div>
            </div>
            {/* SELET USER - Maping users list - handle change event */}
            <select value={selectedUser} onChange={(e) => {
                  setSelectedBuilding(null);
                  setSelectedUser(e.target.value)
                }} className='input'>
              <option value=''>Select user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className='app-body'>
            {/* BUILDING LIST + Dispatching remove building action if is selectedBuilding  */}
              <BuildingsList 
                  selectedUser={selectedUser} 
                  selectBuilding={(build) => setSelectedBuilding(build)}
                  selectedBuilding={selectedBuilding}
                  openForm={() => setShowForm(true)}
                  deleteBuilding={() => selectedBuilding ? dispatch({ type: actions.REMOVE_BUILDING, payload: selectedBuilding.id }) : alert('No building selected')}
                  />
              <div className='app-view'>
                  <div className='view-header'>
                  { showForm ? selectedBuilding ? "Edit Building" : "Add Building" : "Map View"}
                  </div>
                  <div className='view-content'>
                    {/* MAP VIEW */}
                    <MapView selectedBuilding={selectedBuilding} 
                              selectedUser={selectedUser} 
                              geoLocations={geoLocations} />
                    {/* BUILDING FORM (ADD / EDIT) */}
                    <BuildingForm  show={showForm}
                              countriesList={countriesList} 
                              building={selectedBuilding} 
                              selectedUser={selectedUser} 
                              close={() => setShowForm(false)} />
                  </div>
              </div>
          </div>
        </div>
      </div>
    </BuildingsContext.Provider>
  );
}

export default App;

import React, {useContext, useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import { BuildingsContext } from '../App';

function MapView(props) {
    const { selectedBuilding, selectedUser, geoLocations } = props;
    const [selectedPolygon, setSelectedPolygon] = useState(null);
    const [center, setCenter] = useState({lat: -3.745, lng: -38.523})
    /* Get Buildings from context state */
    const { state } = useContext(BuildingsContext);
    const buildings = state.buildings;

    useEffect(() => {
        if (selectedBuilding) {
          const location = geoLocations?.features?.find(feature => feature.id === selectedBuilding.country);
         if (location) {
              const paths = [];
            location.geometry?.coordinates?.map(coordinate => 
                // eslint-disable-next-line array-callback-return
                coordinate.map(coord => {
                    paths.push({lat: coord[1], lng: coord[0]});
                })
            )
            setSelectedPolygon(paths);
            setCenter({lat: paths[1].lat, lng: paths[0].lng});
          }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBuilding]);

    // Google Map CONTAINER STYLE
    const containerStyle = {
        width: '100%',
        height: '100%'
    };
      
    // POLYGON OPTIONS
    const options = {
        fillColor: "rgba(0, 0, 0, 0.5)",
        fillOpacity: 0.6,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 2,
    }
    
    return (
        <div className='map-container'>
            {
                !buildings || !selectedUser || !selectedBuilding ? (
                    <div className='loading'><img src="/images/loading.gif" alt="loading" /></div>
                ) : !selectedBuilding.country ? (
                    <div className='loading'><span>No country selected</span></div>
                ) : (
                    <LoadScript  googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY} 
                                loadingElement={<div className='loading'><img src="/images/loading2.gif" alt="loading" /></div>}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={4}
                        >
                          {selectedPolygon ? (
                            <Polygon
                                paths={selectedPolygon}
                                options={options}
                            >
                            </Polygon>
                          ) : <></>}
                        </GoogleMap>
                    </LoadScript> 
                )
            }
            
        </div>
    )
}

export default MapView

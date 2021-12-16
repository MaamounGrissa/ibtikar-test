import React, {useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

function MapView(props) {
    const { buildings, selectedBuilding, selectedUser, geoLocations } = props;
    const [selectedPolygon, setSelectedPolygon] = useState(null);
    const [center, setCenter] = useState({lat: -3.745, lng: -38.523})

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

    const containerStyle = {
        width: '100%',
        height: '100%'
    };
      
    const options = {
        fillColor: "rgba(0, 0, 0, 0.5)",
        fillOpacity: 0.6,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
    }
    
    const onLoad = () => {
        <div className='loading'><img src="/images/loading2.gif" alt="loading" /></div>
    }

    return (
        <div className='map-container'>
            {
                !buildings || !selectedUser || !selectedBuilding ? (
                    <div className='loading'><img src="/images/loading.gif" alt="loading" /></div>
                ) : (
                    <LoadScript  googleMapsApiKey="AIzaSyBPy4meIZkEghQblSS0UOZRe4P8DwnewXU" >
                        <GoogleMap onLoad={onLoad}
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

import React from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '20px',
  margin: '1em',
}

const center = {
  lat: 49.809906490344185,
  lng: -97.13390464449382
};

const LIBRARIES = ['places'];

const loaderOptions = {
  id: 'google-map-script',
  googleMapsApiKey: import.meta.env.VITE_MAPS_KEY,
  libraries: LIBRARIES,
}

function Map({ onMarkerClick }) {
  const { isLoaded } = useJsApiLoader(loaderOptions)

  const [map, setMap] = React.useState(null)
  const [places, setPlaces] = React.useState([])

  const searchLibraries = React.useCallback((mapInstance) => {
    const service = new window.google.maps.places.PlacesService(mapInstance)

    service.nearbySearch(
      {
        location: center,
        radius: 3000,
        type: 'library',
      },
      (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setPlaces(results)
        }
      }
    )
  }, [])

  const handleMapLoad = React.useCallback(
    (mapInstance) => {
      setMap(mapInstance)
      searchLibraries(mapInstance)
    },
    [searchLibraries]
  )

  const handleUnmount = React.useCallback(() => {
    setMap(null)
  }, [])

  if (!isLoaded) return null

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      onLoad={handleMapLoad}
      onUnmount={handleUnmount}
      onClick={(e) => e.stopPropagation()}
    >
      {places.map((place) => {
          console.log("Place ID:", place.place_id, place.name);
          return (
            <MarkerF
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              title={place.name}
              clickable={true}
              onClick={() => onMarkerClick && onMarkerClick(place.place_id)}
            />
          );
        })}
    </GoogleMap>
  )
}

export default React.memo(Map);
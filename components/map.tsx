import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const Map = () => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 51.50079809826062,
    lng: -0.12459323822506786,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={20}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} key={1} />
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;

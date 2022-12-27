import { Wrapper, Map, Status, Marker } from "@googlemaps/react-wrapper";
import { useEffect, useState } from "react";



const Maps = () => {
  const apkey = "AIzaSyApkPG16W22iNOPOW1uwbIgLEpAdD7TL0I";
  const [map, setMap] = useState({
    lat: -19.043392,
    lng: -65.254909,
  });
  const [zoom, setZoom] = useState(3);
  return (
    <Wrapper apiKey={apkey}>
      <Map center={map} zoom={zoom}>
        {/* <Marker position={} /> */}
      </Map>
    </Wrapper>
  );
};
export default Maps;

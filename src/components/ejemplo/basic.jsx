import React, { useEffect, useRef } from "react";
import { Wrapper, Map, Status, Marker } from "@googlemaps/react-wrapper";
import {MyMapComponent} from './componente';


/* const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
}; */

function Appss() {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;
  
  return (
    <Wrapper apiKey="AIzaSyApkPG16W22iNOPOW1uwbIgLEpAdD7TL0I">
      <MyMapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
}
export default Appss;
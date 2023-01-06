import { Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { GoogleContext } from "../../provider/googlemaps";
import React, { useEffect, useState, useRef, useContext } from "react";
const render = (status) => {
  return <h1>{status}</h1>;
};
const Ubicacion = () => {
  const {setUbicacionC} = useContext(GoogleContext)
  const [ubiClient, setUbiClient] = useState();
  const [zoom, setZoom] = useState(8); // initial zoom
  const [center, setCenter] = useState({
    lat: -18.4593,
    lng: -62.8611,
  });
  const clickMarker = (e) => {
    // avoid directly mutating state
    setUbicacionC(JSON.parse(JSON.stringify(e.latLng)));
    setUbiClient(e.latLng);
  };

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };
  const arrastrar = (e) => {
    setUbiClient(e.latLng);
    setUbicacionC(JSON.parse(JSON.stringify(e.latLng)));
  };
  const clickes = (e) => {
    console.log(e.latLng);
  };

  const ubicacion = (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          e.setCenter(pos);
          setUbiClient(pos);
          setUbicacionC(pos);
        },
        () => {
          window.alert("Geolocalizacion rechazada...");
        }
      );
    } else {
      // Browser doesn't support Geolocation
      console.log("No encontrado...");
    }
  };
  return (
      <Wrapper
        apiKey={"AIzaSyApkPG16W22iNOPOW1uwbIgLEpAdD7TL0I"}
        render={render}
        version="beta"
      >
        <Mapa
          center={center}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
          encotrarUbi={ubicacion}
          onclick={clickMarker}
          onIdle={onIdle}
        >
          {ubiClient === undefined ? null : (
            <Marker
              key={1}
              position={ubiClient}
              draggable={true}
              onclick={clickes}
              dragend={arrastrar}
            />
          )}
          <p>
            {ubiClient === undefined
              ? "encuentre su direccion..."
              : JSON.stringify(ubiClient)}
          </p>
        </Mapa>
      </Wrapper>
  );
};

const Mapa = ({
  onIdle,
  encotrarUbi,
  onclick,
  children,
  style,
  ...options
}) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Encontrar mi ubicacion";
  locationButton.classList.add("custom-map-control-button");
  if (encotrarUbi) {
    locationButton.addEventListener("click", (e) => encotrarUbi(map));
  }
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // [END maps_react_map_component_add_map_hooks]
  // [START maps_react_map_component_options_hook]
  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
        locationButton
      );
      if (onIdle) {
        map.addListener("onIdle", onIdle);
      }
      if (onclick) {
        map.addListener("click", onclick);
      }
    }
  }, [map, options]);
  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};
const Marker = ({ onclick, dragend, ...options }) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }
    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  /* asignamos una animacion */
  React.useEffect(() => {
    if (marker) {
      marker.setAnimation(window.google.maps.Animation.DROP);
      ["click", "dragend"].forEach((eventName) =>
        window.google.maps.event.clearListeners(marker, eventName)
      );
      if (dragend) {
        marker.addListener("dragend", dragend);
      }
      if (onclick) {
        marker.addListener("click", onclick);
      }
    }
  }, [marker, onclick, dragend]);
  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};

// [END maps_react_map_marker_component]
const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof window.google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof window.google.maps.LatLng
  ) {
    return new window.google.maps.LatLng(a).equals(
      new window.google.maps.LatLng(b)
    );
  }
  // TODO extend to other types
  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
export default Ubicacion;

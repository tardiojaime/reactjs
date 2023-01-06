import { Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box, colors, Card, Typography, CardContent, Fab } from "@mui/material";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link } from "react-router-dom";
const render = (status) => {
  return <h1>{status}</h1>;
};
const UbicacionCliente = () => {
  const { lat, lng, user } = useParams();
  const [ubiClient, setUbiClient] = useState({
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  });
  const verificacion = () => {
    if (parseFloat(lng) + "" === lng && parseFloat(lat) + "" === lat) {
      return true;
    } else {
      return false;
    }
  };
  const [zoom, setZoom] = useState(10); // initial zoom
  const [center, setCenter] = useState({
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  });
  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 50,
          right: 30,
          background: colors.pink[100],
          zIndex: 1300,
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.primary">
              Ubicacion
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Usuario: {user}.
              <br />
              {parseFloat(lat) + "" === lat
                ? `Latitud: ${lat}`
                : "Latitud: no valida"}
              <br />
              {parseFloat(lng) + "" === lng
                ? `Longitud: ${lng}`
                : "Longitud: no valida"}
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'end'
            }}>
              <Link to="/cliente">
                <Fab color="secondary" aria-label="Volver" size="small">
                  <ArrowBackSharpIcon />
                </Fab>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {verificacion() && (
        <Wrapper
          apiKey={"AIzaSyApkPG16W22iNOPOW1uwbIgLEpAdD7TL0I"}
          render={render}
          version="beta"
        >
          <Mapa
            center={center}
            zoom={zoom}
            style={{ flexGrow: "1", height: "80%" }}
            onIdle={onIdle}
          >
            {ubiClient === undefined ? null : (
              <Marker key={1} position={ubiClient} />
            )}
          </Mapa>
        </Wrapper>
      )}
    </>
  );
};

const Mapa = ({ onIdle, children, style, ...options }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
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
      if (onIdle) {
        map.addListener("onIdle", onIdle);
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
const Marker = ({ ...options }) => {
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
    }
  }, [marker]);
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
export default UbicacionCliente;

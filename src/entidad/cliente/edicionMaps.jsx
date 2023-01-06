import { Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
const render = (status) => {
  return <h1>{status}</h1>;
};
const EdicionMaps = ({ubiClients, setUbiClients}) => {
  const [ubiClient, setUbiClient] = useState(ubiClients);
  const [zoom, setZoom] = useState(15); // initial zoom
  const [center, setCenter] = useState(ubiClients);
  const clickMarker = (e) => {
    setUbiClients(JSON.parse(JSON.stringify(e.latLng)));
    setUbiClient(e.latLng);
  };

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };
  const arrastrar = (e) => {
    setUbiClient(e.latLng);
    setUbiClients(JSON.parse(JSON.stringify(e.latLng)));
  };
  const clickes = (e) => {
    console.log(e.latLng);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "50vh",
        width: "100%",
      }}
    >
      <Box sx={{ width: '95%' }}>
        <Wrapper
          apiKey={"AIzaSyApkPG16W22iNOPOW1uwbIgLEpAdD7TL0I"}
          render={render}
          version="beta"
        >
          <Mapa
            center={center}
            zoom={zoom}
            style={{ flexGrow: "1", height: "100%" }}
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
          </Mapa>
        </Wrapper>
      </Box>
    </Box>
  );
};

const Mapa = ({
  onIdle,
  onclick,
  children,
  style,
  ...options
}) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
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
export default EdicionMaps;

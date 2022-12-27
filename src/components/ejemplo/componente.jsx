import { useRef, useEffect, useState } from "react";
export function MyMapComponent({
  center,
  zoom,
}) {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if(ref.current && !map){
      setMap(new window.google.maps.Map(ref.current, {center,
      zoom,}));
    }
  },[ref, map]);
  return <div ref={ref} />
}

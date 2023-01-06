import { createContext, useState } from "react";

export const GoogleContext = createContext();

export const GoogleProvider = (props) => {
  const [ubicacionC, setUbicacionC] = useState({lat:'', lng:''});

  return (
    <GoogleContext.Provider value={{ubicacionC, setUbicacionC}}>
      {props.children}
    </GoogleContext.Provider>
  );
}
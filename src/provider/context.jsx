import { Children, createContext, useContext, useState } from "react";

const userContext = createContext();
const userCambiar = createContext();
export function useUserContext(){
  return useContext(userContext);
}

export function useCambioContext() {
  return useContext(userCambiar);
}

export function UserProvider(){
  const [user, setUser] = useState(null);

  const cambiar = ()=>{
    if(user){
      setUser();
    }
    else{
      setUser({
        name: 'John',
        email: 'john@example.com'
      });
    }
  }
  return (
    <userContext.Provider value={user}>
      <userCambiar.Provider value={ cambiar} >
        {Children}
      </userCambiar.Provider>
    </userContext.Provider>
  );

}
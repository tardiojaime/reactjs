import { createContext, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./entidad/home/global/Topbar";
import Dashboar from "./entidad/home";
import Sidebar from "./entidad/home/global/Sidebar";
import Rol from "./entidad/rol";
import Crearrol from "./entidad/rol/create";
import Telefono from "./entidad/telefono";
import Cliente from "./entidad/cliente";
import Categoria from "./entidad/categoria";
import Appss from "./components/ejemplo/basic";
import CreateCategory from "./entidad/categoria/create";
import EditCategory from "./entidad/categoria/update";
import EditRol from "./entidad/rol/update";
import CreatePhone from "./entidad/telefono/create";
import EditPhone from "./entidad/telefono/update";
import CreateClient from "./entidad/cliente/create";
import EditClient from "./entidad/cliente/update";
import SelectMaps from "./entidad/cliente/createmaps";
import Ubicacion from "./components/maps/ubicacion";
import { GoogleContext, GoogleProvider } from "./provider/googlemaps";
import UbicacionCliente from "./entidad/cliente/maps";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GoogleProvider>
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboar />} />
                {/* rutas para rol */}
                <Route path="/rol" element={<Rol />} />
                <Route path="/rol/create" element={<Crearrol />} />
                <Route path="/rol/edit/:id" element={<EditRol />} />
                {/* rutas para telefono */}
                <Route path="/telefono" element={<Telefono />} />
                <Route path="/telefono/create" element={<CreatePhone />} />
                <Route path="/telefono/edit/:id" element={<EditPhone />} />
                {/* rutas para cliente */}
                <Route path="/cliente" element={<Cliente />} />
                <Route path="/cliente/u/:lat/:lng/:user" element={<UbicacionCliente />} />
                <Route path="/cliente/create" element={<CreateClient />} />
                <Route path="/cliente/maps" element={<SelectMaps />} />
                <Route path="/cliente/edit/:id" element={<EditClient />} />
                {/* rutas para cetegoria */}
                <Route path="/categoria" element={<Categoria />} />
                <Route path="/categoria/create" element={<CreateCategory />} />
                <Route path="/categoria/edit/:id" element={<EditCategory />} />

                <Route path="/creates" element={<CreateCategory />} />
                <Route path="/mapa" element={<Appss />} />
              </Routes>
            </main>
          </div>
        </GoogleProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

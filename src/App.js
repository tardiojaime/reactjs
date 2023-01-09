import { useState } from "react";
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
import { GoogleProvider } from "./provider/googlemaps";
import UbicacionCliente from "./entidad/cliente/maps";
import Vehiculo from "./entidad/Vehiculo";
import CreateVehiculo from "./entidad/Vehiculo/create";
import EditVehiculo from "./entidad/Vehiculo/update";
import Almacen from "./entidad/almacen";
import Conductor from "./entidad/conductor";
import CreateConductor from "./entidad/conductor/create";
import EditConductor from "./entidad/conductor/update";
import Proveedor from "./entidad/proveedor";
import CreateProveedor from "./entidad/proveedor/create";
import EditProveedor from "./entidad/proveedor/update";
import Pedido from "./entidad/pedido";
import AsingarP from "./entidad/pedido/update";

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
                {/* ruta almacen */}
                <Route path="/almacen" element={<Almacen />} />
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
                {/* Rutas para movilidades */}
                <Route path="/vehiculo" element={<Vehiculo />} />
                <Route path="/vehiculo/create" element={<CreateVehiculo />} />
                <Route path="/vehiculo/edit/:id" element={<EditVehiculo />} />
                {/* rutas para conductores o personal de entrega */}
                <Route path="/conductor" element={<Conductor />} />
                <Route path="/conductor/create" element={<CreateConductor />} />
                <Route path="/conductor/edit/:id" element={<EditConductor />} />
                {/* rutas para proveedores */}
                <Route path="/proveedor" element={<Proveedor />} />
                <Route path="/proveedor/create" element={<CreateProveedor />} />
                <Route path="/proveedor/edit/:id" element={<EditProveedor />} />
                {/* rutas para ususario */}

                {/* rata par pedido */}
                <Route path="/pedido" element={<Pedido />} />
                {/* tarea */}
                <Route path="pedido/asignar/:id" element={<AsingarP />} />

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

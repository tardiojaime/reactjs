import { useState } from "react";
import { ColorModeContext, useMode} from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './entidad/home/global/Topbar';
import Dashboar from './entidad/home';
import Sidebar from './entidad/home/global/Sidebar';
import Rol from "./entidad/rol";
import Crearrol from "./entidad/rol/create";
import Telefono from './entidad/telefono';
import Cliente from "./entidad/cliente";
import Categoria from "./entidad/categoria";
import Appss from "./components/ejemplo/basic";
import CreateCategory from "./entidad/categoria/create";
import EditCategory from "./entidad/categoria/update";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className='content'>
          <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path='/' element={<Dashboar/>} />
              {/* rutas para rol */}
              <Route path='/rol' element={<Rol/>} />
              <Route path='create' element={<Crearrol/>} />
                {/* <Route path='/rol/edit/:id' element={<EditCategory/>}/> */}
              <Route path='/telefono' element={<Telefono />} />
              <Route path='/cliente' element={<Cliente/>} />
              {/* rutas para cetegoria */}
              <Route path='/categoria' element={<Categoria/>} />
              <Route path='/categoria/create' element={<CreateCategory/>} />            
              <Route path='/categoria/edit/:id' element={<EditCategory/>} />

              <Route path='/creates' element={<CreateCategory/>} />
              <Route path='/mapa' element= {<Appss/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

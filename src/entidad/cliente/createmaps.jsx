import { GoogleContext } from "../../provider/googlemaps";
import { Box, Fab } from "@mui/material";
import Ubicacion from "../../components/maps/ubicacion";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import NavigationIcon from '@mui/icons-material/Navigation';
import { useContext } from "react";

const SelectMaps = () => {
  const {ubicacionC} = useContext(GoogleContext);
  return (
    <>    
      <Box sx={{width:'100%', height:'35px', display:'flex', justifyContent:'space-between', pl:5, pr:5}}>
      <Header subtitle="Registre punto de entrega..." />
      { 
      ubicacionC.lat !== '' ? <Link to='/cliente/create' ><Fab variant="extended" size="medium" color='secondary'>
      <NavigationIcon sx={{ mr: 1 }} />
      Siguiente
    </Fab></Link>: <Fab disabled variant="extended" size="medium" color='secondary'>
        <NavigationIcon sx={{ mr: 1 }} />
        Siguiente
      </Fab>
      }

      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "80vh",
          width: "100%",
        }}
      >
        <Box sx={{ width: '95%' }}>
          <Ubicacion />
        </Box>
      </Box>
    </>
  );
};
export default SelectMaps;

import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import { Registrar } from "./service";
import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
/* class Crearrol extends React.Component{
  constructor(props)
} */
function Crearrol(){
  const [rol, setrol] = useState({
    nombre: "",
  });

  const navegacion = useNavigate();
  const onsubmit = async(e) => {
    e.preventDefault();
    const res = await Registrar(rol);

    res.status===201 ? navegacion('/rol'): console.log('se produjo un error...');
  };
  const cambiarrol = (e) => {
    setrol({
      nombre: e.target.value,
    });
  };
  return (
    <Box
      sx={{
        borderRadius: "20px",
        backgroundColor: "#cce9f1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: '10px 0 10px 0',
      }}
    >
      <div>
        <Header title="Agregar nuevo rol" size />
        <form onSubmit={onsubmit}>
          <div>
            <TextField
              id="nombre_rol"
              label="Nombre del Rol"
              value={setrol.nombre}
              type="text"
              size="small"
              onChange={cambiarrol}
            />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "10px", display: "flex", alignItems: "center" }}
              endIcon={<SendIcon />}
            >
              registrar
            </Button>
          </Box>
        </form>
      </div>
    </Box>
  );
};
export default Crearrol;

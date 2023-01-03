import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "../../server/axios";
const sql = new Axios();
const url = process.env.REACT_APP_CATEGORIA;

function CreateCat(){
  const [categoria, setCat] = useState({
    categoria:'',
    peso: 0,
  });

  const navegacion = useNavigate();
  const onsubmit = async(e) => {
    e.preventDefault();
    const res = sql.toRegister(url, categoria);

    res.status===201 ? navegacion('/rol'): console.log('se produjo un error...');
  };
  const cambiarrol = (e) => {
    setCat({
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
              value={categoria.nombre}
              type="text"
              size="small"
              required
              onChange={cambiarrol}
            />
          </div>
          <div>
            <TextField
              id="nombre_rol"
              label="Nombre del Rol"
              value={categoria.nombre}
              type="text"
              size="small"
              required
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
export default CreateCat;

import { Box, TextField, Button, Fab } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from "../../server/axios";
import Alerts from "../../components/alert/alert";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU';
const sql = new Axios(token);
const url = process.env.REACT_APP_CATEGORIA;

function CreateCategory() {
  const [nueva, setCategoria] = useState({
    categoria: '',
    peso: 0
  });
  const [alerta, setAlerta] = useState(false);
  const alertupdate = ()=> setAlerta(false);
  //const navegacion = useNavigate();
  const onsubmit = async (e) => {
    e.preventDefault();
    const res = await sql.toRegister(url, nueva);
    try {
      //res.status === 201 ? navegacion('/categoria') : console.log('se produjo un error...');      
      res.status === 201 ?  setAlerta(true): console.log('se produjo un error...');
    } catch (error) {
      console.log(error);
    }
  };
  const Acategoria = (e) => {
    setCategoria({categoria:e.target.value, peso:nueva.peso});
  }
  const Apeso = (e) => {
    setCategoria({categoria:nueva.categoria, peso: parseInt(e.target.value)});    
  }
  return (
    <Box
      sx={{
        borderRadius: "20px",
        //backgroundColor: "#cce9f1",
        display: 'flex',
        justifyContent: "center",
        //alignItems: "center",
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      {
        alerta && <Alerts tipo='success' cambiar={alertupdate} />
      }
      <div>
        <Header title="Agregar nueva Categoria" center='center' />
        <form onSubmit={onsubmit}>
          <div>
            <TextField
              id="id_categoria"
              label="Nombre"              
              type="text"
              size="small"
              required
              onChange={Acategoria}
            />
            <TextField
              id="id_peso"
              label="Peso"
              type="number"
              size="small"
              onChange={Apeso}
              required
            />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: 1,
            }}
          >
            <Link to='/categoria'>
              <Fab color="secondary" aria-label="Volver" size="small">
                <ArrowBackSharpIcon />
              </Fab>
            </Link>
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
export default CreateCategory;

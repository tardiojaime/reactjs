import { Box, TextField, Button, Fab, MenuItem } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "../../server/axios";
import Alerts from "../../components/alert/alert";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU";
const sql = new Axios(token);
const url = process.env.REACT_APP_KEY_MOVILIDAD;

function EditVehiculo() {
  const [editar, setEditar] = useState({
    modelo: '1201',
    marca:'',
    color:'primary',
    tipo_movilidad: '',	
  });
  const onchange = (a) => {
    setEditar({
      ...editar,
      [a.target.name]: a.target.value
    })
    console.log(editar);
  };
  const navegacion = useNavigate();
  const [alerta, setAlerta] = useState(false);
  const alertupdate = () => setAlerta(false);
  //const navegacion = useNavigate();
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(editar);
      const res = await sql.UpdatePut(url, editar, editar.num_placa);
      //res.status === 201 ? navegacion('/categoria') : console.log('se produjo un error...');      
      res.status !== 200 ? setAlerta(true) : navegacion('/vehiculo');
    } catch (error) {
      console.log(error);
    }
  };
  const { id } = useParams();
  const mostrar = async () => {
    try {
      const result = await sql.AllOne(id, url);
      if (result.status === 200) {
        setEditar('');
        setEditar(result.data);
        //        result.data.id ? setEditar(result.data): setAlerta(true);
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    mostrar();
  }, []);
  return (
    <Box
      sx={{
        borderRadius: "20px",
        //backgroundColor: "#cce9f1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      {alerta && <Alerts tipo="success" cambiar={alertupdate} />}
      <div>
        <Header title="Agregar nuevo Vehiculo" center={"center"} />
        <form onSubmit={onsubmit}>
          <div>
            <TextField
              label="Modelo"
              select
              size="small"
              name="modelo"
              required
              value={editar.modelo}
              onChange={onchange}
            >
              {
                [2023, 2022,2021,2020,2019,2018,2017,2016,2017,2016,2015,2014, 2013,2012,2011,2010].map((value, key)=>(
                  <MenuItem key={key} value={value+''}>
                  {value}
                </MenuItem>
                ))
              }
            </TextField>
            <TextField
              label="Marca"
              type="text"
              name="marca"
              required
              size="small"
              value={editar.marca}
              onChange={onchange}
            />
          </div>
          <div>
            <TextField
              label="Color"
              select
              size="small"
              name="color"
              required
              value={editar.color}
              onChange={onchange}
            >
              {
                ['rojo', 'plateado', 'negro', 'blanco', 'otro'].map((value, key)=>(
                  <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
                ))
              }
            </TextField>
          <TextField
              label="Tipo"
              select
              size="small"
              name="tipo_movilidad"
              required
              value={editar.tipo_movilidad}
              onChange={onchange}
            >
              {
                ['Bicicleta', 'Motocicleta', 'Van'].map((value, key)=>(
                  <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
                ))
              }
            </TextField>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/vehiculo">
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
}
export default EditVehiculo;

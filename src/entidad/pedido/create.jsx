import { Box, TextField, Button, Fab, MenuItem } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../server/axios";
import Alerts from "../../components/alert/alert";

import { useForm } from "react-hook-form";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU";
const sql = new Axios(token);
const url = process.env.REACT_APP_KEY_MOVILIDAD;

function CreateVehiculo() {
  /* utilizamos react-hook-form */
  const { register, handleSubmit } = useForm();

  const [alerta, setAlerta] = useState(false);
  const alertupdate = () => setAlerta(false);
  //const navegacion = useNavigate();
  const onsubmit = async (d) => {
    console.log(d);
    try {
      //res.status === 201 ? navegacion('/categoria') : console.log('se produjo un error...');
      const res = await sql.toRegister(url, d);
      res.status === 201
        ? setAlerta(true)
        : console.log("se produjo un error...");
    } catch (error) {
      console.log(error);
    }
  };
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
        <form onSubmit={handleSubmit(onsubmit)}>
          <div>
            <TextField
              label="Num Placa"
              type="text"
              required
              size="small"
              {...register("num_placa")}
            />
            <TextField
              label="Modelo"
              select
              size="small"
              required
              defaultValue='2016'
              {...register("modelo")}
            >
              {
                ["2023","2022","2021","2020","2019","2018","2017","2016","2017","2016","2015","2014", "2013","2012","2011","2010"].map((value, key)=>(
                  <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
                ))
              }
            </TextField>
          </div>
          <div>
            <TextField
              label="Marca"
              type="text"
              required
              size="small"
              {...register("marca")}
            />
            <TextField
              label="Color"
              select
              size="small"
              required
              defaultValue='otro'
              {...register("color")}
            >
              {
                ['rojo', 'plateado', 'negro', 'blanco', 'otro'].map((value, key)=>(
                  <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
                ))
              }
            </TextField>
          </div>
          <div>
          <TextField
              label="Tipo"
              select
              size="small"
              defaultValue='Van'
              required
              {...register('tipo_movilidad')}
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
export default CreateVehiculo;

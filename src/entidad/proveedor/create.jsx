import {
  Box,
  TextField,
  Button,
  Fab,
  MenuItem,
} from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import Axios from "../../server/axios";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import Alerts from "../../components/alert/alert";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container } from "@mui/system";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU";
const sql = new Axios(token);
const url = process.env.REACT_APP_KEY_PROVEEDOR;
function CreateProveedor() {
  //const { ubicacionC } = useContext(GoogleContext);
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const alertupdate = () => setAlerta(false);
  const errorUpdate = () => setError(false);

  const onsubmit = async (e) => {
    console.log(e);
    try {
      const res = await sql.toRegister(url, e);
      if (res.status === 201) {
        res.data.error === "error" ?  setError(true): setAlerta(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      {alerta && <Alerts tipo="success" cambiar={alertupdate} />}
      {error && <Alerts tipo="error" cambiar={errorUpdate} />}
      <Container>
        <Header subtitle="Agregar un nuevo Registro" center="center" />
        <form onSubmit={handleSubmit(onsubmit)}>

          <div>
            <TextField
              label="CI"
              type="text"
              size="small"
              {...register("ci")}
              required
            />
            <TextField
              label="Nombre"
              type="text"
              {...register("nombre")}
              size="small"
              required
            />
          </div>
          <div>
            <TextField
              label="Apellido"
              type="text"
              {...register("apellido")}
              size="small"
              required
            />
            <TextField
              label="Email"
              type="email"
              size="small"
              required
              {...register("email")}
            />
          </div>
          <div>
            <TextField
              label="Telefono"
              type="text"
              size="small"
              required
              {...register("telefono")}
            />
            <TextField
              label="Sexo"
              select
              size="small"
              name="sexo"
              defaultValue='m'
              {...register("sexo")}
              required
            >
              <MenuItem key="1" value="f">
                Femenino
              </MenuItem>
              <MenuItem key="0" value="m">
                Masculino
              </MenuItem>
            </TextField>
          </div>
          <div>
            <TextField
              label="Edad"
              type="number"
              size="small"
              required
              {...register("edad")}
            />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: 1,
            }}
          >
            <Link to="/proveedor">
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
      </Container>
    </Box>
  );
}
export default CreateProveedor;

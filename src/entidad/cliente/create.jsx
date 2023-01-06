import {
  Box,
  TextField,
  Button,
  Fab,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import Header from "../../components/Header";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import Axios from "../../server/axios";
import Alerts from "../../components/alert/alert";
import { useForm } from "react-hook-form";
import { GoogleContext } from "../../provider/googlemaps";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU";
const sql = new Axios(token);
const url = process.env.REACT_APP_CLIENTE;

function CreateClient() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { ubicacionC } = useContext(GoogleContext);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { register, handleSubmit } = useForm();
  const [alerta, setAlerta] = useState(false);
  const [error, setError] = useState(false);
  const errorUpdate = () => setError(false);
  const alertupdate = () => setAlerta(false);
  //const navegacion = useNavigate();
  const onsubmit = async (e) => {
    //e.preventDefault();
    const res = await sql.toRegister(url, e);
    try {
      //res.status === 201 ? navegacion('/categoria') : console.log('se produjo un error...');
      if (res.status === 201){
        console.log(res);
        res.data.error === undefined ? setAlerta(true): setError(true);
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
        display: "flex",
        justifyContent: "center",
        //alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      {alerta && <Alerts tipo="success" cambiar={alertupdate} />}
      {error && <Alerts tipo="error" cambiar={errorUpdate} />}
      <div>
        <Box sx={{display:'flex', justifyContent: 'space-between'}}>
        <Header title="Agregar nuevo Cliente"/>
        <Link to="/cliente/maps">
          <Fab variant="extended" color="success" aria-label="Volver" size="small">
            <NotListedLocationIcon sx={{ mr: 1 }}/>
            Obtener
          </Fab>
        </Link>
        </Box>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div>
            <TextField
              label="Ci"
              type="text"
              size="small"
              required
              {...register("ci")}
            />
            <TextField
              label="Nombre Usuario"
              type="text"
              size="small"
              required
              {...register("usuario")}
            />
          </div>
          <div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                size="small"
                type={showPassword ? "text" : "password"}
                {...register("contrasena")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      //onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contrasena"
              />
            </FormControl>
            <TextField
              label="Nombre"
              type="text"
              size="small"
              required
              {...register("nombre")}
            />
          </div>
          <div>
            <TextField
              label="Apellido"
              type="text"
              size="small"
              required
              {...register("apellido")}
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
              label="Fecha de nacimiento"
              type="date"
              size="small"
              required
              {...register("fechanacimiento")}
            />
            <TextField
              label="Telefono"
              type="text"
              size="small"
              required
              {...register("telefono")}
            />
          </div>
          <div>
            <TextField
              label="Sexo"
              select
              size="small"
              defaultValue="f"
              required
              {...register("sexo")}
            >
              <MenuItem key="1" value="f">
                Femenino
              </MenuItem>
              <MenuItem key="0" value="m">
                Masculino
              </MenuItem>
            </TextField>
            <TextField
              label="Calle/numero"
              type="text"
              size="small"
              required
              {...register("calle_numero")}
            />
          </div>
          <div>
            <TextField
              label="latitud"
              type="text"
              size="small"
              required
              value={ubicacionC.lat}
              {...register("latitud")}
            />
            <TextField
              label="longitud"
              type="text"
              size="small"
              required
              value={ubicacionC.lng}
              {...register("longitud")}
            />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: 1,
            }}
          >
            <Link to="/cliente">
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
export default CreateClient;

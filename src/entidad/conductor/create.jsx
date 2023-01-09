import {
  Box,
  TextField,
  Button,
  Fab,
  Tab,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  MenuItem,
  Container,
} from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../server/axios";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import TabPanel from "@mui/lab/TabPanel";
import Alerts from "../../components/alert/alert";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU";
const sql = new Axios(token);
const url = process.env.REACT_APP_CONDUCTOR;
function CreateConductor() {
  //const { ubicacionC } = useContext(GoogleContext);
  const { register, handleSubmit } = useForm();

  const [value, setValue] = React.useState("1");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [Movilidad, setMovilidad] = useState([{num_placa:''}]);
  const [phones, setPhones] = useState([{id:0}]);
  const [error, setError] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const alertupdate = () => setAlerta(false);
  const errorUpdate = () => setError(false);

  const navegacion = useNavigate();

  const onsubmit = async (e) => {
    console.log(e);
    try {
      const res = await sql.toRegister(url, e);
      if (res.status === 201){
        res.data.error === 'error' ? setAlerta(true): setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const telefono = async () => {
    try {
      const result = await sql.All(url + "/telefono");
      if (result.status === 200) {
        console.log(result.data.map);
        setPhones("");
        setPhones(result.data);
      } else {
        setAlerta(true);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const vehiculo = async () => {
    try {
      const result = await sql.All(url + "/vehiculo");
      if (result.status === 200) {
        console.log(result);
        setMovilidad("");
        setMovilidad(result.data);
      } else {
        setAlerta(true);
      }
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    telefono();
    vehiculo();
  }, []);
  return (
    <Box
      sx={{
        borderRadius: "20px",
      }}
    >
      {alerta && <Alerts tipo="success" cambiar={alertupdate} />}
      {error && <Alerts tipo="error" cambiar={errorUpdate} />}
      <Header subtitle="Agregar un nuevo Registro" center="center" />
      <form onSubmit={handleSubmit(onsubmit)}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ display: "flex", justifycontent: "center" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Datos Generales" value="1" />
                <Tab label="Secundarios" value="2" />
              </TabList>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "80%",
                justifyContent: "center",
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <TabPanel value="1">
                <div>
                  <TextField
                    label="CI"
                    type="text"
                    size="small"
                    {...register("ci")}
                    required
                  />
                  <TextField
                    label="Nombre Usuario"
                    type="text"
                    {...register("usuario")}
                    size="small"
                    required
                  />
                </div>
                <div>
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="contrasena"
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
                    label="Email"
                    type="email"
                    size="small"
                    required
                    {...register("email")}
                  />
                </div>
                <div>
                  <TextField
                    label="Nombre"
                    type="text"
                    size="small"
                    required
                    {...register("nombre")}
                  />
                  <TextField
                    label="Apellido"
                    type="text"
                    size="small"
                    required
                    {...register("apellido")}
                  />
                </div>
                <div>
                  <TextField
                    label="Fecha de nacimiento"
                    type="date"
                    size="small"
                    focused
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
              </TabPanel>
              <TabPanel value="2">
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
                    label="Telefono"
                    select
                    size="small"
                    defaultValue={phones[0].id}
                    required
                    {...register("id_movil")}
                  >
                    {phones.map((value, index) => (
                      <MenuItem key={index+'Pho'} value={value.id}>
                        {value.marca + " " + value.modelo}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <TextField
                    label="Anos/Experiencia"
                    type="number"
                    min="1"
                    size="small"
                    required
                    {...register("anos_experiencia", {min: 1, max:40, type: 'number'})}
                  />
                  <TextField
                    label="Vehiculo"
                    select
                    size="small"
                    required
                    defaultValue={Movilidad[0].num_placa}
                    {...register("id_movilidad")}
                  >
                    {Movilidad.map((value, index) => (
                      <MenuItem key={index+'Mov'} value={value.num_placa}>
                        {value.marca + " " + value.modelo}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <TextField
                    label="Tipo/Licencia"
                    select
                    size="small"
                    defaultValue="A"
                    required
                    {...register("tipo_licencia")}
                  >
                    <MenuItem key="1" value="A">
                      Catergoria A
                    </MenuItem>
                    <MenuItem key="0" value="B">
                      Categoria B
                    </MenuItem>
                    <MenuItem key="2" value="B">
                      Categoria C
                    </MenuItem>
                  </TextField>
                </div>
              </TabPanel>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "80%",
                justifyContent: "center",
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            ></Box>
          </TabContext>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: 1,
          }}
        >
          <Link to="/conductor">
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
    </Box>
  );
}
export default CreateConductor;

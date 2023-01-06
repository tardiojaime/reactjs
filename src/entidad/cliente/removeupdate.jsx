import { Box, TextField, Button, Fab, Tab, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, MenuItem } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "../../server/axios";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import TabPanel from '@mui/lab/TabPanel';
import Alerts from "../../components/alert/alert";
import { Link } from "react-router-dom";
import EdicionMaps from "./edicionMaps";
import { GoogleContext } from "../../provider/googlemaps";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU';
const sql = new Axios(token);
const url = process.env.REACT_APP_CLIENTE;
function EditClient() {
  //const { ubicacionC } = useContext(GoogleContext);

  const [editar, setEditar] = useState({
    ci:'gf',
    usuario: 'gfds',
    nombre: 'fgd',
    apellido: 'fdg',
    email: 'dfg@gmail.com', 
    fecha_nacimiento: '05-08-2014', 
    telefono: 'dsfgs',
    sexo: 'f',
    calle_numero:'2121',
    latitud: '5415152',
    longitud: '521515',	
  });
  const [value, setValue] = React.useState('1');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onchange = (a) => {
    setEditar({
      ...editar,
      [a.target.name]: a.target.value
    })
    console.log(a.target.name);
  };
  const onSubmit = data => console.log(editar);

  const [alerta, setAlerta] = useState(false);
  const alertupdate = () => setAlerta(false);

  const navegacion = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sql.UpdatePut(url, editar, editar.id);
      //res.status === 201 ? navegacion('/categoria') : console.log('se produjo un error...');      
      res.status !== 200 ? setAlerta(true) : navegacion('/cliente');
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
      }else{
        setAlerta(true);
      }
    } catch (error) {
      console.log('error');
    }
  }
  console.log(editar.nombre);
  useEffect(() => {
    mostrar();
  }, []);
  return (
    <Box
      sx={{
        borderRadius: "20px",
      }}
    >
      {
        alerta && <Alerts tipo='error' cambiar={alertupdate} />
      }
      <Header title="Actualizar datos" center='center' />
      <form onSubmit={onsubmit}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ display: 'flex', justifycontent: 'center' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="General" value="1" />
                <Tab label="Secundarios" value="2" />
                <Tab label="Ubicacion" value="3" />
                <Tab label="Ubicacion +" value="4" />
              </TabList>
            </Box>
            <Box sx={{ display: 'flex', width: '80%', justifyContent: 'center', "& .MuiTextField-root": { m: 1, width: "25ch" }, }}>
              <TabPanel value="1">
                <div>
                  <TextField
                    name='usuario'
                    label="Usuario"
                    type="text"
                    size="small"
                    value={editar.usuario}
                    onChange={onchange}
                    required
                  />
                  <TextField
                    label="Nombre"
                    name='nombre'
                    type="text"
                    value={editar.nombre}
                    onChange={onchange}
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
                      value={editar.ci}
                      onChange={onchange}
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
                    name='email'
                    size="small"
                    value={editar.email}
                    onChange={onchange}
                    required
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div>
                  <TextField
                    label="Apellido"
                    type="text"
                    name='apellido'
                    size="small"
                    value={editar.apellido}
                    onChange={onchange}
                    required
                  />
                  <TextField
                    label="Fecha de nacimiento"
                    type="date"
                    size="small"
                    name="fechanacimiento"
                    value={editar.fechanacimiento}
                    onChange={onchange}
                    required
                  />
                </div>
                <div>
                  <TextField
                    label="Telefono"
                    type="text"
                    size="small"
                    name="telefono"
                    required
                    value={editar.telefono}
                    onChange={onchange}
                  />
                  <TextField
                    label="Sexo"
                    select
                    size="small"
                    name="sexo"
                    value={editar.sexo}
                    onChange={onchange}
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
              </TabPanel>
            </Box>
              <TabPanel value="3"><EdicionMaps/></TabPanel>
            <Box sx={{ display: 'flex', width: '80%', justifyContent: 'center', "& .MuiTextField-root": { m: 1, width: "25ch" }, }}>
              <TabPanel value="4">
              <div>
              <TextField
              label="Calle/numero"
              type="text"
              size="small"
              required
              value={editar.calle_numero}
              onChange={onchange}
            />
              </div>
              <div>
            <TextField
              label="latitud"
              type="text"
              size="small"
              required
              value={editar.latitud}
              onChange={onchange}
            />
            <TextField
              label="longitud"
              type="text"
              size="small"
              required
              onChange={onchange}
              value={editar.longitud}
            />
          </div>
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: 1,
          }}
        >
          <Link to='/cliente'>
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
};
export default EditClient;

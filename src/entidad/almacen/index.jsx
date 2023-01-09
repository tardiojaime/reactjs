import {
  Box,
  TextField,
  Fab,
  Tab
} from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../server/axios";
import Alerts from "../../components/alert/alert";
import EdicionMaps from "../cliente/edicionMaps";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU";
const sql = new Axios(token);
const url = process.env.REACT_APP_KEY_ALMACEN;
function Almacen() {
  //const { ubicacionC } = useContext(GoogleContext);

  const [editar, setEditar] = useState({
    id: 1,
    almacen: "",
    latitud: "",
    longitud: "",
    capacidad: "",
  });
  const onchange = (a) => {
    setEditar({
      ...editar,
      [a.target.name]: a.target.value,
    });
    console.log(a.target.name);
  };
  const setUbiClient = (e) => {
    setEditar({ ...editar, latitud: e.lat+'', longitud: e.lng+'' });
  };
  const [alerta, setAlerta] = useState(false);
  const alertupdate = () => setAlerta(false);
  const navegacion = useNavigate();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onsubmit = async (e) => {
    console.log(editar);
    e.preventDefault();
    try {
      const res = await sql.UpdatePut(url, editar, editar.id);
      //res.status === 201 ? navegacion('/categoria') : console.log('se produjo un error...');
      res.status === 200 ? setAlerta(true) : console.log('datos guardados');
    } catch (error) {
      console.log(error);
    }
  };

  const mostrar = async () => {
    console.log(url);
    try {
      const result = await sql.AllOne(1, url);
      if (result.status === 200) {
        setEditar("");
        setEditar(result.data);
        //        result.data.id ? setEditar(result.data): setAlerta(true);
      } else {
        setAlerta(true);
      }
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    mostrar();
  }, []);
  return (
    <Box
      sx={{
        borderRadius: "20px",
        width: "100%",
      }}
    >
      {alerta && <Alerts tipo="success" cambiar={alertupdate} />}
      <Header
        title="Informacion"
        subtitle="Datos del el almacen"
        center="center"
      />
      <form onSubmit={onsubmit}>

        <Box sx={{ width: "100%"}}>
          <TabContext value={value}>
            <Box sx={{ display: "flex", justifycontent: "center" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="General" value="1" />
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
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <div>
                    <TextField
                      name="latitud"
                      label="Latitud"
                      type="text"
                      size="small"
                      value={editar.latitud}
                      onChange={setUbiClient}
                      required
                    />
                    <TextField
                      label="Longitud"
                      name="longitud"
                      type="text"
                      value={editar.longitud}
                      onChange={setUbiClient}
                      size="small"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      name="almacen"
                      label="Nombre"
                      type="text"
                      size="small"
                      value={editar.almacen}
                      onChange={onchange}
                      required
                    />
                    <TextField
                      label="Capacidad"
                      name="capacidad"
                      type="number"
                      value={editar.capacidad}
                      onChange={onchange}
                      //focused
                      size="small"
                      required
                    />
                  </div>
                </Box>
              </TabPanel>
            </Box>
            <TabPanel value="2">
              <EdicionMaps ubiClients={{ lat: parseFloat(editar.latitud), lng: parseFloat(editar.longitud) }} setUbiClients={setUbiClient} />
            </TabPanel>
          </TabContext>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            m: 1,
          }}
        >
          <Fab type="submit" variant="extended" size="medium" color="secondary">
            <SendIcon sx={{ mr: 1 }} />
            Actualizar
          </Fab>
        </Box>
      </form>
    </Box>
  );
}
export default Almacen;

import {
  Box,
  TextField,
  Button,
  Fab,
  MenuItem,
} from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../server/axios";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import Alerts from "../../components/alert/alert";
import { Link } from "react-router-dom";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU";
const sql = new Axios(token);
const url = process.env.REACT_APP_KEY_PROVEEDOR;
function EditProveedor() {
  //const { ubicacionC } = useContext(GoogleContext);

  const [editar, setEditar] = useState({
    ci: "gf",
    nombre: "fgd",
    apellido: "fdg",
    email: "dfg@gmail.com",
    telefono: "dsfgs",
    sexo: "f",
    edad: 10,
  });

  const onchange = (a) => {
    setEditar({
      ...editar,
      [a.target.name]: a.target.value,
    });
  };

  const [alerta, setAlerta] = useState(false);
  const alertupdate = () => setAlerta(false);

  const navegacion = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sql.UpdatePut(url, editar, editar.ci);
      res.status !== 200 ? setAlerta(true) : navegacion("/proveedor");
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = useParams();
  const mostrar = async () => {
    try {
      const result = await sql.AllOne(id, url);
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
        //backgroundColor: "#cce9f1",
        display: 'flex',
        justifyContent: "center",
        //alignItems: "center",
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      {alerta && <Alerts tipo="error" cambiar={alertupdate} />}
      <div>
        <Header title="Actualizar datos" center="center" />
        <form onSubmit={onsubmit}>
          <div>
            <TextField
              label="CI"
              type="text"
              size="small"
              name="ci"
              required
              value={editar.ci}
              onChange={onchange}
            />
            <TextField
              label="Nombre"
              type="text"
              name="nombre"
              size="small"
              required
              value={editar.nombre}
              onChange={onchange}
            />
          </div>
          <div>
            <TextField
              label="Apellido"
              type="text"
              name="apellido"
              size="small"
              value={editar.apellido}
              onChange={onchange}
              required
            />
            <TextField
              label="Email"
              type="email"
              size="small"
              required
              name="email"
              value={editar.email}
              onChange={onchange}
            />
          </div>
          <div>
            <TextField
              label="Telefono"
              type="text"
              size="small"
              required
              name="telefono"
              value={editar.telefono}
              onChange={onchange}
            />
            <TextField
              label="Sexo"
              select
              size="small"
              name="sexo"
              defaultValue="m"
              required
              value={editar.sexo}
              onChange={onchange}
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
              name="edad"
              value={editar.edad}
              onChange={onchange}
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
      </div>
    </Box>
  );
}
export default EditProveedor;

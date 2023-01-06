import { Box, TextField, Button, Fab, MenuItem  } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "../../server/axios";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Alerts from "../../components/alert/alert";
import { Link } from "react-router-dom";
import { boolean } from "yup";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU';
const sql = new Axios(token);
const url = process.env.REACT_APP_ROL;
function EditRol() {
  const [editar, setEditar] = useState(({id:1, nombre: 'n', estado: boolean }));
  const onchange = (a) => {
    setEditar({
      ...editar,
      [a.target.name]: a.target.value
    })
    console.log(editar);
  };

  const [alerta, setAlerta] = useState(false);
  const alertupdate = () => setAlerta(false);

  const navegacion = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(editar);
      const res = await sql.UpdatePut(url, editar, editar.id);
      //res.status === 201 ? navegacion('/categoria') : console.log('se produjo un error...');      
      res.status !== 200 ? setAlerta(true) : navegacion('/rol');
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
        display: 'flex',
        justifyContent: "center",
        //alignItems: "center",
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      {
        alerta && <Alerts tipo='error' cambiar={alertupdate} />
      }
      <div>
        <Header title="Editar Rol" center='center' />
        <form onSubmit={onsubmit}>          
          <div>
            <TextField
              label="Rol"
              name="nombre"
              type="text"
              size="small"
              value={editar.nombre}
              required
              onChange={onchange}
            />
            <TextField
              label="Estado"
              select 
              size="small"
              name="estado"
              required            
              value={editar.estado}
              onChange={onchange}
              >
                <MenuItem key='1' value={true}>
                  Activo
                </MenuItem>
                <MenuItem key='0' value={false}>
                  Suspendido
                </MenuItem>
              </TextField>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: 1,
            }}
          >
            <Link to='/rol'>
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
export default EditRol;

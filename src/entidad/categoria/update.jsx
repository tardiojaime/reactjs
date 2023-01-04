import { Box, TextField, Button, Fab } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "../../server/axios";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Alerts from "../../components/alert/alert";
import { Link } from "react-router-dom";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU';
const sql = new Axios(token);
const url = process.env.REACT_APP_CATEGORIA;
function EditCategory() {
  const [editar, setEditar] = useState(({id:1, categoria: 'n', peso: 0 }));
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
      res.status !== 200 ? setAlerta(true) : navegacion('/categoria');
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
        <Header title="Agregar nueva Categoria" center='center' />
        <form onSubmit={onsubmit}>          
          <div>
            <TextField
              label="Nombre"
              name="categoria"
              type="text"
              size="small"
              value={editar.categoria}
              required
              onChange={onchange}
            />
            <TextField
              label="Peso"
              type="number"
              size="small"
              name="peso"
              required
              value={editar.peso}
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
export default EditCategory;

import { Box, TextField, Button, Fab } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from "../../server/axios";
import Alerts from "../../components/alert/alert";
import { useForm } from "react-hook-form";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU';
const sql = new Axios(token);
const url = process.env.REACT_APP_TELEFONO;

function CreatePhone() {
  const { register, handleSubmit } = useForm();
  const [alerta, setAlerta] = useState(false);
  const alertupdate = ()=> setAlerta(false);
  const onsubmit = async (e) => {
    ///e.preventDefault();
    console.log(e);
    const res = await sql.toRegister(url, e);
    try {
      //res.status === 201 ? navegacion('/categoria') : console.log('se produjo un error...');      
      res.status === 201 ?  setAlerta(true): console.log('se produjo un error...');
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
      {
        alerta && <Alerts tipo='success' cambiar={alertupdate} />
      }
      <div>
        <Header title="Agregar un nuevo telefono" center='center' />
        <form onSubmit={handleSubmit(onsubmit)}>
        <div>
            <TextField
              label="Modelo"              
              type="text"
              size="small"
              required
              {...register('modelo')}
            />
            <TextField
              label="Numero"
              type="text"
              size="small"              
              required
              {...register('numero')}
            />
          </div>
          <div>
            <TextField
              label="Marca"              
              type="text"
              size="small"
              required
              {...register('marca')}
            />
            <TextField
              label="Color"
              type="text"
              size="small"              
              required
              {...register('color')}
            />
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: 1,
            }}
          >
            <Link to='/telefono'>
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
export default CreatePhone;

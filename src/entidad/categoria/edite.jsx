import { Box, TextField, Button, Fab } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "../../server/axios";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Alerts from "../../components/alert/alert";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU';
const sql = new Axios(token);
const url = process.env.REACT_APP_CATEGORIA;
function EditCategory(){
  const [nueva, setCategoria] = useState({
    categoria: 'hjghj',
    peso: 0
  });
  const Apeso = (e) => {
    console.log('jksdjgfalksdjl');
  }
  //const {register, handleSubmit} = useForm();
  
  const [alerta, setAlerta] = useState(false);
  const alertupdate = ()=> setAlerta(false);

  const navegacion = useNavigate();

  const onsubmit = async (e) => {
    console.log(e);
/*     e.preventDefault();
    const res = await sql.toRegister(url, nueva);
    try {
      //res.status === 201 ? navegacion('/categoria') : console.log('se produjo un error...');      
      res.status !== 200 ?  setAlerta(true): navegacion('/categoria');
    } catch (error) {
      console.log(error);
    } */
  };
  
  const {id} = useParams();
  const mostrar = async()=>{
    try {
      const result = await sql.AllOne(id, url);
      if(result.status ===200){
        result.data.id ? setCategoria(result.data): setAlerta(true);
      }
    } catch (error) {
      
    }
  }
  
  return (
    <Box
    component='form'
    noValidate
      autoComplete="off"
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
        <form >
          <div>
            {nueva.categoria}
            <TextField
              id="id_categoria"
              label="Nombre"              
              type="text"
              size="small"
              required
              defaultValue={nueva.categoria}        
              //{...register('categoria')}
            />
            <TextField
              id="id_peso"
              label="Peso"
              type="number"
              size="small"          
              required
              defaultValue={'1'} 
              //{...register('pesso')}
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

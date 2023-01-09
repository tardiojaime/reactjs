import { Box, TextField, Button, Fab, MenuItem } from "@mui/material";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../server/axios";
import Alerts from "../../components/alert/alert";
import { useForm } from "react-hook-form";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU";
const sql = new Axios(token);
const url = '/tarea';

function AsingarP() {

  const { register, handleSubmit } = useForm();
  const [Conductor, setConductor] = useState([{id:0}]);

  const navegacion = useNavigate();
  const [alerta, setAlerta] = useState(false);
  const alertupdate = () => setAlerta(false);
  //const navegacion = useNavigate();
  const onsubmit = async (e) => {
    try {
      console.log(e);
      const res = await sql.toRegister(url, e);
      //res.status === 201 ? navegacion('/categoria') : console.log('se produjo un error...');
      res.status !== 200 ? setAlerta(true) : navegacion("/pedido");
    } catch (error) {
      console.log(error);
    }
  };
  const { id } = useParams();
  const obrconductor = async () => {
    try {
      const result = await sql.All(url + "/condutores");
      if (result.status === 200) {
        setConductor("");
        setConductor(result.data);
      } else {
        setAlerta(true);
      }
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    obrconductor();
  }, [Conductor]);
  return (
    <Box
      sx={{
        borderRadius: "20px",
        //backgroundColor: "#cce9f1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      {alerta && <Alerts tipo="success" cambiar={alertupdate} />}
      <div>
        <Header title="Asignar Tarea" center={"center"} />
        <form onSubmit={handleSubmit(onsubmit)}>
          <div>
            <TextField
              label="Id Pedido"
              size="small"
              name="modelo"
              required
              value={id}
              disabled
              variant="standard"
              {...register("p_id")}
            />
            <TextField
              label="Usuario"
              size="small"
              variant="standard"
              required
              disabled
              {...register("u_ci")}
            />
            <TextField
              label="Conductor"
              select
              size="small"
              defaultValue={Conductor[0].id}
              required
              {...register("c_id")}
            >
              {Conductor.map((value, index) => (
                <MenuItem key={index + 'ids'} value={value.id}>
                  {value.nombre + " " + value.apellido}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/pedido">
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
              Asignar
            </Button>
          </Box>
        </form>
      </div>
    </Box>
  );
}
export default AsingarP;

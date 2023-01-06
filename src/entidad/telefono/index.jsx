import { Box } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import Axios from "../../server/axios";
import Actions from "../../components/actions/Actions";
import AlertDialog from "../../components/alert/AlertDialog";
import Alerts from "../../components/alert/alert";

import { Link } from "react-router-dom";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNzU1MjU2LCJleHAiOjE2NzI3ODQwNTZ9.vkte7CTxmWqrYldgYs9z_4a5Kfi-0yh_EV3uqaSVkNE';
const sql = new Axios(token);
const url = process.env.REACT_APP_TELEFONO;

const Telefono = () => {
  const [phone, setPhone] = useState([]);
  const [errorCarga, setErrorCar] = useState(false);
  const [alert, setAlert] = useState(false);
  const [page, setPage] = useState(7);
  const [dato, setDato] = useState({
    id: 1,
    Marca: 'no encontrado'
  });

  /* funciones para el componente de acciones */

  const cambiar = () => setErrorCar(false);
  const deleted = (data) => {
    setAlert(true);
    setDato({id:data.row.id, nombre:data.row.modelo + ' '+data.row.marca});
  }
  /* funciones para el componente de dialogo de alerta */
  const cancel = () => alert ? setAlert(false) : null;
  const deleteInfo = async (id) => {
    if (id) {
      console.log(id);
      const resul = await sql.Delete(url, id)
      if (resul.status === 200) {
        setPhone((prevRows)=>prevRows.filter((row)=>row.id !== id));
        setAlert(false);
      }
      else{
        setErrorCar(true);
      }
    }
  }

  useEffect(() => {    
    const cargar = async () => {
      const datos = await sql.All(url);
      if(datos.status){
        if (datos.status === 200) {
          setPhone(datos.data);
        } else {
          setErrorCar(true);
        }
      }
      else{
        setErrorCar(true);
      }
    }
    cargar();
  }, []);
  const columnas = useMemo(() => [
    {
      field: "id",
      headerName: "ID",
      type: "number",
    },
    {
      field: "modelo",
      headerName: "Modelo",
      type: "string",
    },
    {
      field: "numero",
      headerName: "Numero",
      headerAlign: "center",
      align: "center",
      type: "string",
    },
    {
      field: 'marca',
      headerName: 'Marca',
      type:'string',
      align:'center',
    },
    {
      field: 'color',
      headerName: 'Color',
      type: 'string',
      align: 'center',
    },
    {
      field: "createAt",
      headerName: "CreatAt",
      headerAlign: "center",
      align: "right",
      type: "dateTime",
      width: 200,
      maxWidth: 260,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      align: "right",
      width: 200,
      renderCell: param => <Actions {...{param, deleted}}/>
    },
  ], []);
  return (
    <Box m="20px">
      {errorCarga && <Alerts tipo='error'  cambiar={cambiar}/>}
      <Box 
      sx={{
        display: 'flex', 
        justifyContent: 'space-between',
      }}
      >
      <Header title="Telefonos" subtitle="Registros de todos los telefonos" />
      <Link to='/telefono/create'><Fab color="primary" size="medium" aria-label="add"><AddIcon /></Fab></Link>
      </Box>
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
        }}
      >
        <DataGrid
          rows={phone}
          columns={columnas}
          components={{ Toolbar: GridToolbar }}
          rowsPerPageOptions={[5, 7, 20]}
          pageSize={page}
          pagination
        />
      </Box>
      <AlertDialog {...{alert, cancel, deleteInfo, dato}} />
    </Box>
  );
};

export default Telefono;

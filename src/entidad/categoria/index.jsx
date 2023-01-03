import { Box, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import { useEffect } from "react";
import Axios from "../../server/axios";
import Actions from "../../components/actions/Actions";
import AlertDialog from "../../components/alert/AlertDialog";
import Alerts from "../../components/alert/alert";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNjg2NjA5LCJleHAiOjE2NzI3MTU0MDl9.MRy3cg4qqJxdQzlwHaWol750lq0WoGFhEKiqMaDasxU';
const sql = new Axios(token);
const url = process.env.REACT_APP_CATEGORIA;
const Categoria = () => {
  const [categoria, setcategoria] = useState([]);
  const [errorCarga, setErrorCar] = useState(false);
  const [alert, setAlert] = useState(false);
  const [page, setPage] = useState(5);
  const [dato, setDato] = useState({
    id: 1,
    categoria: 'no encontrado'
  });
  const [onedit, setOnedit] = useState(false);
  /* funciones para el componente de acciones */
  const edit = (data) => {
    console.log(data);
    //console.log(JSON.stringify(data.row));
  }
  const deleted = (data) => {
    setAlert(true);
    setDato(data.row);
  }
  /* funciones para el componente de dialogo de alerta */
  const cancel = () => alert ? setAlert(false) : null;
  const deleteInfo = async (id) => {
    if (id) {
      console.log(id);
      const resul = await sql.Delete(url, id)
      if (resul.status === 200) {
        setcategoria((prevRows)=>prevRows.filter((row)=>row.id !== id));
        setAlert(false);
      }
      else{
        setErrorCar(true);
      }
    }
  }

  /* funciones relacionados con la tablas */

  /* Reacciones a problemas de carga */
  const cerrar = () => {
    setErrorCar(false)
  };

  const cargar = async () => {
    const datos = await sql.All(url);
    if (datos.status === 200) {
      setcategoria(datos.data);
    } else {
      setErrorCar(true);
    }
  }
  useEffect(() => {    
    cargar();
  }, []);
  const columnas = useMemo(() => [
    {
      field: "id",
      headerName: "ID",
      type: "number",
    },
    {
      field: "categoria",
      headerName: "Categoria",
      type: "string",
      editable: true,
    },
    {
      field: "peso",
      headerName: "Peso de categoria",
      headerAlign: "center",
      align: "center",
      type: "number",
      editable: true,
    },
    {
      field: "createAt",
      headerName: "CreatAt",
      headerAlign: "center",
      align: "right",
      type: "date",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      align: "right",
      width: 200,
      renderCell: (param) => <Actions {...{ param, edit, deleted }} />
    },
  ], []);
  return (
    <Box m="20px">
      <Alerts {...{ errorCarga, cerrar }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Header title="Categorias" subtitle="Registros de todos los Categorias" />
        <Fab href="/rol/nuevo" color='primary' size="medium" aria-label="add">
          <AddIcon />
        </Fab>
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
          rows={categoria}
          columns={columnas}
          components={{ Toolbar: GridToolbar }}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={page}
          pagination
          onPageSizeChange={(newpagesize) => edit(newpagesize)}
        />
      </Box>
      <AlertDialog {...{ alert, cancel, deleteInfo, dato }} />
    </Box>
  );
};

export default Categoria;

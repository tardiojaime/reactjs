import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import { useEffect } from "react";
import Axios from "../../server/axios";
import Actions from "../../components/actions/Actions";
import Alerts from "../../components/alert/alert";
import { Link } from "react-router-dom";
import AlertDialog from "../../components/alert/AlertDialog";


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNzU1MjU2LCJleHAiOjE2NzI3ODQwNTZ9.vkte7CTxmWqrYldgYs9z_4a5Kfi-0yh_EV3uqaSVkNE';
const sql = new Axios(token);
const url = process.env.REACT_APP_ROL;
const Rol = () => {
  /* datos para cargar  */
  const [rols, setrols] = useState([]);
  /* complemento existencia de errores */
  const [errorCarga, setErrorCar] = useState(false);
  /* complementeo de confirmacion de eliminacion */
  const [alert, setAlert] = useState(false);
  /* complemento para la tabla */
  const [page, setPage] = useState(7);
  /* Complemento para eliminar */
  const [dato, setDato] = useState({
    id: 1,
    nombre: 'no encontrado'
  });
  const cambiar = () => setErrorCar(false);
  const deleted = (data) => {
    setAlert(true);
    setDato({id:data.row.id, nombre:data.row.nombre});
  }
    /* funciones para el componente de dialogo de alerta */
    const cancel = () => alert ? setAlert(false) : null;
    const deleteInfo = async (id) => {
      if (id) {
        console.log(id);
        const resul = await sql.Delete(url, id)
        if (resul.status === 200) {
          setrols((prevRows)=>prevRows.filter((row)=>row.id !== id));
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
            setrols(datos.data);
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
      field: "nombre",
      headerName: "Nombre",
      type: "string",
    },
    {
      field: "estado",
      headerName: "Estado",
      headerAlign: "center",
      align: "center",
      type: "boolean",
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
      renderCell: (param) => <Actions {...{param, deleted }} />,
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
      <Header title="Roles" subtitle="Registros de todos los roles" />
      <Link to='/rol/create'><Fab color="primary" size="medium" aria-label="add"><AddIcon /></Fab></Link>            
      </Box>
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          /* "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          }, */
/*           "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          }, */
        }}
      >
        <DataGrid
          rows={rols}
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

export default Rol;

import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import { useEffect } from "react";
import Axios from "../../server/axios";
import AlertDialog from "../../components/alert/AlertDialog";
import Alerts from "../../components/alert/alert";
import { Link } from "react-router-dom";
import MapsCli from "../../components/actions/mapsaction";
import ActionU from "../../components/actions/Actionuser";
const moment = require("moment");
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MTYiLCJlbWFpbCI6InRhcmRpbzcxN0BnbWFpbC5jb20iLCJyb2wiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjcyNzU1MjU2LCJleHAiOjE2NzI3ODQwNTZ9.vkte7CTxmWqrYldgYs9z_4a5Kfi-0yh_EV3uqaSVkNE';
const sql = new Axios(token);
const url = process.env.REACT_APP_CONDUCTOR;

const Conductor = () => {
  const [cliente, setcliente] = useState([]);
  const [errorCarga, setErrorCar] = useState(false);
  const [alert, setAlert] = useState(false);
  const [page, setPage] = useState(7);
  const [dato, setDato] = useState({
    id: 1,
    nombre: 'no encontrado'
  });
  /* funciones para el componente de acciones */

  const cambiar = () => setErrorCar(false);
  const deleted = (data) => {
    setAlert(true);
    setDato({id:data.row.ci, nombre:data.row.nombre + ' '+data.row.apellido });
  }
  /* funciones para el componente de dialogo de alerta */
  const cancel = () => alert ? setAlert(false) : null;
  const deleteInfo = async (id) => {
    if (id) {
      console.log(id);
      const resul = await sql.Delete(url, id)
      if (resul.status === 200) {
        setcliente((prevRows)=>prevRows.filter((row)=>row.ci !== id));
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
          setcliente(datos.data);
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
      field: "ci",
      headerName: "CI",
      type: "string",
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      type:'string',
      align: 'left',
      valueGetter: (params)=>`${params.row.nombre +' ' || ' '}${params.row.apellido || ''} `,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      align: 'left',
    },
    {
      field: 'telefono',
      headerName: 'Telefono',
      type: 'string',
      width: 80,
    },
    {
      field: 'fecha_nacimiento',
      headerName: 'Fecha Nacimiento',
      type: 'date',
      valueGetter: (param)=> moment(param.row.fecha_nacimiento).format('DD-MM-YYYY')
    },
    {
      field: 'anos_experiencia',
      type: 'number',
      headerName: 'Experiencia',
      align: 'right',
      width: 70,
    },
    {
      field: 'tipo_licencia',
      type: 'string',
      headerName: 'Licencia',
      align: 'right',
      width: 70,
    },
    {
      field: 'modelo',
      type: 'string',
      headerName: 'Telefono',
      align: 'right',
      valueGetter: (params)=>`${params.row.modelo +' ' || ' '}${params.row.marcat || ''} `,
    },
    {
      field: 'marca',
      type: 'string',
      headerName: 'Vehiculo',
      align: 'right',
      valueGetter: (params)=>`${params.row.marca +' M-' || ' '}${params.row.modeloV || ''} `,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      align: "right",
      width: 150,
      renderCell: (param) => <ActionU {...{ param, deleted }} />
    },
  ],[]);
  return (
    <Box m="20px">
      {errorCarga && <Alerts tipo='error' cambiar={cambiar}/>}      
      <Box 
      sx={{
        display: 'flex', 
        justifyContent: 'space-between',
      }}
      >
      <Header title="Conductores" subtitle="Registros del personal de entrega" />
      <Link to='/conductor/create'><Fab color="primary" size="medium" aria-label="add"><AddIcon /></Fab></Link>
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
          rows={cliente}
          columns={columnas}
          components={{ Toolbar: GridToolbar }}
          rowsPerPageOptions={[5, 7, 20]}
          pageSize={page}
          getRowId={(row)=>row.ci}
          pagination
        />
      </Box>
      <AlertDialog {...{ alert, cancel, deleteInfo, dato }} />
    </Box>
  );
};

export default Conductor;

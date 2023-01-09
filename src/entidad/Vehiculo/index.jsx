import { Box, colors, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import { useEffect } from "react";
import Axios from "../../server/axios";
import ActionV from "../../components/actions/ActionVehi";
import AlertDialog from "../../components/alert/AlertDialog";
import Alerts from "../../components/alert/alert";
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from "react-router-dom";
import { color } from "@mui/system";
const moment = require("moment");
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MSIsImVtYWlsIjoidGFyZGlvNzE3QGdtYWlsLmNvbSIsInJvbCI6IkNsaWVudGUiLCJpYXQiOjE2NzI4NzgwMDEsImV4cCI6MTY3Mjg3ODEwMX0.4UPB7Etmr0wblbeTreeZFKxF5aNAAjax5YIqov-mZmc';
const sql = new Axios(token);
const url = process.env.REACT_APP_KEY_MOVILIDAD;
const Vehiculo = () => {
  const [vehiculo, setVehiculo] = useState([]);
  const [errorCarga, setErrorCar] = useState(false);
  const [alert, setAlert] = useState(false);
  const [page, setPage] = useState(7);
  const [dato, setDato] = useState({
    id: 1,
    categoria: 'no encontrado'
  });
  /* funciones para el componente de acciones */

  const cambiar = () => setErrorCar(false);
  const deleted = (data) => {
    setAlert(true);
    setDato({id:data.row.num_placa, nombre:data.row.modelo +' ' + data.row.marca});
  }
  /* funciones para el componente de dialogo de alerta */
  const cancel = () => alert ? setAlert(false) : null;
  const deleteInfo = async (id) => {
    if (id) {
      console.log(id);
      const resul = await sql.Delete(url, id)
      if (resul.status === 200) {
        setVehiculo((prevRows)=>prevRows.filter((row)=>row.num_placa !== id));
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
          setVehiculo(datos.data);
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
      field: "num_placa",
      headerName: "Placa",
      type: "string",
    },
    {
      field: "modelo",
      headerName: "Modelo",
      type: "string",
    },
    {
      field: "marca",
      headerName: "Marca",
      headerAlign: "center",
      align: "center",
      type: "string",
    },
    {
      field: "color",
      headerName: "Color",
      headerAlign: "center",
      align: "center",
      type: "string",
      renderCell: (param)=> <Colors {...{param}} />,
    },
    {
      field: "tipo_movilidad",
      headerName: "Tipo",
      headerAlign: "center",
      align: "center",
      type: "string",
    },
    {
      field: "createAt",
      headerName: "CreatAt",
      headerAlign: "center",
      align: "right",
      type: "date",
      width:120,
      valueGetter: (param)=>moment(param.row.createAt).format('DD-MM-YYYY HH:mm')
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      align: "right",
      width: 160,
      renderCell: (param) => <ActionV {...{ param, deleted }} />
    },
  ], []);

  return (
    <Box m="20px">
      {errorCarga && <Alerts tipo='error' cambiar={cambiar}/>}      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Header title="Categorias" subtitle="Registros de todos los Vehiculos" />
        
          <Link to='/vehiculo/create'><Fab color="primary" size="medium" aria-label="add"><AddIcon /></Fab></Link>            
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
          rows={vehiculo}
          columns={columnas}
          components={{ Toolbar: GridToolbar }}
          rowsPerPageOptions={[5, 7, 20]}
          pageSize={page}
          pagination
          getRowId={(row)=>row.num_placa}
        />
      </Box>
      <AlertDialog {...{ alert, cancel, deleteInfo, dato }} />
    </Box>
  );
};

export default Vehiculo;

const Colors = ({param})=>{
  const [colores, setColor] = useState();

  const definecolor= () =>{
    const color = param.row.color;
    console.log(color==='blaco');
    if(color === 'rojo'){
      setColor(colors.red[900]);
    }
    if(color === 'blanco'){
      setColor(colors.blue[50]);
    }
    if(color === 'negro'){
      setColor(colors.grey[900]);
    }
    if(color === 'plateado'){
      setColor(colors.grey[500]);
    }
    if(color === 'otro'){
      setColor(colors.red[50]);
    }
  }
  useEffect(()=>{
    definecolor();
  })

return (
  <Box sx={{bgcolor: colores, width:20, height:20, borderRadius: 100}}>
  </Box>
);
}
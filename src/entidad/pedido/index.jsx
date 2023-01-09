import { Box, colors } from "@mui/material";
import React, { useMemo, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useEffect } from "react";
import Axios from "../../server/axios";
import AlertDialog from "../../components/alert/AlertDialog";
import Alerts from "../../components/alert/alert";
import ActionsP from "../../components/actions/ActioPedi";
const moment = require("moment");
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Ijc1MzQ1MSIsImVtYWlsIjoidGFyZGlvNzE3QGdtYWlsLmNvbSIsInJvbCI6IkNsaWVudGUiLCJpYXQiOjE2NzI4NzgwMDEsImV4cCI6MTY3Mjg3ODEwMX0.4UPB7Etmr0wblbeTreeZFKxF5aNAAjax5YIqov-mZmc';
const sql = new Axios(token);
const url = '/pedido';
const Pedido = () => {
  const [pedidO, setPedido] = useState([]);
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
    setDato({id:data.row.id, nombre:data.row.nombre +' ' + data.row.apellido});
  }
  /* funciones para el componente de dialogo de alerta */
  const cancel = () => alert ? setAlert(false) : null;
  const deleteInfo = async (id) => {
    if (id) {
      console.log(id);
      const resul = await sql.Delete(url, id)
      if (resul.status === 200) {
        setPedido((prevRows)=>prevRows.filter((row)=>row.num_placa !== id));
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
          setPedido(datos.data);
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
      headerName: "Cliente",
      type: "string",
      width: 140,
      valueGetter: (params)=>`${params.row.nombre +' ' || ' '}${params.row.apellido || ''} `,
    },
    {
      field: "fecha_pedido",
      headerName: "Fecha Pedido",
      headerAlign: "center",
      align: "center",
      type: "datetime",
      width: 140,
      valueGetter: (param)=>moment(param.row.fecha_pedido).format('DD-MM-YYYY HH:mm')
    },
    {
      field: "fecha_entrega",
      headerName: "Fecha Pedido",
      headerAlign: "center",
      align: "center",
      type: "datetime",
      width: 140,
      valueGetter: (param)=>moment(param.row.fecha_entrega).format('DD-MM-YYYY HH:mm')
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      align: "right",
      width: 160,
      renderCell: (param) => <ActionsP {...{ param, deleted }} />
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
        <Header title="Pedidos" subtitle="Registros de todos los podidos pendientes" />
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
          rows={pedidO}
          columns={columnas}
          components={{ Toolbar: GridToolbar }}
          rowsPerPageOptions={[5, 7, 20]}
          pageSize={page}
          pagination
        />
      </Box>
      <AlertDialog {...{ alert, cancel, deleteInfo, dato }} />
    </Box>
  );
};

export default Pedido;

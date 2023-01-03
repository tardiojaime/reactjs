import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import { useEffect } from "react";
import Axios from '../../server/axios';
const sql = new Axios();
const url = process.env.REACT_APP_CLIENTE;

const Cliente = () => {
  const [cliente, setcliente] = useState([]);
  useEffect(() => {
    const cargar = async () =>{ 
      const datos = await sql.All(url);
      setcliente(datos.data);
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
      field: "usuario",
      headerName: "Usuario",
      headerAlign: "center",
      align: "center",
      type: "string",
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      type:'string',
      align:'center',
      valueGetter: (params)=>`${params.row.nombre +' ' || ' '}${params.row.apellido || ''} `,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      align: 'center',
    },
    {
      field: 'telefono',
      headerName: 'Telefono',
      align: 'center',
    },
    {
      field: 'fecha_nacimiento',
      headerName: 'Fecha Nacimiento',
      align:'center',
      type: 'datetime',
    },
    {
      field: 'calle_numero',
      headerName: 'Direcion',
      align: 'center',
      type: 'string',
    },
    {
      field: 'longitud',
      headerName: 'Longitud',
      type: 'string',
    },
    {
      field: 'latitud',
      headerName: 'Latitud',
      type: 'string',
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
      getActions: (param) => [
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          color="info"
          size="large"
          //onClick={deleteUser(params.id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon color="success" />}
          label="Editar"
          color="info"
          size="large"
        />,
      ],
    },
  ]);
  return (
    <Box m="20px">
      <Box 
      sx={{
        display: 'flex', 
        justifyContent: 'space-between',
      }}
      >
      <Header title="Clientes" subtitle="Registros de todos los Clientes" />
      <Fab href="/rol/nuevo"  aria-label="add">
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
          rows={cliente}
          columns={columnas}
          components={{ Toolbar: GridToolbar }}
          pageSize={5}
        />
      </Box>
    </Box>
  );
};

export default Cliente;

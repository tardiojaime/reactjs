import { Box, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import { useEffect } from "react";
import { todos } from "./service";
const Telefono = () => {
  const [movil, setmovil] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    const cargar = async () =>{ 
      const datos = await todos();
      setmovil(datos.data);
    }
    cargar();
  }, []);
  const columnas = useMemo(() => [
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
      field: 'estado',
      headerName: 'Estado',
      align:'center',
      type: 'boolean',
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
      <Header title="Telefonos" subtitle="Registros de todos los telefonos" />
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
          rows={movil}
          columns={columnas}
          components={{ Toolbar: GridToolbar }}
          pageSize={5}
        />
      </Box>
    </Box>
  );
};

export default Telefono;

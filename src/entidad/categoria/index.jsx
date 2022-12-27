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
import { obtener } from "../../axios";
const Categoria = () => {
  const [categoria, setcategoria] = useState([]);
  useEffect(() => {
    const cargar = async () =>{ 
      const datos = await obtener('http://127.0.0.1:4000/categoria');
      setcategoria(datos.data);
    }
    cargar();
  }, []);
  const columnas = useMemo(() => [
    {
      field: "categoria",
      headerName: "Categoria",
      type: "string",
    },
    {
      field: "peso",
      headerName: "Peso de categoria",
      headerAlign: "center",
      align: "center",
      type: "number",
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
      <Header title="Categorias" subtitle="Registros de todos los Categorias" />
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
          rows={categoria}
          columns={columnas}
          components={{ Toolbar: GridToolbar }}
          pageSize={5}
        />
      </Box>
    </Box>
  );
};

export default Categoria;

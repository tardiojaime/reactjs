import { Box, useTheme, Link } from "@mui/material";
import React, { useMemo, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import { useEffect } from "react";

const Rol = () => {
  const [rols, setrols] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    fetch("http://127.0.0.1:4000/rol")
      .then((res) => res.json())
      .then((result) => {
        setrols(result);
      });
  }, []);
  const columnas = React.useMemo(() => [
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
      <Header title="Roles" subtitle="Registros de todos los roles" />
      <Fab href="/rol/nuevo" sx={{
        color: colors.greenAccent[500],
        size: 'medium'
      }} aria-label="add">

        <AddIcon />
      </Fab>
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
        />
      </Box>
    </Box>
  );
};

export default Rol;

import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
export default function Actions({param, edit, deleted}) {
  const editar = ()=>{
    edit(param);
  }
  const eliminar = ()=>{
    deleted(param);
  }
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="secondary" aria-label="edit" onClick={editar} size='small'>
        <EditIcon />
      </Fab>
      <Fab color="error" aria-label="delete" onClick={eliminar} size='small'>
        <ClearIcon />
      </Fab>
    </Box>
  );
}
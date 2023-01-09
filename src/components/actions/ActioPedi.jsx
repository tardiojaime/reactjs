import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
export default function ActionsP({ param, deleted }) {
  const eliminar = () => {
    deleted(param);
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Link to={`asignar/${param.row.id}`}>
        <Fab color="secondary" aria-label="edit" size="small">
          <FactCheckIcon />
        </Fab>
      </Link>
      <Fab color="error" aria-label="delete" onClick={eliminar} size="small">
        <ClearIcon />
      </Fab>
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
export default function Actions({ param, deleted }) {
  const eliminar = () => {
    deleted(param);
  };
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Link to={`/categoria/edit/${param.id}`}>
        <Fab color="secondary" aria-label="edit" size="small">
          <EditIcon />
        </Fab>
      </Link>
      <Fab color="error" aria-label="delete" onClick={eliminar} size="small">
        <ClearIcon />
      </Fab>
    </Box>
  );
}

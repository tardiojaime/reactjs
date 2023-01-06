import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { Link } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
export default function MapsCli({ param }) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Link to={`u/${param.row.latitud}/${param.row.longitud}/${param.row.usuario}`}>
        <Fab color='success' aria-label="edit" size="small">
          <LocationOnIcon />
        </Fab>
      </Link>
    </Box>
  );
}
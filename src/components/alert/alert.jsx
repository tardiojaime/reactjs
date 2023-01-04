import { Collapse, Alert, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from "react";

export default function Alerts({ tipo, cambiar }) {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    setStatus(true);
    setTimeout(() => { setStatus(false) 
      cambiar();
    }, 3000);
  }, []);
  const cerrar = () => setStatus(false);
  return (
    <Box
      sx={{ width: '100%', position: 'absolute', top: 10, display: 'flex', justifyContent: 'center' }}
    >
      <Collapse in={status}>
        <Alert
          severity={tipo==='error' ? 'error' : 'success'}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={cerrar}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {tipo=== 'error' ? 'Error en la peticion...': ' Solicitud ejecutada correctamente...'}
        </Alert>
      </Collapse>
    </Box>
  );
}


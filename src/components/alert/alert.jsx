import { Collapse, Alert, IconButton, Box} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'

export default function Alerts({errorCarga, cerrar}){
return (
<Box 
sx={{width:'100%', display: 'flex', justifyContent:'center'}}
>
<Collapse in={errorCarga}>
  <Alert 
  severity="error"
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
    Error de conexion con la base de datos.
  </Alert>
</Collapse>
</Box>
);
}
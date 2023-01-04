import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({alert, cancel, deleteInfo, dato}) {
  const eliminar=()=>{deleteInfo(dato.id)};
  return (
    <div>
      <Dialog
        open={alert}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{pr: 15}}>{dato.id ? 'Eliminar el registro: '+dato.id: 'Aliminar registro...'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dato.nombre ? 'Nombre del registro: '+dato.nombre: 'Desea eliminar el registro...'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Cancelar</Button>
          <Button onClick={eliminar}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
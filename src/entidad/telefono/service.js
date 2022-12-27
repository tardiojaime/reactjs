import axios from "axios";
const ruta = 'http://127.0.0.1:4000/movil';
async function todos(){
  const datos = await axios({
    url: ruta, 
    method: 'GET',
  });
  return datos;
}

async function registrar(datos){
  const respo = await axios({
    url: ruta,
    method: 'POST',
    data: datos,
  });
  console.log(respo);
}
export {todos, registrar };
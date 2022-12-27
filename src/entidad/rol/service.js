import axios from "axios";

const url = process.env.ROL;

async function Todos(){
  const response = await axios({
    url: url,
    method: 'GET',
  });
  return response;
}
async function Registrar(datos){
  const reg = await axios({
    url: url,
    method:'POST',
    data: datos,
  });
  return reg;
}
export {Todos, Registrar};
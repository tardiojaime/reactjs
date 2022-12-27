import axios from "axios";

async function obtener(url){
  const datos = await axios({
    url: url,
    method: 'GET'
  });
  return datos;
}

export { obtener };
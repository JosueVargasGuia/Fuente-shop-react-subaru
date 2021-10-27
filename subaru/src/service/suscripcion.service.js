import { fetchService,METHOD } from "../matchService/fetchService";
 
import { IP, URL } from "./IP";
async function realisarSupcripcion(body) {  
   const response = await fetchService(
    IP(URL.SUSCRIPCION),
    body,
    METHOD.POST
  ); 
   return response;
} 
export { realisarSupcripcion };

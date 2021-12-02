import {
    METHOD,
    tokenFetchService,
} from "../matchService/fetchService";
import { IP, URL } from "./IP";

async function obtenerListaCorreo(body) {
    const response = await tokenFetchService(
        IP(URL.OBTENER_CORREO_JOBS),
        body,
        METHOD.POST
    );
    return response;
}
async function registrarCorreoJobs(body) {
    const response = await tokenFetchService(
        IP(URL.REGISTRAR_CORREO_JOBS),
        body,
        METHOD.POST
    );
    return response;
}
export {
    obtenerListaCorreo,
    registrarCorreoJobs
}
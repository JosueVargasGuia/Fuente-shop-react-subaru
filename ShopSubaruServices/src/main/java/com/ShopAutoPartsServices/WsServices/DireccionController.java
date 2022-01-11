package com.ShopAutoPartsServices.WsServices;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController;
import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.Direccion;
import com.ShopAutoPartsServices.Domain.DireccionResponse; 
import com.ShopAutoPartsServices.Enums.SUCCESS_SERVER;
import com.ShopAutoPartsServices.Service.Impl.DireccionServiceImpl;

@RestController
@RequestMapping("service/direccion")
public class DireccionController {
	Logger logger = LoggerFactory.getLogger(DireccionController.class);
	@Autowired
	DireccionServiceImpl direccionServiceImpl;

	@PostMapping(value = "/lstdireccion", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<DireccionResponse> listarDirecciones(@RequestBody ClienteUsuario clienteUsuario) {
		ResponseEntity<DireccionResponse> responseEntity = null;
		DireccionResponse direccionResponse = new DireccionResponse();

		try {
			direccionResponse.setLista(direccionServiceImpl.obtenerDirecciones(clienteUsuario));
			direccionResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK);
			responseEntity = new ResponseEntity<DireccionResponse>(direccionResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			direccionResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR);
			direccionResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<DireccionResponse>(direccionResponse, HttpStatus.BAD_REQUEST);
		}

		return responseEntity;
	}

	@PostMapping(value = "/registro", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Direccion> registrarDireccion(@RequestBody Direccion direccion) {
		ResponseEntity<Direccion> responseEntity = null;
		boolean isValidado = true;
		List<String> error = new ArrayList<String>();
		try {
			if (direccion != null) {

				if (direccion.getVchDireccion() == null || direccion.getVchDireccion().trim().length() <= 3) {
					error.add(" La dirección es  requerido ");
					isValidado = false;
				}
				/*if (direccion.getVchNombre() == null || direccion.getVchNombre().trim().length() < 2) {
					error.add(" Ingrese su nombre ");
					isValidado = false;
				}
				if (direccion.getVchApellido() == null|| direccion.getVchApellido().trim().length() < 2) {
					error.add(" Ingrese los apellidos ");
					isValidado = false;
				}
				if (direccion.getVchTelefono() == null|| direccion.getVchTelefono().trim().length() < 2) {
					error.add(" Ingrese el numero de teléfono ");
					isValidado = false;
				}*/
				if (direccion.getDepartamento() == null|| direccion.getDepartamento().getChrCodigoDepartamento().equalsIgnoreCase("00")) {
					error.add(" Seleccione el Departamento ");
					isValidado = false;
				}
				if (direccion.getProvincia() == null|| direccion.getProvincia().getChrCodigoProvincia().equalsIgnoreCase("00")) {
					error.add(" Seleccione el Provincia ");
					isValidado = false;
				}
				if (direccion.getDistrito() == null|| direccion.getDistrito().getChrCodigoDistrito().equalsIgnoreCase("00")) {
					error.add(" Seleccione el Distrito ");
					isValidado = false;
				}
			} else {
				error.add(" Ingrese los datos del cliente ");
				isValidado = false;
			}
			if (isValidado) {
				//logger.info(direccion.toString());
				direccionServiceImpl.registrarDireccion(direccion);
				direccion.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<Direccion>(direccion, HttpStatus.OK);
			} else {
				direccion.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<Direccion>(direccion, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			direccion.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			direccion.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<Direccion>(direccion, HttpStatus.BAD_REQUEST);
		}

		return responseEntity;
	}
	
	@PostMapping(value = "/delete", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Direccion> eliminarDireccion(@RequestBody Direccion direccion) {
		ResponseEntity<Direccion> responseEntity = null;
		boolean isValidado = true;
		List<String> error = new ArrayList<String>();
		try {
			if (direccion == null) {
				error.add("Ingrese la dirección");
				isValidado=false;
			}	
		 
			if (isValidado) {
				direccionServiceImpl.eliminarDireccion(direccion);
				direccion.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<Direccion>(direccion, HttpStatus.OK);
			} else {
				direccion.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<Direccion>(direccion, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			direccion.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			direccion.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<Direccion>(direccion, HttpStatus.BAD_REQUEST);
		}

		return responseEntity;
	}
}

package com.ShopAutoPartsServices.WsServices;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
 

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.ShopAutoPartsServices.Config.CorreoConfiguracion;
import com.ShopAutoPartsServices.Config.Empresa;
import com.ShopAutoPartsServices.Config.EncriptadorAES;
import com.ShopAutoPartsServices.Domain.Cliente;
import com.ShopAutoPartsServices.Domain.ClienteDireccion;
import com.ShopAutoPartsServices.Domain.ClienteLoginRequest;
import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.CorreoJobsOnline;
import com.ShopAutoPartsServices.Domain.CorreoRequest;
import com.ShopAutoPartsServices.Domain.CorreoResponse;
import com.ShopAutoPartsServices.Domain.Direccion;
import com.ShopAutoPartsServices.Domain.TipoCambio;
import com.ShopAutoPartsServices.Domain.TokenValidate;
import com.ShopAutoPartsServices.Domain.Ubigeo;
import com.ShopAutoPartsServices.Domain.UbigeoResponse;
import com.ShopAutoPartsServices.Domain.UsuarioAdminRequest;
import com.ShopAutoPartsServices.Domain.UsuarioAdminResponse;
import com.ShopAutoPartsServices.Enums.AccountsEmail;
import com.ShopAutoPartsServices.Enums.BuildEmail;
import com.ShopAutoPartsServices.Enums.CRUD;
import com.ShopAutoPartsServices.Enums.SUCCESS_SERVER;
import com.ShopAutoPartsServices.Filter.JWTAuthorizationFilter;
import com.ShopAutoPartsServices.Service.Impl.ClienteServiceImpl;
import com.ShopAutoPartsServices.Service.Impl.DireccionServiceImpl;
import com.ShopAutoPartsServices.ServiceConfiguracion.JwtEnum;
import com.ShopAutoPartsServices.ServiceConfiguracion.JwtService;
import com.ShopAutoPartsServices.Util.BuildEnviaCorreo;

import io.jsonwebtoken.ExpiredJwtException;

@RestController
@RequestMapping("service/authorization/cliente")
public class ClienteAuthorizationController {
	Logger logger = LoggerFactory.getLogger(ClienteAuthorizationController.class);
	@Autowired
	private PasswordEncoder passwordEncoder;
	private JwtService jwtService = new JwtService();
	@Autowired
	ClienteServiceImpl clienteService;

	@Autowired
	DireccionServiceImpl direccionServiceImpl;

	@Autowired
	CorreoConfiguracion correoConfiguracion;

	@Autowired
	Empresa empresa;

	@PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ClienteUsuario> login(@RequestBody ClienteLoginRequest loginRequest) {

		ResponseEntity<ClienteUsuario> responseEntity = null;
		List<String> error = new ArrayList<String>();
		ClienteUsuario clienteUsuario = new ClienteUsuario();
		try {
			ClienteUsuario loadClienteUsuario = clienteService.loginClienteUsuario(loginRequest.getUsername());
			if (loadClienteUsuario.getNumCodigoCliente() >= 1) {
				if (passwordEncoder.matches(loginRequest.getPassword(), loadClienteUsuario.getChrPassword())) {
					clienteUsuario.setCliente(loadClienteUsuario.getCliente());
					clienteUsuario.setNumCodigoCliente(loadClienteUsuario.getNumCodigoCliente());
					clienteUsuario.setNumCodigoClienteUsuario(loadClienteUsuario.getNumCodigoClienteUsuario());
					clienteUsuario.setChrEmail(loginRequest.getUsername());
					clienteUsuario.setToken(jwtService.createToken(clienteUsuario));
					if (loginRequest.getChrRol().getContex().equalsIgnoreCase(JwtEnum.ROLE_ADMIN.getContex())) {
						if (loadClienteUsuario.getChrRol().getContex()
								.equalsIgnoreCase(JwtEnum.ROLE_ADMIN.getContex())) {
							clienteUsuario.setChrRol(loadClienteUsuario.getChrRol());
							clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
							responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
						} else {
							error.add("Acceso denegado a panel de control");
							clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
							responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
						}
					} else {
						clienteUsuario.setChrRol(JwtEnum.ROLE_USER);
						clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
						responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
					}

				} else {
					error.add("Acceso denegado");
					clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
					responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
				}
			} else {
				error.add("Acceso denegado");
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info("1:" + e.getMessage());
			e.printStackTrace();
			clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			clienteUsuario.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/registro", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ClienteUsuario> registrarClienteUsuario(@RequestBody ClienteUsuario clienteUsuario) {
		ResponseEntity<ClienteUsuario> responseEntity = null;
		boolean isValidado = true;
		List<String> error = new ArrayList<String>();
		// logger.info(clienteUsuario.toString());
		try {
			if (clienteUsuario != null) {
				if (clienteUsuario.getChrEmail() == null || clienteUsuario.getChrEmail().equalsIgnoreCase("")) {
					error.add(" El correo es requerido ");
					isValidado = false;
				} else {
					if (clienteUsuario.getCrud() == CRUD.INSERT) {
						if (clienteUsuario.getChrPassword() == null
								|| clienteUsuario.getChrPassword().equalsIgnoreCase("")
								|| clienteUsuario.getChrPassword().trim().length() <= 3) {
							error.add(" Ingrese una contraseña ");
							isValidado = false;
						}
					}
				}

				if (clienteUsuario.getCliente() == null) {
					error.add(" Los datos del cliente son requeridos ");
					isValidado = false;
				} else {
					if (clienteUsuario.getCliente().getVchNombre() == null
							|| clienteUsuario.getCliente().getVchNombre().trim().length() <= 2) {
						error.add(" El nombre del cliente es requerido ");
						isValidado = false;
					}
					if (clienteUsuario.getCliente().getVchApellidoPaterno() == null
							|| clienteUsuario.getCliente().getVchApellidoPaterno().trim().length() <= 2) {
						error.add(" El apellido paterno es requerido ");
						isValidado = false;
					}
					if (clienteUsuario.getCliente().getVchApellidoMaterno() == null
							|| clienteUsuario.getCliente().getVchApellidoMaterno().trim().length() <= 2) {
						error.add(" El apellido materno es requerido ");
						isValidado = false;
					}
					if (clienteUsuario.getCliente().getNumTipoCliente() <= 0) {
						error.add(" El tipo de documento es requerido ");
						isValidado = false;
					}
					if (clienteUsuario.getCliente().getVchDocumento() == null
							|| clienteUsuario.getCliente().getVchDocumento().trim().length() <= 7) {
						error.add(" El numero de documento es requerido ");
						isValidado = false;
					}
//					if (clienteUsuario.getCliente().getVchDireccion() == null
//							|| clienteUsuario.getCliente().getVchDireccion().trim().length() <= 5) {
//						error.add(" La dirección es  requerido ");
//						isValidado = false;
//					}
				}
			} else {
				error.add("Ingrese los datos del cliente");
				isValidado = false;
			}
			if (isValidado) {
				if (clienteUsuario.getChrPassword() != null && clienteUsuario.getChrPassword().length() >= 4) {
					clienteUsuario.setChrPassword(passwordEncoder.encode(clienteUsuario.getChrPassword()));
				} else {
					clienteUsuario.setChrPassword("");
				}
				clienteUsuario.setFlgDireccionDefault(false);
				if (clienteUsuario.getListaDireccion().size() == 0) {
					clienteUsuario.setFlgDireccionDefault(true);
				}
				if (clienteUsuario.getCrud() == CRUD.INSERT && clienteUsuario.getFlgActualizaRol() == 0) {
					clienteUsuario.setChrRol(JwtEnum.ROLE_USER);
				}
				ClienteUsuario clienteUsuarioReturn = clienteService.registrarClienteUsuario(clienteUsuario);
				clienteUsuario.setChrPassword("");
				if (clienteUsuario.getCrud() == CRUD.INSERT) {
					List<CorreoJobsOnline> lista = new ArrayList<CorreoJobsOnline>();
					lista.add(new CorreoJobsOnline(clienteUsuario.getChrEmail()));
					CorreoRequest correoRequest = new CorreoRequest();
					correoRequest.setBuildEmail(BuildEmail.EmailConfirmacion)
							// .setCorreoCliente(clienteUsuario.getChrEmail());
							.setListaCorreo(lista);
					correoRequest.setClienteUsuario(new ClienteUsuario()).getClienteUsuario().setCliente(new Cliente());
					correoRequest.getClienteUsuario().getCliente()
							.setVchNombreCompleto(clienteUsuario.getCliente().getVchApellidoPaterno() + " "
									+ clienteUsuario.getCliente().getVchApellidoMaterno() + ","
									+ clienteUsuario.getCliente().getVchNombre());
					envioCorreo(correoRequest);
				}
				for (Direccion direccion : clienteUsuario.getListaDireccion()) {
					direccion.setClienteDireccion(new ClienteDireccion());
					direccion.getClienteDireccion()
							.setNumCodigoCliente(clienteUsuarioReturn.getCliente().getNumCodigoCliente());

					if (direccion.getCrud() == CRUD.DELETE) {
						direccionServiceImpl.eliminarDireccion(direccion);
					}
					if (direccion.getCrud() == CRUD.UPDATE || direccion.getCrud() == CRUD.INSERT) {
						direccionServiceImpl.registrarDireccion(direccion);
					}
				}

				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			} else {
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			clienteUsuario.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.BAD_REQUEST);
		}

		return responseEntity;

	}

	@PostMapping(value = "/quitarUsuarioAdmin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ClienteUsuario> quitarUsuarioAdmin(@RequestBody ClienteUsuario clienteUsuario) {
		ResponseEntity<ClienteUsuario> responseEntity = null;

		List<String> error = new ArrayList<String>();
		// logger.info(clienteUsuario.toString());
		try {

			if (clienteUsuario.getNumCodigoCliente() >= 1 && clienteUsuario.getNumCodigoClienteUsuario() >= 1) {
				direccionServiceImpl.quitarUsuarioAdmin(clienteUsuario);
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			} else {
				error.add("Ingrese el codigo de cliente y el numero de usuario");
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			clienteUsuario.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.BAD_REQUEST);
		}

		return responseEntity;

	}

	@PostMapping(value = "/ubigeo", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UbigeoResponse> listaUbigeo(@RequestBody Ubigeo ubigeo) {
		ResponseEntity<UbigeoResponse> responseEntity = null;
		UbigeoResponse ubigeoResponse = new UbigeoResponse();
		try {
			ubigeoResponse.setListaUbigeo(clienteService.listaUbigeo(ubigeo));
			ubigeoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK);
			responseEntity = new ResponseEntity<UbigeoResponse>(ubigeoResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			ubigeoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR);
			ubigeoResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<UbigeoResponse>(ubigeoResponse, HttpStatus.BAD_REQUEST);
		}

		return responseEntity;
	}

	@PostMapping(value = "/obtenerUsuario", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ClienteUsuario> obtenerCliente(@RequestBody ClienteUsuario clienteRequest) {
		ResponseEntity<ClienteUsuario> responseEntity = null;
		ClienteUsuario clienteUsuario = new ClienteUsuario();
		List<String> error = new ArrayList<String>();
		try {
			clienteUsuario = clienteService.obtenerCliente(clienteRequest);
			if (clienteUsuario.getNumCodigoCliente() >= 1) {
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			} else {
				error.add("Registro no encontrado");
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR);
			clienteUsuario.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/obtLstUsuarioAdmin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UsuarioAdminResponse> obtenerListaUsuarioAdministrador(
			@RequestBody UsuarioAdminRequest usuarioAdminRequest) {
		ResponseEntity<UsuarioAdminResponse> responseEntity = null;
		UsuarioAdminResponse usuarioAdminResponse = new UsuarioAdminResponse();
		List<String> error = new ArrayList<String>();
		try {
			usuarioAdminResponse.setLista(clienteService.listaUsuarioAdministradores(usuarioAdminRequest));
			usuarioAdminResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<UsuarioAdminResponse>(usuarioAdminResponse, HttpStatus.OK);

		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			usuarioAdminResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR);
			usuarioAdminResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<UsuarioAdminResponse>(usuarioAdminResponse, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/peticionCambioPassword", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ClienteUsuario> recuperarPassword(@RequestBody ClienteUsuario clienteRequest) {
		ResponseEntity<ClienteUsuario> responseEntity = null;
		ClienteUsuario clienteUsuario = new ClienteUsuario();
		List<String> error = new ArrayList<String>();
		try {
			clienteUsuario = clienteService.obtenerClienteByCorreo(clienteRequest);
			if (clienteUsuario.getNumCodigoCliente() >= 1) {
				error.add("Si esta dirección de correo electrónico se ha registrado en nuestra tienda, "
						+ "recibirá un enlace para restablecer su contraseña en " + clienteRequest.getChrEmail() + ".");
				clienteUsuario.setTokenExpire(new Date(System.currentTimeMillis() + (3600000 * empresa.getExpire())));

				/* Encriptacion de la fecha de expiracion */
				EncriptadorAES encriptador = new EncriptadorAES();
				String encriptado = encriptador.encriptar(clienteUsuario.getTokenExpire().getTime() + "",
						empresa.getSecret());
				/* Se Almacena las variables en un formato json */
				String formatoJson = "{" + "\"numCodigoCliente\":\"" + clienteUsuario.getNumCodigoCliente() + "\","
						+ "\"numCodigoClienteUsuario\":\"" + clienteUsuario.getNumCodigoClienteUsuario() + "\","
						+ "\"tokenExpire\":\"" + encriptado + "\"}";

				/* Se codifica en Base64 */
				CorreoRequest correoRequest = new CorreoRequest();
				correoRequest.setTokenCliente(empresa.getWeburl() + "cambiarContraseña?token="
						+ Base64.getEncoder().encodeToString(formatoJson.getBytes()));

				correoRequest.setBuildEmail(BuildEmail.EmailPeticionCambioContraseña);
				correoRequest.setClienteUsuario(new ClienteUsuario()).getClienteUsuario().setCliente(new Cliente());
				correoRequest.getClienteUsuario().getCliente()
						.setVchNombreCompleto(clienteUsuario.getCliente().getVchApellidoPaterno() + " "
								+ clienteUsuario.getCliente().getVchApellidoMaterno() + ","
								+ clienteUsuario.getCliente().getVchNombre());
				List<CorreoJobsOnline> lista = new ArrayList<CorreoJobsOnline>();
				lista.add(new CorreoJobsOnline(clienteUsuario.getChrEmail()));
				correoRequest.setListaCorreo(lista);
				// correoRequest.setCorreoCliente(clienteUsuario.getChrEmail());

				envioCorreo(correoRequest);
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			} else {
				error.add("El correo no se encuentra registrado.");
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR);
			clienteUsuario.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/datosPeticionCambioPassword", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ClienteUsuario> datosPeticionCambioPassword(@RequestBody ClienteUsuario clienteRequest) {
		ResponseEntity<ClienteUsuario> responseEntity = null;
		ClienteUsuario clienteUsuario = new ClienteUsuario();
		List<String> error = new ArrayList<String>();
		boolean valida = true;
		try {
			EncriptadorAES encriptador = new EncriptadorAES();
			String desencriptar = "";
			try {
				JacksonJsonParser jacksonJsonParser = new JacksonJsonParser();
				/* Se recupera el toke y se Decodica en base64 */
				HashMap<String, Object> map = (HashMap<String, Object>) jacksonJsonParser
						.parseMap(new String(Base64.getDecoder().decode(clienteRequest.getToken())));

				ClienteUsuario clienteUsuarioBluid = new ClienteUsuario();
				clienteUsuarioBluid.setNumCodigoCliente(Integer.parseInt(map.get("numCodigoCliente").toString()));
				clienteUsuarioBluid
						.setNumCodigoClienteUsuario(Integer.parseInt(map.get("numCodigoClienteUsuario").toString()));
				/* Desencriptamos fecha de expiracion para comparar la valides del token */
				desencriptar = encriptador.desencriptar(map.get("tokenExpire").toString(), empresa.getSecret());

				clienteUsuarioBluid.setTokenExpire(new Date(Long.parseLong(desencriptar)));

				if (clienteUsuarioBluid.getTokenExpire().getTime() <= System.currentTimeMillis()) {
					error.add("La solicitud de cambio de contraseña ha caducado. Debe solicitar una nueva.");
					valida = false;
				} else {
					clienteRequest.setNumCodigoCliente(clienteUsuarioBluid.getNumCodigoCliente());
				}

			} catch (Exception e) {
				e.printStackTrace();
				error.add("El token no es válido para la operación.");
				valida = false;
			}

			if (valida) {
				clienteUsuario = clienteService.obtenerCliente(clienteRequest);
				if (clienteUsuario.getNumCodigoCliente() >= 1) {
					clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
					responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
				} else {
					error.add("El correo no se encuentra registrado.");
					clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
					responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
				}
			} else {
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR);
			clienteUsuario.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/actualizarPassword", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ClienteUsuario> actualizarPassword(@RequestBody ClienteUsuario clienteRequest) {
		ResponseEntity<ClienteUsuario> responseEntity = null;
		ClienteUsuario clienteUsuario = new ClienteUsuario();
		List<String> error = new ArrayList<String>();
		boolean valida = true;
		try {
			EncriptadorAES encriptador = new EncriptadorAES();
			String desencriptar = "";
			try {
				JacksonJsonParser jacksonJsonParser = new JacksonJsonParser();
				/* Se recupera el toke y se Decodica en base64 */
				HashMap<String, Object> map = (HashMap<String, Object>) jacksonJsonParser
						.parseMap(new String(Base64.getDecoder().decode(clienteRequest.getToken())));
				clienteUsuario.setChrEmail(clienteRequest.getChrEmail());
				clienteUsuario.setNumCodigoCliente(Integer.parseInt(map.get("numCodigoCliente").toString()));
				clienteUsuario
						.setNumCodigoClienteUsuario(Integer.parseInt(map.get("numCodigoClienteUsuario").toString()));
				/* Desencriptamos fecha de expiracion para comparar la valides del token */
				desencriptar = encriptador.desencriptar(map.get("tokenExpire").toString(), empresa.getSecret());

				clienteUsuario.setTokenExpire(new Date(Long.parseLong(desencriptar)));

				if (clienteUsuario.getTokenExpire().getTime() <= System.currentTimeMillis()) {
					error.add("La solicitud de cambio de contraseña ha caducado. Debe solicitar una nueva.");
					valida = false;
				}
				if (clienteRequest.getChrPassword() == null || clienteRequest.getChrPassword().equalsIgnoreCase("")
						|| clienteRequest.getChrPassword().trim().length() <= 3) {
					error.add("Por favor, introduce tu nueva contraseña.");
					valida = false;
				}
				if (clienteRequest.getChrPasswordCopia() == null
						|| clienteRequest.getChrPasswordCopia().equalsIgnoreCase("")
						|| clienteRequest.getChrPasswordCopia().trim().length() <= 3) {
					error.add(
							"El campo de confirmación está vacío: por favor, rellena también el campo de confirmación de contraseña.");
					valida = false;
				}
				if (valida) {
					if (!clienteRequest.getChrPassword().equalsIgnoreCase(clienteRequest.getChrPasswordCopia())) {
						error.add("La contraseña y su confirmación no coinciden.");
						valida = false;
					}
				}

			} catch (Exception e) {
				e.printStackTrace();
				error.add("El token no es válido para la operación.");
				valida = false;
			}

			if (valida) {
				clienteUsuario.setChrPassword(clienteRequest.getChrPassword());
				// logger.info(clienteUsuario.toString());
				clienteUsuario.setChrPassword(passwordEncoder.encode(clienteRequest.getChrPassword()));
				clienteService.actualizarPassword(clienteUsuario);
				clienteUsuario.setToken(null);
				clienteUsuario.setChrPassword(null);
				error.add(
						"Su contraseña ha sido restablecida correctamente y una confirmación ha sido enviada a su dirección de correo electrónico: "
								+ clienteUsuario.getChrEmail());
				/* Enviando el correo de confirmacion de cambio de contraseña */
				CorreoRequest correoRequest = new CorreoRequest();
				correoRequest.setBuildEmail(BuildEmail.EmailConfirmacionCambioContraseña);
				ClienteUsuario clienteUsuarioTmp = clienteService.obtenerCliente(clienteUsuario);
				correoRequest.setClienteUsuario(clienteUsuarioTmp);

				List<CorreoJobsOnline> lista = new ArrayList<CorreoJobsOnline>();
				lista.add(new CorreoJobsOnline(clienteUsuario.getChrEmail()));
				correoRequest.setListaCorreo(lista);
				// correoRequest.setCorreoCliente(clienteUsuarioTmp.getChrEmail());

				envioCorreo(correoRequest);
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);

			} else {
				clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			clienteUsuario.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR);
			clienteUsuario.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ClienteUsuario>(clienteUsuario, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	// @PostMapping(value = "/sendCorreo", consumes =
	// MediaType.APPLICATION_JSON_VALUE, produces =
	// MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CorreoResponse> envioCorreo(@RequestBody CorreoRequest correoRequest) {

		// logger.info("sendCorreo:" + empresa.toString());
		ResponseEntity<CorreoResponse> responseEntity = null;
		CorreoResponse correoResponse = new CorreoResponse();
		List<String> error = new ArrayList<String>();
		try {
			String html = "Sin Contenido";
			String subject = "subject";
			if (correoRequest.getBuildEmail() == BuildEmail.EmailConfirmacion) {

				html = HTML_CONFIRMACION_CLIENTE(correoRequest.getClienteUsuario().getCliente().getVchNombreCompleto(),
						// correoRequest.getCorreoCliente());
						correoRequest.getListaCorreo().get(0).getVchCorreo());
				subject = "[" + empresa.getAlias() + "]" + " ¡Bienvenido!";
			}
			if (correoRequest.getBuildEmail() == BuildEmail.EmailPeticionCambioContraseña) {
				html = HTML_PETICION_CAMBIO_CONTRASEÑA(
						correoRequest.getClienteUsuario().getCliente().getVchNombreCompleto(),
						correoRequest.getTokenCliente());
				subject = "[" + empresa.getAlias() + "]" + "Confirmación de contraseña";
			}
			if (correoRequest.getBuildEmail() == BuildEmail.EmailConfirmacionCambioContraseña) {
				html = HTML_CONFIRMACION_CAMBIO_CONTRASEÑA(
						correoRequest.getClienteUsuario().getCliente().getVchNombreCompleto());
				subject = "[" + empresa.getAlias() + "]" + "Su nueva contraseña";
			}
			BuildEnviaCorreo buildEnviaCorreo = new BuildEnviaCorreo(correoConfiguracion);
			if (buildEnviaCorreo.buildCorreoSSL(correoRequest, html, subject, AccountsEmail.ServicioAlCliente, null)) {
				correoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK);
				responseEntity = new ResponseEntity<CorreoResponse>(correoResponse, HttpStatus.OK);
			} else {
				correoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<CorreoResponse>(correoResponse, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			correoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR);
			correoResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<CorreoResponse>(correoResponse, HttpStatus.BAD_REQUEST);
		}

		return responseEntity;
	}

	@PostMapping(value = "/tipoCambio", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TipoCambio> tipoCambio(@RequestBody TipoCambio tipoCambioRequest) {

		// logger.info("tipoCambio:" + empresa.toString());
		ResponseEntity<TipoCambio> responseEntity = null;
		TipoCambio tipoCambio = new TipoCambio();

		try {
			tipoCambio = clienteService.obtenerTipoCambio();
			tipoCambio.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK);
			responseEntity = new ResponseEntity<TipoCambio>(tipoCambio, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			tipoCambio.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR);
			tipoCambio.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<TipoCambio>(tipoCambio, HttpStatus.BAD_REQUEST);
		}

		return responseEntity;
	}

	@PostMapping(value = "/validateToken", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TokenValidate> tipoCambio(@RequestBody TokenValidate tokenValidate) {
		// logger.info("tipoCambio:" + empresa.toString());
		ResponseEntity<TokenValidate> responseEntity = null;
		TokenValidate tokenValidateResponse = new TokenValidate();
		try {
			if (tokenValidate.getToken() == null || tokenValidate.getToken().isEmpty() == true) {				
				tokenValidateResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_EXPIRE);
				tokenValidateResponse.getResponse().getError().add("Token null");
				responseEntity = new ResponseEntity<TokenValidate>(tokenValidateResponse, HttpStatus.OK);
			} else {
				JWTAuthorizationFilter.validateToken(tokenValidate.getToken());
				tokenValidateResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK);
				responseEntity = new ResponseEntity<TokenValidate>(tokenValidateResponse, HttpStatus.OK);
			}
		} catch (ExpiredJwtException e) {
			logger.info("ExpiredJwtException:" + e.getMessage());
			tokenValidateResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_EXPIRE);
			tokenValidateResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<TokenValidate>(tokenValidateResponse, HttpStatus.OK);
		} catch (IllegalArgumentException e) {
			logger.info("IllegalArgumentException:" + e.getMessage());
			tokenValidateResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_EXPIRE);
			tokenValidateResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<TokenValidate>(tokenValidateResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info("Exception:" + e.getMessage());
			e.printStackTrace();
			tokenValidateResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_EXPIRE);
			tokenValidateResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<TokenValidate>(tokenValidateResponse, HttpStatus.OK);
		}

		return responseEntity;
	}

	/*
	 * private boolean buildCorreoSSL(CorreoRequest correoRequest, String html,
	 * String subject) { boolean envio = false; Properties props = new Properties();
	 * props.put("mail.smtp.host", correoConfiguracion.getHost());
	 * props.put("mail.smtp.socketFactory.port",
	 * correoConfiguracion.getSocketFactoryPort());
	 * props.put("mail.smtp.socketFactory.class",
	 * correoConfiguracion.getSocketFactoryClass()); props.put("mail.smtp.auth",
	 * correoConfiguracion.getAuthSSL()); props.put("mail.smtp.port",
	 * correoConfiguracion.getPortSSL()); Session session =
	 * Session.getDefaultInstance(props, new javax.mail.Authenticator() { protected
	 * PasswordAuthentication getPasswordAuthentication() { return new
	 * PasswordAuthentication(correoConfiguracion.getUser(),
	 * correoConfiguracion.getClave()); } }); try { BodyPart texto = new
	 * MimeBodyPart(); MimeMultipart multiParte = new MimeMultipart();
	 * texto.setContent(html, "text/html; charset=utf-8");
	 * multiParte.addBodyPart(texto); Message message = new MimeMessage(session);
	 * message.setFrom(new InternetAddress(correoConfiguracion.getUser()));
	 * message.setRecipient(Message.RecipientType.TO, new
	 * InternetAddress(correoRequest.getCorreoCliente()));
	 * message.setSubject(subject); message.setContent(multiParte, "UTF-8");
	 * Transport.send(message); envio = true; logger.info("Correo enviado a:" +
	 * correoRequest.getCorreoCliente()); } catch (Exception e) { envio = false;
	 * logger.info(e.getMessage()); e.printStackTrace();
	 * 
	 * } return envio; }
	 */
	public String HTML_CONFIRMACION_CLIENTE(String nombrecompleto, String correo) {
		return "<!DOCTYPE html>\r\n" + "<html lang='en'>\r\n" + "\r\n" + "<body style='background: #a29e9e;'>\r\n"
				+ "    <div style='background:#fbfbfb; width: 500px; min-width: 500px;\r\n"
				+ "				    margin: auto;margin-top: 2em;   \r\n"
				+ "				    font-family: sans-serif,monospace,arial; \r\n"
				+ "				    font-size:  1em; color:#000;\r\n"
				+ "				    border:solid 1px #fbfbfb'>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: normal;text-align: center;height: 25px;'>\r\n"
				+ "\r\n" + "        </div>\r\n"
				+ "        <div style='width: 250px;height: auto;padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;'>\r\n"
				+ "            <a href='" + empresa.getWeburl() + "'>\r\n" + "                <img src='"
				+ empresa.getLogourl() + "' alt='" + empresa.getAlias()
				+ "' style='width: 250px;height: auto;'></img>\r\n" + "            </a>\r\n" + "        </div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight:  bold;  '>Hola "
				+ nombrecompleto + ",</div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;'>Gracias por crear una cuenta de cliente en "
				+ empresa.getAlias() + ". </div>\r\n"
				+ "        <div style=' padding: 0px;height: 2px;background: #a29e9e;'></div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: bold'>\r\n"
				+ "            Sus datos de inicio de sesión en " + empresa.getAlias() + " </div>\r\n"
				+ "        <div style='margin-left: 1.5em;margin-right: 1.5em;padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;border: solid 1px #a29e9e;'>\r\n"
				+ "            Estos son sus datos de acceso:\r\n" + "            <br></br>\r\n"
				+ "            <span style='font-weight: bold;'>Dirección de correo electrónico:</span> <span style='color:#25B9D7;font-weight: bold;'>"
				+ correo + "</span>\r\n" + "        </div>\r\n" + "        <br></br>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: bold;'>Consejos Importantes de Seguridad: </div>\r\n"
				+ "        <div style='margin-left: 1.5em;margin-right: 1.5em;padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;border: solid 1px #a29e9e;'>\r\n"
				+ "            <ul style=' list-style: decimal;font-weight:bold; '>\r\n" + "                <li>\r\n"
				+ "                    <p style='font-weight: normal;'>Mantenga los datos de su cuenta en un lugar seguro.</p>\r\n"
				+ "                </li>\r\n" + "                <li>\r\n"
				+ "                    <p style='font-weight: normal;'>No comparta sus datos de acceso con otras personas.</p>\r\n"
				+ "                </li>\r\n" + "                <li>\r\n"
				+ "                    <p style='font-weight: normal;'>Cambie su contraseña regularmente.</p>\r\n"
				+ "                </li>\r\n" + "                <li>\r\n"
				+ "                    <p style='font-weight: normal;'>Si sospecha que alguien está utilizando ilegalmente su cuenta, avísenos inmediatamente.</p>\r\n"
				+ "                </li>\r\n" + "            </ul>\r\n" + "        </div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: normal;text-align: center;'>\r\n"
				+ "            Ahora puede realizar pedidos en nuestra tienda:\r\n" + "        </div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: bold;text-align: center;color:#25B9D7'>\r\n"
				+ "            <a href='" + empresa.getWeburl() + "' style='color: #25B9D7;'>" + empresa.getAlias()
				+ "</a>\r\n" + "        </div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: normal;text-align: center;height: 35px;'>\r\n"
				+ "        </div>\r\n" + "    </div>\r\n" + "</body>\r\n" + "\r\n" + "</html>";
	}

	public String HTML_PETICION_CAMBIO_CONTRASEÑA(String nombrecompleto, String tokenUrl) {
		return "<!DOCTYPE html>\r\n" + "<html lang='en'>\r\n" + "\r\n" + "<body style='background: #a29e9e;'>\r\n"
				+ "    <div style='background:#fbfbfb;width: 500px; min-width: 500px;\r\n"
				+ "    margin: auto;margin-top: 2em;   \r\n" + "    font-family: sans-serif,monospace,arial; \r\n"
				+ "    font-size:  1em; color:#000;\r\n" + "    border:solid 1px #fbfbfb'>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: normal;text-align: center;height: 25px;'>\r\n"
				+ "\r\n" + "        </div>\r\n"
				+ "        <div style='width: 250px;height: auto;padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;'>\r\n"
				+ "            <a href='" + empresa.getWeburl() + "'>\r\n" + "                <img src='"
				+ empresa.getLogourl() + "' alt='" + empresa.getAlias()
				+ "' style='width: 250px;height: auto;'></img>\r\n" + "            </a>\r\n" + "        </div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight:  bold;  '>Hola "
				+ nombrecompleto + ",</div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;'>Confirmación de la solicitud de contraseña en "
				+ empresa.getAlias() + " </div>\r\n" + "\r\n"
				+ "        <div style='margin-left: 1.5em;margin-right: 1.5em;padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;border: solid 1px #a29e9e;text-align: justify;'>\r\n"
				+ "            Ha solicitado restablecer sus datos de inicio de sesión en " + empresa.getAlias()
				+ ". Tenga en cuenta que esta acción cambiará su contraseña actual. Para confirmar esta acción, por favor utilice el siguiente enlace:\r\n"
				+ "             <br/> <a href='" + tokenUrl + "' style='color: #25B9D7; word-wrap: break-word;'>"
				+ tokenUrl + "</a>\r\n" + "        </div>\r\n" + "        <br></br>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: bold;'>Si usted no hizo esta solicitud, simplemente ignore este correo electrónico.</div>\r\n"
				+ "\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: bold;text-align: center;color:#25B9D7'>\r\n"
				+ "            <a href='" + empresa.getWeburl() + "' style='color: #25B9D7;'>" + empresa.getAlias()
				+ "</a>\r\n" + "        </div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: normal;text-align: center;height: 35px;'>\r\n"
				+ "\r\n" + "        </div>\r\n" + "    </div>\r\n" + "</body>\r\n" + "\r\n" + "</html>";
	}

	public String HTML_CONFIRMACION_CAMBIO_CONTRASEÑA(String nombrecompleto) {
		return "<!DOCTYPE html>\r\n" + "<html lang='en'>\r\n" + "\r\n" + "<body style='background: #a29e9e;'>\r\n"
				+ "    <div style='background:#fbfbfb;width: 500px; min-width: 500px;\r\n"
				+ "    margin: auto;margin-top: 2em;   \r\n" + "    font-family: sans-serif,monospace,arial; \r\n"
				+ "    font-size:  1em; color:#000;\r\n" + "    border:solid 1px #fbfbfb'>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: normal;text-align: center;height: 25px;'>\r\n"
				+ "\r\n" + "        </div>\r\n"
				+ "        <div style='width: 250px;height: auto;padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;'>\r\n"
				+ "            <a href='" + empresa.getWeburl() + "'>\r\n" + "                <img src='"
				+ empresa.getLogourl() + "' alt='" + empresa.getAlias()
				+ "' style='width: 250px;height: auto;'></img>\r\n" + "            </a>\r\n" + "        </div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight:  bold;  '>Hola "
				+ nombrecompleto + "</div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: normal;text-align: center;'>\r\n"
				+ "            Su contraseña ha sido actualizada correctamente.\r\n" + "        </div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: bold;text-align: center;color:#25B9D7'>\r\n"
				+ "            <a href='" + empresa.getWeburl() + "' style='color: #25B9D7;'>" + empresa.getAlias()
				+ "</a>\r\n" + "        </div>\r\n"
				+ "        <div style='padding: 0.5em; padding-left: 2.5em; padding-right: 2.5em ;font-weight: normal;text-align: center;height: 35px; '>\r\n"
				+ "\r\n" + "        </div>\r\n" + "    </div>\r\n" + "</body>\r\n" + "\r\n" + "</html>";
	};

}

package com.ShopAutoPartsServices.Repository.Impl;

import java.math.RoundingMode;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import oracle.jdbc.OracleType;
import oracle.jdbc.OracleTypes;
 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.stereotype.Repository;

import com.ShopAutoPartsServices.Domain.Cliente;
//import org.springframework.jdbc.core.JdbcTemplate;
import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.Suscripcion;
import com.ShopAutoPartsServices.Domain.TipoCambio;
import com.ShopAutoPartsServices.Domain.Ubigeo;
import com.ShopAutoPartsServices.Domain.UsuarioAdminRequest;
import com.ShopAutoPartsServices.Repository.ClienteServiceRepository;
import com.ShopAutoPartsServices.ServiceConfiguracion.JwtEnum;

@Repository
public class ClienteServiceRepositoryImpl implements ClienteServiceRepository {
	final private String PKG_TIENDA = "PKG_TIENDA";
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public ClienteUsuario loginClienteUsuario(String username) throws Exception {
		ClienteUsuario clienteUsuario = new ClienteUsuario();

		CallableStatementCallback<ClienteUsuario> callback = null;
		try {
			callback = new CallableStatementCallback<ClienteUsuario>() {
				@Override
				public ClienteUsuario doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, username);
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						clienteUsuario.setChrEmail(username);
						clienteUsuario.setChrPassword(rs.getString("CHRPASSWORD"));
						clienteUsuario.setNumCodigoCliente(rs.getInt("NUMCODIGOCLIENTE"));
						clienteUsuario.setNumCodigoClienteUsuario(rs.getInt("NUMCODIGOCLIENTEUSUARIO"));
						clienteUsuario.setCliente(new Cliente()).getCliente()
								.setVchApellidoPaterno(rs.getString("VCHAPELLIDOPATERNO"))
								.setVchApellidoMaterno(rs.getString("VCHAPELLIDOMATERNO"))
								.setVchNombre(rs.getString("VCHNOMBRE"))
								.setNumCodigoCliente(rs.getInt("NUMCODIGOCLIENTE"))
								.setNumTipoCliente(rs.getInt("NUMTIPOCLIENTE"))
								.setVchDocumento(rs.getString("VCHDOCUMENTO"))
								.setVchNombreCompleto(rs.getString("VCHNOMBRECOMPLETO"));
						clienteUsuario.setChrRol(JwtEnum.valueOf(rs.getString("CHRROL")));
					}
					return clienteUsuario;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".LOGIN_CLIENTE(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ClienteUsuario registrarClienteUsuario(ClienteUsuario clienteUsuario) throws Exception {
		CallableStatementCallback<ClienteUsuario> callback = null;
		try {
			callback = new CallableStatementCallback<ClienteUsuario>() {
				@Override
				public ClienteUsuario doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setString(1, clienteUsuario.getCliente().getVchNombre());
					cs.setString(2, clienteUsuario.getCliente().getVchApellidoPaterno());
					cs.setString(3, clienteUsuario.getCliente().getVchApellidoMaterno());
					cs.setString(4, clienteUsuario.getCliente().getVchNombreCompleto());
					cs.setInt(5, clienteUsuario.getCliente().getNumTipoCliente());
					cs.setString(6, clienteUsuario.getCliente().getVchDocumento());
					cs.setString(7, clienteUsuario.getCliente().getVchDireccion());
					cs.setString(8, clienteUsuario.getChrEmail());
					cs.setString(9, clienteUsuario.getChrPassword());
					cs.setString(10, clienteUsuario.getChrTratamiento());
					cs.setString(11, clienteUsuario.getCliente().getUbigeo().getChrCodigoDepartamento());
					cs.setString(12, clienteUsuario.getCliente().getUbigeo().getChrCodigoProvincia());
					cs.setString(13, clienteUsuario.getCliente().getUbigeo().getChrCodigoDistrito());
					cs.setString(14, (clienteUsuario.isFlgOfertas() ? "1" : "0"));
					cs.setString(15, (clienteUsuario.isFlgSuscripcion() ? "1" : "0"));
					cs.setString(16, (clienteUsuario.isFlgDireccionDefault() ? "1" : "0"));
					cs.setString(17, clienteUsuario.getCliente().getVchTelefonoFijo());
					cs.setString(18, clienteUsuario.getCliente().getVchTelefonoMovil());
					cs.setString(19, clienteUsuario.getChrRol().getContex());
					cs.setString(20, clienteUsuario.getFlgActualizaRol()+"");
					cs.registerOutParameter(21, OracleTypes.INTEGER);
					cs.setString(22, clienteUsuario.getCrud().toString());
					cs.registerOutParameter(23, OracleType.NVARCHAR);
					cs.execute();
					clienteUsuario.getCliente().setNumCodigoCliente(cs.getInt(21));
					clienteUsuario.setStatus(cs.getString(23));
					return clienteUsuario;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_CLIENTE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public Suscripcion registrarSuscripcion(Suscripcion suscripcion) throws Exception {
		CallableStatementCallback<Suscripcion> callback = null;
		try {
			callback = new CallableStatementCallback<Suscripcion>() {
				@Override
				public Suscripcion doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setString(1, suscripcion.getVchEmail());
					cs.registerOutParameter(2, OracleTypes.CHAR);
					cs.execute();
					suscripcion.getResponse().setObjectStatus(cs.getString(2));
					return suscripcion;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_SUSCRIPCION(?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<Ubigeo> listaUbigeo(Ubigeo ubigeo) throws Exception {

		CallableStatementCallback<List<Ubigeo>> callback = null;
		try {
			callback = new CallableStatementCallback<List<Ubigeo>>() {
				@Override
				public List<Ubigeo> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<Ubigeo> list = new ArrayList<Ubigeo>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, ubigeo.getChrCodigoDepartamento());
					cs.setString(3, ubigeo.getChrCodigoProvincia());
					cs.setInt(4, ubigeo.getUbigeoTipo().getCodigo());
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						Ubigeo obj = new Ubigeo();
						obj.setChrCodigoDepartamento(rs.getString("CHRCODIGODEPARTAMENTO"))
								.setChrCodigoProvincia(rs.getString("CHRCODIGOPROVINCIA"))
								.setChrCodigoDistrito(rs.getString("CHRCODIGODISTRITO"))
								.setVchDescripcion(rs.getString("VCHDESCRIPCION"))
								.setVchCodigoPostal(rs.getString("VCHCODIGOPOSTAL"));
						list.add(obj);
					}
					return list;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".LISTA_UBIGEO(?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ClienteUsuario obtenerCliente(ClienteUsuario clienteRequest) throws Exception {
		CallableStatementCallback<ClienteUsuario> callback = null;
		try {
			callback = new CallableStatementCallback<ClienteUsuario>() {
				@Override
				public ClienteUsuario doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					ClienteUsuario clienteUsuario = new ClienteUsuario();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, clienteRequest.getNumCodigoCliente());
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						clienteUsuario.setNumCodigoCliente(rs.getInt("NUMCODIGOCLIENTEUSUARIO"))
								.setNumCodigoClienteUsuario(rs.getInt("NUMCODIGOCLIENTE"))
								.setChrEmail(rs.getString("CHREMAIL")).setChrTratamiento(rs.getString("CHRTRATAMIENTO"))
								.setFlgOfertas((rs.getString("FLGOFERTAS").equalsIgnoreCase("1") ? true : false))
								.setFlgSuscripcion(
										(rs.getString("FLGSUSCRIPCION").equalsIgnoreCase("1") ? true : false))
								.setCliente(new Cliente()).getCliente().setVchDocumento(rs.getString("VCHDOCUMENTO"))
								.setVchNombre(rs.getString("VCHNOMBRE"))
								.setVchApellidoPaterno(rs.getString("VCHAPELLIDOPATERNO"))
								.setVchApellidoMaterno(rs.getString("VCHAPELLIDOMATERNO"))
								.setVchNombreCompleto(rs.getNString("VCHNOMBRECOMPLETO"))
								.setNumTipoCliente(rs.getInt("NUMTIPOCLIENTE"))
								.setVchDireccion(rs.getString("VCHDIRECCION"))
								.setVchTelefonoFijo(rs.getString("VCHTELEFONO1"))
								.setVchTelefonoMovil(rs.getString("VCHCELULAR")).setUbigeo(new Ubigeo()).getUbigeo();
						clienteUsuario.setChrRol(JwtEnum.valueOf(rs.getString("CHRROL")));
					}
					return clienteUsuario;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBTENER_CLIENTE(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ClienteUsuario obtenerClienteByCorreo(ClienteUsuario clienteRequest) throws Exception {
		CallableStatementCallback<ClienteUsuario> callback = null;
		try {
			callback = new CallableStatementCallback<ClienteUsuario>() {
				@Override
				public ClienteUsuario doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					ClienteUsuario clienteUsuario = new ClienteUsuario();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, clienteRequest.getChrEmail());
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						clienteUsuario.setNumCodigoCliente(rs.getInt("NUMCODIGOCLIENTE"))
								.setNumCodigoClienteUsuario(rs.getInt("NUMCODIGOCLIENTEUSUARIO"))
								.setChrEmail(rs.getString("CHREMAIL")).setChrTratamiento(rs.getString("CHRTRATAMIENTO"))

								.setCliente(new Cliente()).getCliente().setVchDocumento(rs.getString("VCHDOCUMENTO"))
								.setVchNombre(rs.getString("VCHNOMBRE"))
								.setVchApellidoPaterno(rs.getString("VCHAPELLIDOPATERNO"))
								.setVchApellidoMaterno(rs.getString("VCHAPELLIDOMATERNO"))
								.setVchNombreCompleto(rs.getNString("VCHNOMBRECOMPLETO"))
								.setNumTipoCliente(rs.getInt("NUMTIPOCLIENTE"));

					}
					return clienteUsuario;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBT_CLIENTE_BYCORREO(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ClienteUsuario actualizarPassword(ClienteUsuario clienteUsuario) throws Exception {
		CallableStatementCallback<ClienteUsuario> callback = null;
		try {
			callback = new CallableStatementCallback<ClienteUsuario>() {
				@Override
				public ClienteUsuario doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setInt(1, clienteUsuario.getNumCodigoCliente());
					cs.setInt(2, clienteUsuario.getNumCodigoClienteUsuario());
					cs.setString(3, clienteUsuario.getChrPassword());
					cs.execute();
					return clienteUsuario;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".ACTUALIZAR_CONTRASEÑA(?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public TipoCambio obtenerTipoCambio() throws Exception {
		CallableStatementCallback<TipoCambio> callback = null;
		try {
			callback = new CallableStatementCallback<TipoCambio>() {
				@Override
				public TipoCambio doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
					TipoCambio tipoCambio = new TipoCambio();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						tipoCambio.setFecha(rs.getDate("FECHA"));
						tipoCambio.setTipoCambioCompra(
								rs.getBigDecimal("NUMTIPOCAMBIOADMCOMPRA").setScale(2, RoundingMode.HALF_UP));
						tipoCambio.setTipoCambioVenta(
								rs.getBigDecimal("NUMTIPOCAMBIOADMVENTA").setScale(2, RoundingMode.HALF_UP));
					}
					return tipoCambio;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBT_TIPO_CAMBIO";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<ClienteUsuario> listaUsuarioAdministradores(UsuarioAdminRequest usuarioAdminRequest) throws Exception {
		CallableStatementCallback<List<ClienteUsuario>> callback = null;
		try {
			callback = new CallableStatementCallback<List<ClienteUsuario>>() {
				@Override
				public List<ClienteUsuario> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<ClienteUsuario> lista = new ArrayList<ClienteUsuario>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, usuarioAdminRequest.getNumCodigoClienteUsuario());
					cs.setInt(3, usuarioAdminRequest.getNumCodigoCliente());	
					cs.setInt(4, usuarioAdminRequest.getPage());
					cs.setInt(5, usuarioAdminRequest.getLimit());
					cs.execute();
					SimpleDateFormat dmy=new SimpleDateFormat("dd/MM/yyyy");
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						ClienteUsuario clienteUsuario=new ClienteUsuario();
						Cliente cliente=new Cliente();
						cliente.setNumCodigoCliente(rs.getInt("NUMCODIGOCLIENTE"));
						cliente.setVchDocumento(rs.getString("VCHDOCUMENTO"));
						cliente.setVchApellidoMaterno(rs.getString("VCHAPELLIDOPATERNO"));
						cliente.setVchApellidoPaterno(rs.getString("VCHAPELLIDOMATERNO"));
						cliente.setVchNombre(rs.getString("VCHNOMBRE"));
						cliente.setVchNombreCompleto(rs.getString("VCHNOMBRECOMPLETO"));
						cliente.setNumTipoCliente(rs.getInt("NUMTIPOCLIENTE"));
						cliente.setVchDireccion(rs.getString("VCHDIRECCION"));
						cliente.setVchTelefonoFijo(rs.getString("VCHTELEFONO1"));
						cliente.setVchTelefonoMovil(rs.getString("VCHCELULAR"));
						clienteUsuario.setChrRol((rs.getString("CHRROL").equalsIgnoreCase(JwtEnum.ROLE_ADMIN.getContex())?JwtEnum.ROLE_ADMIN:JwtEnum.ROLE_USER));
						clienteUsuario.setCliente(cliente);
						clienteUsuario.setNumCodigoCliente(rs.getInt("NUMCODIGOCLIENTE"));
						clienteUsuario.setNumCodigoClienteUsuario(rs.getInt("NUMCODIGOCLIENTEUSUARIO"));
						clienteUsuario.setChrEmail(rs.getString("CHREMAIL"));
						clienteUsuario.setDteModificacion(dmy.format(rs.getTimestamp("DTEMODIFICACION")));
						clienteUsuario.setTotalRegistros(rs.getInt("TOTAL_REGISTROS"));
						lista.add(clienteUsuario);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".LISTA_USUARIO_ADMIN(?,?,?,?)";
		return jdbcTemplate.execute(sql, callback);
	}

}

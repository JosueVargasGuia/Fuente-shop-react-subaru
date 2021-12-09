package com.ShopAutoPartsServices.Repository.Impl;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ShopAutoPartsServices.Domain.Cliente;
import com.ShopAutoPartsServices.Domain.ClienteDireccion;
import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.Departamento;
import com.ShopAutoPartsServices.Domain.Direccion;
import com.ShopAutoPartsServices.Domain.Distrito;
import com.ShopAutoPartsServices.Domain.Provincia;
import com.ShopAutoPartsServices.Domain.Ubigeo;
import com.ShopAutoPartsServices.Repository.DireccionServiceRepository;

import oracle.jdbc.OracleTypes;

@Repository
public class DireccionServiceRepositoryImpl implements DireccionServiceRepository {
	final private String PKG_TIENDA = "PKG_TIENDA";
	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public List<Direccion> obtenerDirecciones(ClienteUsuario clienteUsuario) throws Exception {
		CallableStatementCallback<List<Direccion>> callback = null;
		try {
			callback = new CallableStatementCallback<List<Direccion>>() {
				@Override
				public List<Direccion> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<Direccion> lista = new ArrayList<Direccion>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, clienteUsuario.getNumCodigoCliente());
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					/*
					 * NUMCODIGODIRECCION,D.VCHRALIAS,D.VCHNOMBRE,D.VCHAPELLIDO,D.VCHDIRECCION,
					 * D.VCHDIRECCOMPLEMENTARIA,D.VCHTELEFONO,D.CHRCODIGOUBIGEO,D.FLGREGISTRO,
					 * D.FLGPREDETERMINADO
					 */
					while (rs.next()) {
						Direccion direccion = new Direccion();
						direccion.setNumCodigoDireccion(rs.getInt("NUMCODIGODIRECCION"))								
								.setVchrAlias(rs.getString("VCHRALIAS"))
								.setVchNombre(rs.getString("VCHNOMBRE"))
								.setVchApellido(rs.getString("VCHAPELLIDO"))
								.setVchDireccion(rs.getString("VCHDIRECCION"))
								.setVchreferencia(rs.getString("VCHREFERENCIA"))
								.setVchTelefono(rs.getString("VCHTELEFONO"))
								.setChrCodigoUbigeo(rs.getString("CHRCODIGOUBIGEO"))
								.setFlgPredeterminado(
										rs.getString("FLGPREDETERMINADO").equalsIgnoreCase("1") ? true : false)
								.setFlgFacturacion(rs.getString("FLGFACTURACION"))
								.setNumTipoDocumento(rs.getInt("NUMTIPODOCUMENTO"))
								.setVchDocumento(rs.getString("VCHDOCUMENTO"))
								.setNsecuencia(rs.getInt("NSECUENCIA"))
								.setDepartamento(new Departamento(rs.getString("CHRCODIGODEPARTAMENTO"),rs.getString("VCHDESCRIPCION_DEPARTAMENTO")))								
								.setProvincia(new Provincia(rs.getString("CHRCODIGOPROVINCIA"),rs.getString("VCHDESCRIPCION_PROVINCIA")))
								.setDistrito(new Distrito(rs.getString("CHRCODIGODISTRITO"),rs.getString("VCHDESCRIPCION_DISTRITO")))
								.setClienteDireccion(new ClienteDireccion()).getClienteDireccion()
								.setNumCodigoCliente(rs.getInt("NUMCODIGODIRECCION"))
								.setNumCodigoDireccion(rs.getInt("NUMCODIGOCLIENTE"));

						lista.add(direccion);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".LISTAR_DIRECCIONES(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	public Direccion registrarDireccion(Direccion direccion) throws Exception  {
		CallableStatementCallback<Direccion> callback = null;
		try {
			callback = new CallableStatementCallback<Direccion>() {
				@Override
				public Direccion doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setInt(1, direccion. getClienteDireccion().getNumCodigoCliente());
					cs.setInt(2, direccion. getNumCodigoDireccion());
					cs.setString(3, direccion. getVchrAlias());
					cs.setString(4, direccion. getVchNombre());					 
					cs.setString(5, direccion. getVchApellido());
					cs.setString(6, direccion. getVchDireccion());
					cs.setString(7, direccion. getVchreferencia());
					cs.setString(8, direccion. getVchTelefono());
					cs.setString(9, direccion. getDepartamento().getChrCodigoDepartamento());
					cs.setString(10, direccion. getProvincia().getChrCodigoProvincia());
					cs.setString(11, direccion. getDistrito().getChrCodigoDistrito());
					//cs.setString(12, (direccion.isFlgPredeterminado()?"1":"0"));
					cs.setString(12, "0");
					cs.setString(13, direccion.getVchDocumento());
					cs.setInt(14, direccion.getNumTipoDocumento());
					cs.setString(15, (direccion.getFlgFacturacion().equalsIgnoreCase("1")?"1":"0"));
					cs.setInt(16, direccion.getNsecuencia());
					cs.registerOutParameter(17, OracleTypes.VARCHAR);
					cs.execute();					 
					return direccion;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_DIRECIONES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
		
	}

	public Direccion eliminarDireccion(Direccion direccion) throws Exception {
		CallableStatementCallback<Direccion> callback = null;
		try {
			callback = new CallableStatementCallback<Direccion>() {
				@Override
				public Direccion doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setInt(1, direccion. getNumCodigoDireccion());					 
			 
					cs.execute();					 
					return direccion;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".ELIMINAR_DIRECIONES(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public void quitarUsuarioAdmin(ClienteUsuario clienteUsuario) throws Exception {
		CallableStatementCallback<ClienteUsuario> callback = null;
		try {
			callback = new CallableStatementCallback<ClienteUsuario>() {
				@Override
				public ClienteUsuario doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setInt(1, clienteUsuario. getNumCodigoCliente());
					cs.setInt(2, clienteUsuario. getNumCodigoClienteUsuario());
			 
					cs.execute();					 
					return clienteUsuario;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".QUITAR_USUARIO_ADMIN(?,?)}";
		  jdbcTemplate.execute(sql, callback);
	}

 
 

}

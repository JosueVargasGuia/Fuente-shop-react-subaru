package com.ShopAutoPartsServices.Repository.Impl;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ShopAutoPartsServices.Domain.CorreoJobsOnline;
import com.ShopAutoPartsServices.Domain.MenuOnline;
import com.ShopAutoPartsServices.Enums.FilterValidacionGenerico;
import com.ShopAutoPartsServices.Repository.UtilServiceRepository;
import com.ShopAutoPartsServices.WsServices.ProductoController;

import oracle.jdbc.OracleType;
import oracle.jdbc.OracleTypes;

@Repository
public class UtilServiceRepositoryImpl implements UtilServiceRepository {
	final private String PKG_TIENDA = "PKG_TIENDA";
	@Autowired
	private JdbcTemplate jdbcTemplate;
	Logger logger = LoggerFactory.getLogger(UtilServiceRepositoryImpl.class);
	@Override
	public List<CorreoJobsOnline> obtenerListaCorreoJobs(CorreoJobsOnline correoJobsOnline) throws Exception {
		CallableStatementCallback<List<CorreoJobsOnline>> callback = null;
		try {
			callback = new CallableStatementCallback<List<CorreoJobsOnline>>() {
				@Override
				public List<CorreoJobsOnline> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<CorreoJobsOnline> list = new ArrayList<CorreoJobsOnline>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, correoJobsOnline.getFilterCorreo().toString());
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						CorreoJobsOnline obj = new CorreoJobsOnline();
						obj.setVchCorreo(rs.getString("VCHCORREO"));
						obj.setFlgDestinoOc(rs.getInt("FLGDESTINO_OC"));
						obj.setFlgTipoCambioRegistrado(rs.getInt("FLGTIPOCAMBIO_REGISTRADO"));
						obj.setFlgTipoCambioTomado(rs.getInt("FLGTIPOCAMBIO_TOMADO"));
						obj.setNumCodigoCorreoJobsOnline(rs.getInt("NUMCODIGOCORREOJOBSONLINE"));
						list.add(obj);
					}
					return list;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".LISTA_CORREO_JOBS(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public void registrarCorreo(CorreoJobsOnline correoJobsOnline) throws Exception {
		CallableStatementCallback<CorreoJobsOnline> callback = null;
		try {
			callback = new CallableStatementCallback<CorreoJobsOnline>() {
				@Override
				public CorreoJobsOnline doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setInt(1, correoJobsOnline.getNumCodigoCorreoJobsOnline());
					cs.setString(2, correoJobsOnline.getVchCorreo());
					cs.setInt(3, correoJobsOnline.getFlgTipoCambioRegistrado());
					cs.setInt(4, correoJobsOnline.getFlgTipoCambioTomado());
					cs.setInt(5, correoJobsOnline.getFlgDestinoOc());
					cs.setString(6, correoJobsOnline.getCrud().getDescripcion());
					cs.registerOutParameter(7, OracleTypes.VARCHAR);
					cs.execute();
					return correoJobsOnline;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_CORREO_JOBS(?,?,?,?,?,?,?)}";
		jdbcTemplate.execute(sql, callback);

	}

	@Override
	public boolean validarScheduledCorrreo(String scheduled) throws Exception {
		CallableStatementCallback<Boolean> callback = null;
		try {
			callback = new CallableStatementCallback<Boolean>() {
				@Override
				public Boolean doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
					boolean validado = false;
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, scheduled);
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						if (scheduled
								.equalsIgnoreCase(FilterValidacionGenerico.SCHEDULED_ALERTA_TIPO_CAMBIO.toString())) {
							validado = (rs.getInt("COUNTS") == 0 ? true : false);
						}
						if (scheduled.equalsIgnoreCase(FilterValidacionGenerico.SCHEDULED_CONSOLIDADO_OC.toString())) {
							validado = (rs.getInt("COUNTS") == 0 ? false : true);
						}

					}
					return validado;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".VALIDAR_JOBS_CORREO(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public MenuOnline saveUpdateMenu(MenuOnline menuOnline) throws Exception {
		CallableStatementCallback<MenuOnline> callback = null;
		try {
			callback = new CallableStatementCallback<MenuOnline>() {
				@Override
				public MenuOnline doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
				 
					cs.setString(1, menuOnline.getVchrCodigo());
					cs.setString(2, menuOnline.getVchrDescripcion());
					
					cs.setString(3,(menuOnline.getVchrSubFamilia()==null?"":String.join(",", menuOnline.getVchrSubFamilia())));
					cs.setString(4,(menuOnline.getVchrPalabraClave()==null?"":String.join(",", menuOnline.getVchrPalabraClave())));
					cs.setString(5, null);
					cs.setString(6,menuOnline.getChrTypeImg());
					cs.setString(7, menuOnline.getVchrGrupo());
					cs.setInt(8, menuOnline.getNumSecuencia());
					cs.setString(9, menuOnline.getCrud().toString());
					cs.registerOutParameter(10, OracleTypes.VARCHAR);
					cs.registerOutParameter(11, OracleTypes.VARCHAR);
					cs.execute();
					menuOnline.setVchrCodigo(cs.getString(10));
					menuOnline.setStatus(cs.getString(11));
					 
					return menuOnline;
				}
			};
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".UPDATE_SAVE_MENUONLINE(?,?,?,?,?,?,?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);/**/

	}

	@Override
	public List<MenuOnline> obtenerListaMenu() throws Exception {
		CallableStatementCallback<List<MenuOnline>> callback = null;
		try {
			callback = new CallableStatementCallback<List<MenuOnline>>() {
				@Override
				public List<MenuOnline> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<MenuOnline> list = new ArrayList<MenuOnline>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);					 
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						MenuOnline obj=new MenuOnline();
						obj.setChrTypeImg(rs.getString("CHRTYPEIMG"));
						obj.setNumSecuencia(rs.getInt("NUMSECUENCIA"));
						obj.setVchrCodigo(rs.getString("VCHRCODIGO"));
						obj.setVchrDescripcion(rs.getString("VCHRDESCRIPCION"));
						obj.setVchrGrupo(rs.getString("VCHRGRUPO"));
						obj.setVchrPalabraClave(parseStringToList(rs.getString("VCHRPALABRACLAVE")));
						obj.setVchrSubFamilia(parseStringToList(rs.getString("VCHRSUBFAMILIA")));
						list.add(obj);
					}
					return list;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBTENER_MENUS()}";
		return jdbcTemplate.execute(sql, callback);
	}
	private List<String>parseStringToList(String _String){
		List<String>lista=new ArrayList<String>();
		if(_String!=null) {
		String[]lst=_String.split(",");
		for (int i = 0; i <lst.length; i++) {
			lista.add(lst[i]);
		}
		}
		return lista;
	}

}

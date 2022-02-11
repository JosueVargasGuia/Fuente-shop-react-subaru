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

import com.ShopAutoPartsServices.Domain.CorreoJobsOnline;
 
import com.ShopAutoPartsServices.Enums.FilterValidacionGenerico;
import com.ShopAutoPartsServices.Repository.CorreoJobsServiceRepository;

import oracle.jdbc.OracleTypes;

@Repository
public class CorreoJobsServiceRepositoryImpl implements CorreoJobsServiceRepository {
	final private String PKG_TIENDA = "PKG_TIENDA";
	@Autowired
	private JdbcTemplate jdbcTemplate;

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
				public Boolean doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					boolean validado=false;
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, scheduled);
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						if(scheduled.equalsIgnoreCase(FilterValidacionGenerico.SCHEDULED_ALERTA_TIPO_CAMBIO.toString())) {
							validado=(rs.getInt("COUNTS")==0?true:false);
						}
						if(scheduled.equalsIgnoreCase(FilterValidacionGenerico.SCHEDULED_CONSOLIDADO_OC.toString())) {
							validado=(rs.getInt("COUNTS")==0?false:true);
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

}

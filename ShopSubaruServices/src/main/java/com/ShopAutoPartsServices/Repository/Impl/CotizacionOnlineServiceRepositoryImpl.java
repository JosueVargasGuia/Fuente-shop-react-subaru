package com.ShopAutoPartsServices.Repository.Impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Clob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.yaml.snakeyaml.external.biz.base64Coder.Base64Coder;
 
import com.ShopAutoPartsServices.Domain.ClienteFactura;
 
import com.ShopAutoPartsServices.Domain.CotizacionOnline;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineActiva;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineDetalle;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineResumen;
import com.ShopAutoPartsServices.Domain.Familia;
import com.ShopAutoPartsServices.Domain.MetodoEnvioRequets;
import com.ShopAutoPartsServices.Domain.Producto;
import com.ShopAutoPartsServices.Domain.ReporteCotizacion;
import com.ShopAutoPartsServices.Domain.ReporteRequest;
import com.ShopAutoPartsServices.Domain.Response;
import com.ShopAutoPartsServices.Domain.TusCompras;
 
import com.ShopAutoPartsServices.Domain.IziPay.BillingDetails;
import com.ShopAutoPartsServices.Domain.IziPay.CreatePayment;
import com.ShopAutoPartsServices.Domain.IziPay.CreatePaymentRequest;
import com.ShopAutoPartsServices.Domain.IziPay.Customer;
import com.ShopAutoPartsServices.Domain.IziPay.IpnRequets;
import com.ShopAutoPartsServices.Domain.IziPay.ScheduledProceso;
import com.ShopAutoPartsServices.Domain.IziPay.StatusIziPay;
import com.ShopAutoPartsServices.Enums.EstadoCotizacion;
import com.ShopAutoPartsServices.Enums.MetodoEnvio;
import com.ShopAutoPartsServices.Enums.Moneda;
import com.ShopAutoPartsServices.Enums.Status;
import com.ShopAutoPartsServices.Enums.StatusSyncCotizacion;
import com.ShopAutoPartsServices.Repository.CotizacionOnlineServiceRepository;
 

import oracle.jdbc.OracleTypes;
 

@Repository
public class CotizacionOnlineServiceRepositoryImpl implements CotizacionOnlineServiceRepository {
	Logger logger = LoggerFactory.getLogger(CotizacionOnlineServiceRepositoryImpl.class);
	final private String PKG_TIENDA = "PKG_TIENDA";
	@Autowired
	JdbcTemplate jdbcTemplate;
	//final private String imageNoDisponible = "iVBORw0KGgoAAAANSUhEUgAAASMAAACdCAYAAAD/lx6cAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAtrSURBVHhe7Z1rluoqEEbvuByQ43E0TsbBeKlE7QgfpEi0uw7Ze636cfogL2EnIZj8dwcACAAyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACAEyAoAQICMACMGgMrrez6f/7v/9t4jT5X57/C8AxGNMGd0u99NSRFOck6IAICrICABCgIwAIATICABCgIwAIATI6Hp+S3s6L1LdrvfL+fSe1yn9O6W5iVtzt+vlfk7//0qb4nQ63y9Xz3282/T5yznVx8pY5PGT1+l+vuiyazzrpPLT0Zb2TfVJCm/dbpesfy4/H7C8t/dfm98p93a/Xs66v+1v5/T9fqAto3J4GeWDdN4CkAZVmnBvfy8iTb5nhtNgVml+4k1yOUmI6jOtWE4miaNOOk53mbU7P5NSvW7Xc5Z+6pfb/bKW986tGd8t1zNeFmGi29OYQUFGhYzsyLb4dzPSxE1HQu9ZR00gxURxRl1ISRwivS+EjGR/tqMm36Kt1t/Lf7eiJfQVvleuQ2iV2NGcIUFGuYy+GroOW2X0+fws8jy3i01Ntn11q5y1OfhWuX/VnhFBRg0Z2TX+aw3ELlNEmp+wy7ZX4vu1kq88Gj4u06Z1imndxS4U37lla1v1/EQ9U77LpQpbRyryqhymZf9k+VXbKy5xWpP3ZG1/pLP26jR5jj6+Um4tbRo3b/2Tvs/qZRynRy+QUUUaPYOvdoRTE2DrZDJUXYv8irZXjr5FW1T/KLHV11DK9pZl16TgPovaOHk/X27l8qxRPz3W9Lg8IshIDZDqgFJnR/VT7b6813HJyCWZhEdaoh+bMhWyzpurJno1TyX/jf338XI7xtgP+ux6x5AYCmTkmeAv1NGwLqMtk2m+dV6/vZ/Huoy8Z0ZlOn0k74u8fkoK1S5R3+PGu2ofL3ejKLukeDCQURAZzfuBsrSOKOoqJ1Jq+yKZXDMS/YOMFpGV2zduftj6uSOAjCLISKVzhqqrmnhr8al88sjzRUbIqAYy+nMZrd2la4eua2+e/r7piuKuGzJCRnWQ0V/LSJ4VzdsE8p9WeOvauxs4F8aTb0ycUWTk+m4FXfU4GMjoj2Wkyq8NTlddizJt75ItiC//dvL99mrjhGsxjIw6xtgPfXdjjwYyCiejWn62cW6Zbo68rnmaXWcysh/3TZ5hZCTF0u5vNda2tmdEkFE4GaVIA/Tt7lfjR6prMpravXm0q/Za6MtI+8Pt+vOrftWP48hI52lRPNWhsQO7WocDgoz+WEa6rv7I6yrlloftYXrGeb5cqzVhV/3ETBtJRinXXTcftrZlVJDRX8soUTvCeqKsa6pjzwL2KxaPRMlwCU7F8DJKpO+4HGuOsBsHjyxgBhkFkJHOtww7/b9kk0rVdbM8Gm2p/VC3Fapuw8nI6Hx21HQZ9/go/DCmjOz0OR8c7iPb8tf3OeLav3WEE4O6Ljob0+qpjHYpZWtI8+fyX8fndd0uokdUZ+jMVEdbExKT73XZ13jiY1m/hszFJG8+pK7Bb5T7egpm0Tf2t3P3UzqPxqAyOijyiJ5kqSaALaoqcW088wDYCzIaCXFZ2D6giwVYZAR/BDIaCHmJluTyvMRbUt0usPEyCGAvyGgk1IJ5Z+Ai+CuQ0VD47srVorW4DvBtkNFwbNln1LqDCPA7IKNRme6WVV4omGK+Da/XkwD+AmQEACFARgAQAmQEACFARgAQAmQEACFARgAQAmQEACFARgAQAmQEACFARgAQAmQEACFARgAQAmQEACFARgAQAmQEACFARt7XCaV078+Mrr/0EHbg7OeuVw95KcYCD537TZCR80WL8q2vvEnj43j7ueuljF7EWOBRvL8HMnLJqPJsaWT0Yfz9jIzGAxlxZhQKzoyOCzJyyqhYyzid969RQImzn5HReCAjr4wgFMhoPJARMvonQUbjgYyQ0T8JMhqP4WVk75S3lxq+7R+xdYjn/hGvjHr3oDzeW3Yq7g6lujzKV5/O98+8lSHbkupxuXYupDfeqfZ4n9qrfxrkdV1O3Pld/tn/L/u9hrOfmzLa2k8bZSTHmH32WeZ6FpAYWkbXtTer2l0ar4w6Bmq5Ia8Sopx8ks1lJHmstuV8X/eHI59lVBaPnxRCmNrjeMV26y6ks5+1jJz99MijoFdGk3Df0+swKa1+OYdnWBmpweqOHTJyi8jCccv6lI6s/vfnNyaaRxKVUN1hFH2cJvp5+e9W1DMt0npl5I6aDHtkVJzBrcep1maYGFNGYlB1xWYZpSNllqYZzv0zPVGbPPvy1T+1+Eaevn7+Uj+5ZdT5PS8CH9UZUkZ6oKbB/7qOsTWTxhnMVhnJNNk6xbSW9NhLI8ppTTI7sr5acK0dmcXZkaiXxfyu/Ucaw+pWu8zpreui3fJSeEqT9Z/hFIK/7H39pMqWZ7/FZXJljLUuUQ/OgDLSRy15RKpMkq0yKgdp/483a5NMLpZX6v9e/crlmeyQGX2pWU7eel0fCRbItBv72fh8PyVcZYvx1RBMWc8P/KB3UMaTkRp4jcEiJ97WSSLLzo+YbdQkU5NxRovmLb1c2xBnBW/4hN5VV9U3H5bRrn4yPGWL/qyXmxB5qmbDgDJyy+XJRydJfS3BdVs7oSZZu/pl+rf6e9uX4ZnsXXVVUlQHCVc/d5adWO0nw1G2Pmvsi6a8DswhZNT88j8qI89gtX082TrSgt5Jtibf7v544PncvySjtX6aQEZ/ynAy6h2kagDukZFxs82OWdoy/Heo9kwyZDTzKRmpcnvD0/9HhDOjL8ho4nFnqi0l36LwnkmGjGY+JSOZT090riEeCWT0LRktsNvLtZ26uyZ4QqV/y9PbvgxPPf4lGa32k7FRRqp+0M9wMlIDSg76B64jprFDRk88Pz1xTZoX+i7RW5ZKApvuppWXldFktKufDE/Zju8QtjGejOTk0+sztc1435JRymR1j4qaZBb+/TN5W/UdvlbdpaCFOKLJyEKW7+qnhKfsjvEFfYwno8pRcBowrwn9nR3Y8ySef/V+TWVl/6vLzMqqTTKLfFdzOSlSOKVhMd3VWyZu7MDWXeJLN/FLMrLY2k++suvjyw4Yb/1ppD/crj+/6ldtgZkBZWTjviEaT+yS0XuatciLak0yT2gZ1Pc/uUJN3ERUGXlC1tNZtmyLN6odBEPKKI2WytFLhG1GzCWiBsw3ZCTK2TXJWgM91X/TBLK7P48sckLJ6Px7TwwwNh/wWt/RwRlURsa6kOxyyoZaMbDUgPmwjGobH/UEr18+PaO1kfKF+/k7c6zlGUtGVvB6+5pt6pCRUb0EbEQrv6MzsIxm5tvq7xM5/2lGvpBtaw4Fxa+/9RMIrbxpfSAr08Lz5L/WBC+3CFg5tm+lb4C/nkxYTNw5P+/TCUv5NhZyhQhNDAXefs7KXk7ySRJ5WZ5+cpadM30vsj/n7/yUztouzj49MsPL6F+j62wDYCCQUTCQERwVZBQMZARHBRkFAxnBUUFGwUBGcFSQUTCQERwVZBSMrtvlAAOBjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgBMgIAEKAjAAgAPf7/yNByjkGODBCAAAAAElFTkSuQmCC";
		//final private String imageNoDisponible = "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";
		final private String imageNoDisponible = "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";
		
	@Override
	public CotizacionOnline registrarCotizacion(CotizacionOnline cotizacionOnlineRequets) throws Exception {
		CallableStatementCallback<CotizacionOnline> callback = null;
		try {
			callback = new CallableStatementCallback<CotizacionOnline>() {
				@Override
				public CotizacionOnline doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.NUMERIC);
					cs.setInt(1, cotizacionOnlineRequets.getNumCodigoCotizacionOnline());
					cs.setInt(2, cotizacionOnlineRequets.getNumCodigoCliente());
					cs.setInt(3, cotizacionOnlineRequets.getNumCodigoClienteUsuario());
					cs.setString(4, cotizacionOnlineRequets.getStatusAction().toString());
					cs.execute();
					cotizacionOnlineRequets.setNumCodigoCotizacionOnline(cs.getInt(1));
					return cotizacionOnlineRequets;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_COTIZACION(?,?,?,?)";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public CotizacionOnlineActiva obtenerCotizacionActiva(CotizacionOnlineActiva cotizacionOnlineActivaRequest)
			throws Exception {
		CallableStatementCallback<CotizacionOnlineActiva> callback = null;
		try {
			callback = new CallableStatementCallback<CotizacionOnlineActiva>() {
				@Override
				public CotizacionOnlineActiva doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					CotizacionOnlineActiva cotizacionOnlineActiva = new CotizacionOnlineActiva();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, cotizacionOnlineActivaRequest.getNumCodigoCliente());
					cs.setInt(3, cotizacionOnlineActivaRequest.getNumCodigoClienteUsuario());
					cs.setInt(4, cotizacionOnlineActivaRequest.getNumCodigoCotizacionOnline());
					cs.setString(5, cotizacionOnlineActivaRequest.getIsLogin());
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						cotizacionOnlineActiva.setCantidad(rs.getInt("CANTIDAD"));
						cotizacionOnlineActiva.setNumCodigoCliente(rs.getInt("NUMCODIGOCLIENTE"));
						cotizacionOnlineActiva.setNumCodigoClienteUsuario(rs.getInt("NUMCODIGOCLIENTEUSUARIO"));
						cotizacionOnlineActiva.setNumCodigoCotizacionOnline(rs.getInt("NUMCODIGOCOTIZACIONONLINE"));
						cotizacionOnlineActiva.setStatus(StatusSyncCotizacion.SYNCRONIZA);
					}
					return cotizacionOnlineActiva;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBT_COTIZACION_ACTIVA(?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public CotizacionOnlineDetalle registrarCotizacionDetalle(CotizacionOnlineDetalle cotizacionOnlineDetalle)
			throws Exception {
		CallableStatementCallback<CotizacionOnlineDetalle> callback = null;
		logger.info(cotizacionOnlineDetalle.toString());
		try {
			callback = new CallableStatementCallback<CotizacionOnlineDetalle>() {
				@Override
				public CotizacionOnlineDetalle doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.NUMERIC);
					cs.setInt(1, cotizacionOnlineDetalle.getNumcodCotizacionOnlinedet());
					cs.setInt(2, cotizacionOnlineDetalle.getNumCodigoCotizacionOnline());
					cs.setString(3, cotizacionOnlineDetalle.getProducto().getChrCodigoProducto());					
					cs.setInt(4, cotizacionOnlineDetalle.getNumCantidad());
					cs.setString(5, cotizacionOnlineDetalle.getTipoActualizacionCotizacionDetalle().toString());
					cs.setInt(6, cotizacionOnlineDetalle.getProducto().getNumOutlet());
					cs.setInt(7, cotizacionOnlineDetalle.getProducto().getNumProductoVigencia());
					cs.registerOutParameter(8, OracleTypes.VARCHAR);
					cs.execute();					 
					cotizacionOnlineDetalle.setNumcodCotizacionOnlinedet(cs.getInt(1));
					cotizacionOnlineDetalle.setResponse(new Response().setObjectStatus(cs.getString(8)));
					return cotizacionOnlineDetalle;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_COTIZACION_DET(?,?,?,?,?,?,?,?)";
		return jdbcTemplate.execute(sql, callback);

	}

	@Override
	public List<CotizacionOnlineDetalle> obtenerCotizacionDetalle(CotizacionOnlineDetalle cotizacionOnlineDetalle)
			throws Exception {
		CallableStatementCallback<List<CotizacionOnlineDetalle>> callback = null;
		try {
			callback = new CallableStatementCallback<List<CotizacionOnlineDetalle>>() {
				@Override
				public List<CotizacionOnlineDetalle> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<CotizacionOnlineDetalle> lista = new ArrayList<CotizacionOnlineDetalle>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, cotizacionOnlineDetalle.getNumCodigoCotizacionOnline());
					cs.setInt(3, cotizacionOnlineDetalle.getNumcodCotizacionOnlinedet());
					cs.execute();
					DecimalFormat formatter = new DecimalFormat("###,###.00");
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						CotizacionOnlineDetalle obj = new CotizacionOnlineDetalle();
						Producto p = new Producto();
						p.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						p.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						p.setNumStock(rs.getInt("NUMSTOCK"));
						p.setNumOutlet(rs.getInt("NUMOUTLET"));
						p.setNumProductoVigencia(rs.getInt("NUMPRODUCTOVIGENCIA"));
						Familia f = new Familia();
						f.setChrCodigoFamilia(rs.getString("CHRCODIGOFAMILIA"));
						f.setVchDescripcion(rs.getString("FVCHDESCRIPCION"));
						obj.setProducto(p);
						p.setFamilia(f);

						obj.setNumCantidad(rs.getInt("NUMCANTIDAD"));
						obj.setNumcodCotizacionOnlinedet(rs.getInt("NUMCODCOTIZACIONONLINEDET"));
						obj.setNumCodigoCotizacionOnline(rs.getInt("NUMCODIGOCOTIZACIONONLINE"));
						/*
						 * obj.setNumCostoEnvioDol(rs.getBigDecimal("NUMCOSTOENVIODOL").setScale(2,
						 * RoundingMode.HALF_UP));
						 * obj.setNumCostoEnvioSol(rs.getBigDecimal("NUMCOSTOENVIOSOL").setScale(2,
						 * RoundingMode.HALF_UP));
						 */
						obj.setNumIgvDol(formatter.format(rs.getBigDecimal("NUMIGVDOL").setScale(2,RoundingMode.HALF_UP)));
						obj.setNumIgvSol(formatter.format(rs.getBigDecimal("NUMIGVSOL").setScale(2,RoundingMode.HALF_UP)));
						
						obj.setNumPrecioUnitarioDol(formatter.format(rs.getBigDecimal("NUMPRECIOUNITARIODOL").setScale(2,RoundingMode.HALF_UP)));
						obj.setNumPrecioUnitarioSol(formatter.format(rs.getBigDecimal("NUMPRECIOUNITARIOSOL").setScale(2,RoundingMode.HALF_UP)));
						
						obj.setNumPrecioUnitarioDolIgv(formatter.format(rs.getBigDecimal("NUMVALORVENTADOLARIGV").setScale(2,RoundingMode.HALF_UP)));
						obj.setNumPrecioUnitarioSolIgv(formatter.format(rs.getBigDecimal("NUMPRECIOUNITARIOSOLIGV").setScale(2,RoundingMode.HALF_UP)));
						
						obj.setNumSubTotalDol(formatter.format(rs.getBigDecimal("NUMSUBTOTALDOL").setScale(2,RoundingMode.HALF_UP)));
						obj.setNumSubTotalSol(formatter.format(rs.getBigDecimal("NUMSUBTOTALSOL").setScale(2,RoundingMode.HALF_UP)));
						
						obj.setNumSubTotalDolIgv(formatter.format(rs.getBigDecimal("NUMSUBTOTALDOLIGV").setScale(2,RoundingMode.HALF_UP)));
						obj.setNumSubTotalSolIgv(formatter.format(rs.getBigDecimal("NUMSUBTOTALSOLIGV").setScale(2,RoundingMode.HALF_UP)));
						
						obj.setNumTotalDol(formatter.format(rs.getBigDecimal("NUMTOTALDOL").setScale(2,RoundingMode.HALF_UP)));
						obj.setNumTotalSol(formatter.format(rs.getBigDecimal("NUMTOTALSOL").setScale(2,RoundingMode.HALF_UP)));

						Blob imageBlob = rs.getBlob("CHRSRCIMAGEN");

						if (imageBlob != null) {
							byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
							obj.setChrSrcImagen(Base64Coder.encodeLines(imageBytes) + "");
						} else {
							obj.setChrSrcImagen(imageNoDisponible);
						}

						obj.setChrType(rs.getString("CHRTYPE"));

						lista.add(obj);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBT_COTIZACION_DETALLE(?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public CotizacionOnlineResumen obtenerCotizacionOnline(int numCodigoCotizacionOnline) throws Exception {
		CallableStatementCallback<CotizacionOnlineResumen> callback = null;
		CotizacionOnlineResumen onlineResumen = new CotizacionOnlineResumen();
		try {
			callback = new CallableStatementCallback<CotizacionOnlineResumen>() {
				@Override
				public CotizacionOnlineResumen doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, numCodigoCotizacionOnline);
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					DecimalFormat formatter = new DecimalFormat("###,###.00");
					while (rs.next()) {
						onlineResumen.setTotalRegistros(rs.getInt("TOTALREGISTROS"));
						 
						
						onlineResumen.setNumEnvioSol(rs.getString("NUMMETODOENVIOSOL") == null || rs.getString("NUMMETODOENVIOSOL").trim().equalsIgnoreCase("0.00") ? "00.00"
								: formatter.format(rs.getBigDecimal("NUMMETODOENVIOSOL").setScale(2,RoundingMode.HALF_UP)));

						onlineResumen.setNumSubTotalSol(
								rs.getString("NUMSUBTOTALSOL") == null ? "00.00" : 
									formatter.format(rs.getBigDecimal("NUMSUBTOTALSOL").setScale(2,RoundingMode.HALF_UP)));

						onlineResumen
								.setNumIgvSol(rs.getString("NUMIGVSOL") == null ? "00.00" :
									formatter.format( rs.getBigDecimal("NUMIGVSOL").setScale(2,RoundingMode.HALF_UP)));

						onlineResumen.setNumTotalSol(
								rs.getString("NUMTOTALSOL") == null ? "00.00" : 
									formatter.format(rs.getBigDecimal("NUMTOTALSOL").setScale(2,RoundingMode.HALF_UP)));

						onlineResumen.setNumEnvioDol(rs.getString("NUMMETODOENVIODOL") == null || rs.getString("NUMMETODOENVIODOL").trim().equalsIgnoreCase("0.00") ? "00.00"
								: formatter.format(rs.getBigDecimal("NUMMETODOENVIODOL").setScale(2,RoundingMode.HALF_UP)));

						onlineResumen.setNumSubTotalDol(
								rs.getString("NUMSUBTOTALDOL") == null ? "00.00" : 
									formatter.format(rs.getBigDecimal("NUMSUBTOTALDOL").setScale(2,RoundingMode.HALF_UP)));

						onlineResumen
								.setNumIgvDol(rs.getString("NUMIGVDOL") == null ? "00.00" : 
									formatter.format(rs.getBigDecimal("NUMIGVDOL").setScale(2,RoundingMode.HALF_UP)));

						onlineResumen.setNumTotalDol(
								rs.getString("NUMTOTALDOL") == null ? "00.00" : 
									formatter.format(rs.getBigDecimal("NUMTOTALDOL").setScale(2,RoundingMode.HALF_UP)));
								
						onlineResumen.setFlgnumCodigoDireccion(rs.getInt("FLGNUMCODIGODIRECCION"));

					}
					return onlineResumen;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBT_COTIZACION_RESUMEN(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public CotizacionOnlineDetalle eliminarCotizacionDetalle(CotizacionOnlineDetalle cotizacionOnlineDetalle)
			throws Exception {
		CallableStatementCallback<CotizacionOnlineDetalle> callback = null;
		try {
			callback = new CallableStatementCallback<CotizacionOnlineDetalle>() {
				@Override
				public CotizacionOnlineDetalle doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setInt(1, cotizacionOnlineDetalle.getNumcodCotizacionOnlinedet());
					cs.setInt(2, cotizacionOnlineDetalle.getNumCodigoCotizacionOnline());
					cs.execute();
					return cotizacionOnlineDetalle;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".ELIMINAR_COTIZACION_DET(?,?)";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public MetodoEnvioRequets registrarModoEnvio(MetodoEnvioRequets metodoEnvioRequets) throws Exception {
		CallableStatementCallback<MetodoEnvioRequets> callback = null;
		try {
			callback = new CallableStatementCallback<MetodoEnvioRequets>() {
				@Override
				public MetodoEnvioRequets doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {

					cs.setInt(1, metodoEnvioRequets.getNumCodigoCotizacionOnline());
					cs.setInt(2, metodoEnvioRequets.getNumCodigoDireccion());
					cs.setString(3, metodoEnvioRequets.getMetodoEnvio().toString());
					cs.registerOutParameter(4, OracleTypes.VARCHAR);
					cs.registerOutParameter(5, OracleTypes.VARCHAR);
					cs.registerOutParameter(6, OracleTypes.VARCHAR);
					cs.execute();
					metodoEnvioRequets.setMensaje(cs.getString(4));
					metodoEnvioRequets.setStatus(Status.valueOf(cs.getString(5)));
					metodoEnvioRequets.setMetodoEnvio(MetodoEnvio.valueOf(cs.getString(6)));
					return metodoEnvioRequets;
				}
			};
		} catch (Exception e) {
			
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_COTIZACION_DET_TRANS(?,?,?,?,?,?)";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public CreatePayment obtenerCotizacionPago(CreatePaymentRequest createPaymentRequest) throws Exception {
		CallableStatementCallback<CreatePayment> callback = null;
		try {
			callback = new CallableStatementCallback<CreatePayment>() {
				@Override
				public CreatePayment doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					CreatePayment createPayment = new CreatePayment();
					Customer customer = new Customer();
					BillingDetails billingDetails = new BillingDetails();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, createPaymentRequest.getNumCodigoCotizacionOnline());
					cs.setInt(3, createPaymentRequest.getNumCodigoDireccion());
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						createPayment.setAmount(rs.getString("NUMTOTALDOL"));
						createPayment.setOrderId(rs.getString("NUMCODIGOCOTIZACIONONLINE"));
						customer.setEmail(rs.getString("CHREMAIL"));
						customer.setReference(rs.getString("NUMCODIGOCLIENTE"));
						// billingDetails.setTitle(rs.getString("CHRTRATAMIENTO"));
						billingDetails.setTitle("");
						billingDetails.setCategory(rs.getString("NUMTIPOCLIENTE"));

						// billingDetails.setPhoneNumber(rs.getString(""));
						// billingDetails.setStreetNumber(rs.getString(""));

						// billingDetails.setAddress2(rs.getString(""));
						// billingDetails.setDistrict(rs.getString(""));
						// billingDetails.setZipCode(rs.getString(""));
						billingDetails.setCity(rs.getString("VCHDESCRIPCION_PROVINCIA"));
						/*
						 * Región (estado) de la dirección de facturación. Es recomendable pero no
						 * obligatorio transmitir el valor en formato ISO-3166-2.
						 */
						billingDetails.setState("PE");
						/* País del comprador (en letras mayúsculas, según la norma ISO 3166-1 alfa-2 */
						billingDetails.setCountry("PE");
						billingDetails.setLanguage("ES");

						// billingDetails.setCellPhoneNumber(rs.getString(""));
						billingDetails.setIdentityCode(rs.getString("VCHDOCUMENTO"));

						billingDetails.setAddress(rs.getString("VCHDIRECCION"));
						billingDetails.setFirstName(rs.getString("VCHNOMBRE"));
						billingDetails.setLastName(rs.getString("APELLIDO"));
						billingDetails.setLegalName(rs.getString("VCHNOMBRECOMPLETO"));

						customer.setBillingDetails(billingDetails);
						createPayment.setCustomer(customer);
					}
					return createPayment;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBT_COTIZACION_PAGOS(?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public void confirmarCotizacion(IpnRequets ipnRequets) throws Exception {
		CallableStatementCallback<IpnRequets> callback = null;
		try {
			callback = new CallableStatementCallback<IpnRequets>() {
				@Override
				public IpnRequets doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
					Clob clob = cs.getConnection().createClob();
					clob.setString(1, ipnRequets.getKrAnswer());
					cs.setInt(1, ipnRequets.getNumCodigoCotizacionOnline());
					cs.setString(2, ipnRequets.getStatus());
					cs.setString(3, ipnRequets.getStatusAction());
					cs.setString(4, ipnRequets.getEstadoCotizacion().toString());
					cs.setString(5, ipnRequets.getKrHash());
					cs.setString(6, ipnRequets.getKrHashAlgorithm());
					cs.setString(7, ipnRequets.getKrHashKey());
					cs.setString(8, ipnRequets.getKrAnswerType());
					cs.setClob(9, clob);
					cs.setString(10, ipnRequets.getUuid());
					cs.setString(11, ipnRequets.getLegacyTransId());
					cs.execute();
					return ipnRequets;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".CONFIRMAR_COTIZACION(?,?,?,?,?,?,?,?,?,?,?)";
		jdbcTemplate.execute(sql, callback);

	}

	@Override
	public List<ClienteFactura> obtenerCotizacionFactura() throws Exception {
		CallableStatementCallback<List<ClienteFactura>> callback = null;
		try {
			callback = new CallableStatementCallback<List<ClienteFactura>>() {
				@Override
				public List<ClienteFactura> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<ClienteFactura> lista = new ArrayList<ClienteFactura>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						ClienteFactura clienteFactura = new ClienteFactura();
						clienteFactura.setChrEmail(rs.getString("CHREMAIL"));
						clienteFactura.setChrTratamiento(rs.getString("CHRTRATAMIENTO"));
						clienteFactura.setNumCodigoCliente(rs.getInt("NUMCODIGOCLIENTE"));
						clienteFactura.setNumCodigoCotizacionOnline(rs.getInt("NUMCODIGOCOTIZACIONONLINE"));
						clienteFactura.setVchApellido(rs.getString("APELLIDO"));
						clienteFactura.setVchDepartamento(rs.getString("VCHDESCRIPCION_DEPARTAMENTO"));
						clienteFactura.setVchDistrito(rs.getString("VCHDESCRIPCION_DISTRITO"));
						clienteFactura.setVchDocumento(rs.getString("VCHDOCUMENTO"));
						clienteFactura.setVchNombreCompleto(rs.getString("VCHNOMBRECOMPLETO"));
						clienteFactura.setVchProvincia(rs.getString("VCHDESCRIPCION_PROVINCIA"));
						clienteFactura.setVchrDireccion(rs.getString("VCHDIRECCION"));
						clienteFactura.setVchNombre(rs.getString("VCHNOMBRE"));
						clienteFactura.setNumTipoCliente(rs.getInt("NUMTIPOCLIENTE"));
						clienteFactura.setStatusIziPay(StatusIziPay.valueOf(rs.getString("VCHSTATUS")));
						clienteFactura.setMetodoEnvio(rs.getInt("NUMTIPOMETODOENVIO") == 1 ? MetodoEnvio.EnvioRegular
								: MetodoEnvio.RecojoAlmacen);
						clienteFactura.setFechaEmision(rs.getDate("DTEEMISION"));
						clienteFactura.setFechaCreacion(rs.getDate("DTECREACION"));
						clienteFactura.setFechaEstimada(rs.getDate("DTEESTIMADA"));
						clienteFactura.setVchrDireccionDireccion(rs.getString("D_VCHDIRECCION"));
						clienteFactura.setVchNombreDireccion(rs.getString("D_VCHNOMBRE"));
						clienteFactura.setVchApellidoDireccion(rs.getString("D_VCHAPELLIDO"));
						clienteFactura.setSubTotal(rs.getDouble("SUBTOTAL"));
						clienteFactura.setTotal(rs.getDouble("TOTAL"));
						clienteFactura.setCostoEnvio(rs.getDouble("NUMTOTALENVIODOL"));
						clienteFactura.setVchDocumentoDireccion(rs.getString("D_VCHDOCUMENTO"));
						clienteFactura
								.setEstadoCotizacion(EstadoCotizacion.valueOf(rs.getString("CHRESTADO_COTIZACION")));
						clienteFactura.setStatusAction(rs.getString("VCHSTATUSACTION"));
						clienteFactura.setMoneda((rs.getInt("NUMCODMONORIGEN") == 1 ? Moneda.DOLARES : Moneda.SOLES));
						lista.add(clienteFactura);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBT_COTIZACION_FACTURACION()}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public void registrarDatosPayment(CreatePaymentRequest createPaymentRequest) throws Exception {
		CallableStatementCallback<CreatePaymentRequest> callback = null;
		try {
			callback = new CallableStatementCallback<CreatePaymentRequest>() {
				@Override
				public CreatePaymentRequest doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setInt(1, createPaymentRequest.getNumCodigoCotizacionOnline());
					cs.setInt(2, createPaymentRequest.getNumCodigoDireccion());
					cs.setString(3, createPaymentRequest.getVchObservacion());
					cs.setString(4, createPaymentRequest.getMoneda().getNumCodigoMoneda());
					cs.execute();
					return createPaymentRequest;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_DATOS_PAYMENT(?,?,?,?)";
		jdbcTemplate.execute(sql, callback);

	}

	@Override
	public ScheduledProceso scheduledProceso(ScheduledProceso scheduledProceso) throws Exception {
		CallableStatementCallback<ScheduledProceso> callback = null;
		try {
			callback = new CallableStatementCallback<ScheduledProceso>() {
				@Override
				public ScheduledProceso doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					logger.info(scheduledProceso.toString());					
					
					logger.info("CONFIRMAR_SCHEDULED [numCodigoCotizacionOnline:" + scheduledProceso.getNumCodigoCotizacionOnline()
							+ " estadoCotizacion:" + scheduledProceso.getEstadoCotizacion().toString()
							+ " estadoCotizacion:" + scheduledProceso.getStatusAction() + " status:"
							+ scheduledProceso.getStatus() + " proceso:" + scheduledProceso.getProceso() + " totalLetras:"
							+ scheduledProceso.getTotalLetras()+"]");
					
					
					
					cs.setInt(1, scheduledProceso.getNumCodigoCotizacionOnline());
					cs.setString(2, scheduledProceso.getEstadoCotizacion().toString());
					cs.setString(3, scheduledProceso.getStatusAction());
					cs.setString(4, scheduledProceso.getStatus());
					cs.setString(5, scheduledProceso.getProceso());
					cs.setString(6, scheduledProceso.getTotalLetras());
					cs.registerOutParameter(7, OracleTypes.VARCHAR);
					cs.registerOutParameter(8, OracleTypes.VARCHAR);
					cs.registerOutParameter(9, OracleTypes.VARCHAR);
					cs.registerOutParameter(10, OracleTypes.VARCHAR);
					cs.registerOutParameter(11, OracleTypes.NUMBER);
					cs.registerOutParameter(12, OracleTypes.VARCHAR);
					cs.registerOutParameter(13, OracleTypes.NUMBER);
					cs.execute();
					scheduledProceso.setStatusBD(cs.getString(7));
					scheduledProceso.setNumFacturas(cs.getString(8).trim());
					scheduledProceso.setNumCodigoOrigenFactura(cs.getInt(9));
					scheduledProceso.setChrCodigoOc(cs.getString(10).trim());
					scheduledProceso.setNumTipoCambio(cs.getBigDecimal(11));
					scheduledProceso.setDteTomado((cs.getString(12)==null?"":cs.getString(12)));
					scheduledProceso.setIcbFec((cs.getBigDecimal(13)==null?new BigDecimal("0.00"):cs.getBigDecimal(13)));
					return scheduledProceso;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".CONFIRMAR_SCHEDULED(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<TusCompras> obtenerTusCotizacion(CotizacionOnline cotizacionOnline) throws Exception {
		CallableStatementCallback<List<TusCompras>> callback = null;
		try {
			callback = new CallableStatementCallback<List<TusCompras>>() {
				@Override
				public List<TusCompras> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<TusCompras> lista = new ArrayList<TusCompras>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, cotizacionOnline.getNumCodigoCliente());
					cs.setInt(3, cotizacionOnline.getNumCodigoClienteUsuario());
					cs.setInt(4, cotizacionOnline.getCurrentPage());
					cs.setInt(5, cotizacionOnline.getLimit());
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd   MMMMM 'de' yyyy");
					while (rs.next()) {
						TusCompras compras = new TusCompras();
						compras.setChrRegLegacyTransId(rs.getString("CHRREFLEGACY_TRANSID"));
						compras.setCondicion(rs.getString("CONDICION"));
						compras.setCostoFlete(rs.getDouble("COSTO_FLETE"));
						compras.setCostoTotal(rs.getDouble("COSTO_TOTAL"));
						compras.setDteCreacion(simpleDateFormat.format(rs.getTimestamp("DTECREACION")));
						compras.setEstado(rs.getString("ESTADO"));
						compras.setMoneda((rs.getInt("NUMCODMONORIGEN") == 1 ? Moneda.DOLARES : Moneda.SOLES));
						compras.setNumCodigoCliente(rs.getInt("NUMCODIGOCLIENTE"));
						compras.setNumCodigoCotizacionOnline(rs.getInt("NUMCODIGOCOTIZACIONONLINE"));
						compras.setMetodoEnvio(rs.getInt("NUMTIPOMETODOENVIO") == 1 ? MetodoEnvio.EnvioRegular
								: MetodoEnvio.RecojoAlmacen);
						compras.setNumFacturas(rs.getString("NUMFACTURAS"));
						compras.setTotalRecords(rs.getInt("TOTALRECORDS"));
						lista.add(compras);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBT_TUS_COMPRAS(?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<CotizacionOnlineDetalle> obtenerTusCotizacionDetalle(CotizacionOnline cotizacionOnlineRequets)
			throws Exception {
		CallableStatementCallback<List<CotizacionOnlineDetalle>> callback = null;
		try {
			callback = new CallableStatementCallback<List<CotizacionOnlineDetalle>>() {
				@Override
				public List<CotizacionOnlineDetalle> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<CotizacionOnlineDetalle> lista = new ArrayList<CotizacionOnlineDetalle>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, cotizacionOnlineRequets.getNumCodigoCotizacionOnline());
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					DecimalFormat formatter = new DecimalFormat("###,###.00");
					while (rs.next()) {
						CotizacionOnlineDetalle cotizacionOnlineDetalle = new CotizacionOnlineDetalle();
						Producto producto = new Producto();
						producto.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						producto.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						cotizacionOnlineDetalle.setProducto(producto);
						cotizacionOnlineDetalle.setNumCantidad(rs.getInt("NUMCANTIDAD"));
						cotizacionOnlineDetalle.setNumTotalDisplay(formatter.format(rs.getBigDecimal("NUMTOTALDISPLAY").setScale(2, RoundingMode.HALF_UP)));
						lista.add(cotizacionOnlineDetalle);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".LISTA_PROD_DETA(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<ReporteCotizacion> obtenerReporteCotizacion(ReporteRequest reporteRequest) throws Exception {
		CallableStatementCallback<List<ReporteCotizacion>> callback = null;
		SimpleDateFormat dmy=new SimpleDateFormat("dd/MM/yyyy");
		try {
			callback = new CallableStatementCallback<List<ReporteCotizacion>>() {
				@Override
				public List<ReporteCotizacion> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<ReporteCotizacion> lista = new ArrayList<ReporteCotizacion>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, dmy.format(reporteRequest.getDteInicio())+ " 00:00");
					cs.setString(3, dmy.format(reporteRequest.getDteFinal())+ " 23:59");
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						ReporteCotizacion reporteCotizacion = new ReporteCotizacion();
						reporteCotizacion.setNombreCliente(rs.getString("NOMBRECLIENTE"));
						reporteCotizacion.setChrCodigoCotizacion(rs.getString("CHRCODIGOCOTIZACION"));
						reporteCotizacion.setChrEmail(rs.getString("CHREMAIL"));
						reporteCotizacion.setChrEstadoCotizacion(rs.getString("CHRESTADO_COTIZACION"));						 
						reporteCotizacion.setDescripcion(rs.getString("DESCRIPCION"));
						reporteCotizacion.setDteActualizacion(rs.getString("DTEACTUALIZACION"));
						reporteCotizacion.setDteCreacion(rs.getString("DTECREACION"));
						reporteCotizacion.setDteEnvio(rs.getString("DTEENVIO"));
						reporteCotizacion.setNumCodigoCotizacionOnline(rs.getInt("NUMCODIGOCOTIZACIONONLINE"));
						reporteCotizacion.setNumFacturas(rs.getString("NUMFACTURAS"));
						reporteCotizacion.setVchStatus(rs.getString("VCHSTATUS"));
						reporteCotizacion.setVchStatusAction(rs.getString("VCHSTATUSACTION"));
						reporteCotizacion.setChrReflegacyTransid(rs.getString("CHRREFLEGACY_TRANSID"));
						
						reporteCotizacion.setNumCodigoCotizacion(rs.getString("NUMCODIGOCOTIZACION"));
						reporteCotizacion.setChrCodigoGuia(rs.getString("CHRCODIGOGUIA"));
						reporteCotizacion.setChrCodigoOc(rs.getString("CHRCODIGOOC"));
						reporteCotizacion.setNumCodigoGuia(rs.getString("NUMCODIGOGUIA"));
						reporteCotizacion.setChrCodigoOcOnline(rs.getString("CHRCODIGOOC_ONLINE"));
						reporteCotizacion.setOcPendiente(rs.getInt("OCPENDIENTE"));
						lista.add(reporteCotizacion);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBT_REPORTE_COTIZACION(?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}
}

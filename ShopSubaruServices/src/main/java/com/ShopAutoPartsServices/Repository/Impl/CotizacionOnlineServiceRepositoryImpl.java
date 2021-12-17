package com.ShopAutoPartsServices.Repository.Impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Clob;
import java.sql.ResultSet;
import java.sql.SQLException;
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

import com.ShopAutoPartsServices.Domain.Cliente;
import com.ShopAutoPartsServices.Domain.ClienteFactura;
import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.CotizacionOnline;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineActiva;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineDetalle;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineResumen;
import com.ShopAutoPartsServices.Domain.Familia;
import com.ShopAutoPartsServices.Domain.MetodoEnvioRequets;
import com.ShopAutoPartsServices.Domain.Producto;
import com.ShopAutoPartsServices.Domain.ReporteCotizacion;
import com.ShopAutoPartsServices.Domain.ReporteRequest;
import com.ShopAutoPartsServices.Domain.TipoCambio;
import com.ShopAutoPartsServices.Domain.TusCompras;
import com.ShopAutoPartsServices.Domain.Ubigeo;
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
import com.ShopAutoPartsServices.WsServices.IpnController;

import oracle.jdbc.OracleTypes;
import oracle.sql.CLOB;

@Repository
public class CotizacionOnlineServiceRepositoryImpl implements CotizacionOnlineServiceRepository {
	Logger logger = LoggerFactory.getLogger(CotizacionOnlineServiceRepositoryImpl.class);
	final private String PKG_TIENDA = "PKG_TIENDA";
	@Autowired
	JdbcTemplate jdbcTemplate;
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
					cs.execute();
					cotizacionOnlineDetalle.setNumcodCotizacionOnlinedet(cs.getInt(1));
					return cotizacionOnlineDetalle;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_COTIZACION_DET(?,?,?,?,?,?)";
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
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						CotizacionOnlineDetalle obj = new CotizacionOnlineDetalle();
						Producto p = new Producto();
						p.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						p.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						p.setNumStock(rs.getInt("NUMSTOCK"));
						p.setNumOutlet(rs.getInt("NUMOUTLET"));
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
						obj.setNumIgvDol(rs.getBigDecimal("NUMIGVDOL").setScale(2, RoundingMode.HALF_UP));
						obj.setNumIgvSol(rs.getBigDecimal("NUMIGVSOL").setScale(2, RoundingMode.HALF_UP));
						obj.setNumPrecioUnitarioDol(
								rs.getBigDecimal("NUMPRECIOUNITARIODOL").setScale(2, RoundingMode.HALF_UP));
						obj.setNumPrecioUnitarioSol(
								rs.getBigDecimal("NUMPRECIOUNITARIOSOL").setScale(2, RoundingMode.HALF_UP));
						obj.setNumSubTotalDol(rs.getBigDecimal("NUMSUBTOTALDOL").setScale(2, RoundingMode.HALF_UP));
						obj.setNumSubTotalSol(rs.getBigDecimal("NUMSUBTOTALSOL").setScale(2, RoundingMode.HALF_UP));
						obj.setNumTotalDol(rs.getBigDecimal("NUMTOTALDOL").setScale(2, RoundingMode.HALF_UP));
						obj.setNumTotalSol(rs.getBigDecimal("NUMTOTALSOL").setScale(2, RoundingMode.HALF_UP));

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
					while (rs.next()) {
						onlineResumen.setTotalRegistros(rs.getInt("TOTALREGISTROS"));

						onlineResumen.setNumEnvioSol(rs.getString("NUMMETODOENVIOSOL") == null ? "00.00"
								: rs.getString("NUMMETODOENVIOSOL"));

						onlineResumen.setNumSubTotalSol(
								rs.getString("NUMSUBTOTALSOL") == null ? "00.00" : rs.getString("NUMSUBTOTALSOL"));

						onlineResumen
								.setNumIgvSol(rs.getString("NUMIGVSOL") == null ? "00.00" : rs.getString("NUMIGVSOL"));

						onlineResumen.setNumTotalSol(
								rs.getString("NUMTOTALSOL") == null ? "00.00" : rs.getString("NUMTOTALSOL"));

						onlineResumen.setNumEnvioDol(rs.getString("NUMMETODOENVIODOL") == null ? "00.00"
								: rs.getString("NUMMETODOENVIODOL"));

						onlineResumen.setNumSubTotalDol(
								rs.getString("NUMSUBTOTALDOL") == null ? "00.00" : rs.getString("NUMSUBTOTALDOL"));

						onlineResumen
								.setNumIgvDol(rs.getString("NUMIGVDOL") == null ? "00.00" : rs.getString("NUMIGVDOL"));

						onlineResumen.setNumTotalDol(
								rs.getString("NUMTOTALDOL") == null ? "00.00" : rs.getString("NUMTOTALDOL"));
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
					//cs.setString(3, metodoEnvioRequets.getMetodoEnvio().toString());
					cs.registerOutParameter(3, OracleTypes.VARCHAR);
					cs.registerOutParameter(4, OracleTypes.VARCHAR);
					cs.registerOutParameter(5, OracleTypes.VARCHAR);
					cs.execute();
					metodoEnvioRequets.setMensaje(cs.getString(3));
					metodoEnvioRequets.setStatus(Status.valueOf(cs.getString(4)));
					metodoEnvioRequets.setMetodoEnvio(MetodoEnvio.valueOf(cs.getString(5)));
					return metodoEnvioRequets;
				}
			};
		} catch (Exception e) {
			
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_COTIZACION_DET_TRANS(?,?,?,?,?)";
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
					scheduledProceso.setIcbFec(cs.getBigDecimal(13));
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
						lista.add(compras);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_TIENDA + ".OBT_TUS_COMPRAS(?,?)}";
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
					while (rs.next()) {
						CotizacionOnlineDetalle cotizacionOnlineDetalle = new CotizacionOnlineDetalle();
						Producto producto = new Producto();
						producto.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						producto.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						cotizacionOnlineDetalle.setProducto(producto);
						cotizacionOnlineDetalle.setNumCantidad(rs.getInt("NUMCANTIDAD"));
						cotizacionOnlineDetalle.setNumTotalDisplay(
								rs.getBigDecimal("NUMTOTALDISPLAY").setScale(2, RoundingMode.HALF_UP));
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

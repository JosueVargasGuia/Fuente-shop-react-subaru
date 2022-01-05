package com.ShopAutoPartsServices.Repository.Impl;

import java.io.File;
import java.io.InputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ShopAutoPartsServices.Domain.ReportePdfRequets;
import com.ShopAutoPartsServices.Domain.IziPay.ScheduledProceso;
import com.ShopAutoPartsServices.FE.Constantes;
import com.ShopAutoPartsServices.FE.UtilString;
import com.ShopAutoPartsServices.FE.Beans.BeanEmpresa;
import com.ShopAutoPartsServices.FE.Beans.BeanFacturacion;
import com.ShopAutoPartsServices.Repository.FacturacionRepository;
import com.ShopAutoPartsServices.WsServices.IpnController;

import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;
import oracle.jdbc.OracleTypes;

@Repository
public class FacturacionRepositoryImpl implements FacturacionRepository {
	final private String PKG_EMPRESA = "PKG_EMPRESA";
	final private String PKG_METODOS = "PKG_METODOS";
	final private String PKG_FACTURACION = "PKG_FACTURACION";
	Logger logger = LoggerFactory.getLogger(FacturacionRepositoryImpl.class);
	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public BeanFacturacion ObtenerFacturaElectronicaCabecera(BeanFacturacion bean,
			ScheduledProceso scheduledProcesoStatus) throws Exception {
		BeanFacturacion facturaCabecera = null;
		Connection cnx = jdbcTemplate.getDataSource().getConnection();
		CallableStatement cstmt = null;
		ResultSet rs = null;
		cnx.setAutoCommit(false);
		try {
			Statement stat = cnx.createStatement();
			stat.execute("alter session set NLS_DATE_FORMAT='DD/MM/YY'");
			if (bean.getCodigo().substring(0, 2).matches("FC|BC")) {
				cstmt = cnx.prepareCall("{? =call " + PKG_FACTURACION + "."
						+ Constantes.LISTAR_FACTURACION_ELECTRONICA_CABECERA_NC + "}");
				cstmt.registerOutParameter(1, OracleTypes.CURSOR);
				cstmt.setString(2, bean.getCodigo());
				cstmt.executeQuery();
				rs = (ResultSet) cstmt.getObject(1);

				while (rs.next()) {
					facturaCabecera = new BeanFacturacion();
					// referencia fisica de la factura relacionada
					facturaCabecera.setCodigo(UtilString.defineString(rs.getString(2)));
					facturaCabecera.setNroOS(UtilString.defineString(rs.getString(1)));
					facturaCabecera.setNroFactura(bean.getCodigo());
					facturaCabecera.setRelacionFactura(obtenerDocumentoXNC(bean.getCodigo()));
					facturaCabecera.setFecCreacion(UtilString.defineString(rs.getString(3)));
					facturaCabecera.setMontoLetras(UtilString.defineString(rs.getString(4)));
					facturaCabecera
							.setTipoCambio(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(5))));
					facturaCabecera.setNombreTecnico(UtilString.defineString(rs.getString(6)));
					facturaCabecera.setKilometraje(UtilString.defineString(rs.getString(7)));
					facturaCabecera.setNomCliente(UtilString.defineString(rs.getString(10)));
					facturaCabecera.setDireccion(UtilString.defineString(rs.getString(11)));
					facturaCabecera.setDocumentoReceptorElectronico(UtilString.defineString(rs.getString(12)));
					facturaCabecera.setTelefonos(UtilString.defineString(rs.getString(14)));
					facturaCabecera.setPlaca(UtilString.defineString(rs.getString(15)));
					facturaCabecera.setVehiculo(UtilString.defineString(rs.getString(17)));
					facturaCabecera.setAnio(UtilString.defineString(rs.getString(19)));
					facturaCabecera.setColor(UtilString.defineString(rs.getString(20)));
					facturaCabecera.setVin(UtilString.defineString(rs.getString(21)));
					facturaCabecera.setMotor(UtilString.defineString(rs.getString(22)));
					facturaCabecera
							.setMontoNeto(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(24))));
					facturaCabecera
							.setMontoImpuesto(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(25))));
					facturaCabecera
							.setTotalFinal(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(26))));
					facturaCabecera.setObservacion(UtilString.defineString(""));
					facturaCabecera.setFacturaTexto1(UtilString.defineString(""));
					facturaCabecera.setFacturaTexto2(UtilString.defineString(""));
					facturaCabecera.setAsegurado(UtilString.defineString(""));
					facturaCabecera.setSubTotal(UtilString.defineString("0.00"));
					facturaCabecera.setSustentoNotaCredito(UtilString.defineString(rs.getString(30)));
					facturaCabecera.setTipoNotaCredito(UtilString.defineString(rs.getString(31)));
					facturaCabecera.setFecPago("Lima.....de...............20....");
					facturaCabecera.setTipoFacturaElectronica(UtilString.defineString(rs.getString(32)));
					facturaCabecera.setTipoDocumentoReceptorElectronico(UtilString.defineString(rs.getString(33)));
					facturaCabecera.setSerie(UtilString.defineString(rs.getString(34)));
					facturaCabecera.setTipoDocumento(UtilString.defineString(rs.getString(35)));
					facturaCabecera.setCorrelativoFacturaElectronica(rs.getString(36));
					facturaCabecera.setRazonSocial(UtilString.defineString(rs.getString(37)));
					facturaCabecera.setTelefonoFax(UtilString.defineString(rs.getString(38)));
					facturaCabecera.setEmailEmpresa(UtilString.defineString(rs.getString(39)));
					facturaCabecera.setDireccionSucursal(UtilString.defineString(rs.getString(40)));
					facturaCabecera.setTelefonoSucursal(UtilString.defineString(rs.getString(41)));
					facturaCabecera
							.setFactDctos(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(42))));
					facturaCabecera
							.setFranquicia(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(43))));
					facturaCabecera
							.setSubTotal(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(44))));
					facturaCabecera.setCodigoOrigenFactura(rs.getInt(45));
					facturaCabecera.setIgvDecimal(rs.getDouble(46));
					facturaCabecera.setIgvEnteroDecimal(rs.getDouble(47));
					facturaCabecera.setFechaRelacionFactura(UtilString.defineString(rs.getString(48)));
					facturaCabecera.setCodSucursalAnexo(rs.getString(49));
					facturaCabecera.setIcb(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(50))));
					facturaCabecera
							.setImpuestoIcb(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(51))));
					facturaCabecera.setClienteEmail(UtilString.defineString(rs.getString(52)));
					// SUNAT CUOTAS
					facturaCabecera.setTipoPago_relacionDoc(UtilString.defineString(rs.getString("FACDCTOS_TIPOPAGO"))); // --
																															// TIPO
																															// DE
																															// PAGO
																															// DOC
																															// RELACIONADO
																															// :
																															// C=Contado,
																															// P
																															// =
																															// Credito
					facturaCabecera.setPendiente(Constantes.formatDecimalDecimales(rs.getDouble("SALDOPENDIENTE"))); // --
																														// MONTO
																														// PENDIENTE
																														// DE
																														// PAGO
					facturaCabecera.setNroCuotas(rs.getString("NROCUOTAS")); // -- NRO DE CUOTAS
					facturaCabecera.setFecVenceCuota(rs.getString("FEC_VENCE_CUOTA")); // -- FECHA DE VENICIMIENTO DE
																						// CUOTAS
					facturaCabecera.setTextoFormaPago(rs.getString("TEXTO_FORMAPAGO"));
				}
			} else {

				if (bean.getCodigoOrigenFactura() == 2 || bean.getCodigoOrigenFactura() == 5) {
					cstmt = cnx.prepareCall("{call " + PKG_METODOS + "." + Constantes.SET_HEADER_FACTURANV + "}");
					cstmt.setString(1, bean.getCodigo());
					cstmt.execute();
				} else {
					cstmt = cnx.prepareCall("{call " + PKG_METODOS + "." + Constantes.SET_HEADER_FACTURAOS + "}");
					cstmt.setString(1, bean.getCodigo());
					cstmt.execute();
				}

				cstmt = cnx.prepareCall("{? = call " + PKG_FACTURACION + "."
						+ Constantes.LISTAR_FACTURACION_ELECTRONICA_CABECERA + "}");
				cstmt.setFetchSize(100);
				cstmt.registerOutParameter(1, OracleTypes.CURSOR);
				cstmt.executeQuery();
				rs = (ResultSet) cstmt.getObject(1);

				while (rs.next()) {
					facturaCabecera = new BeanFacturacion();
					facturaCabecera.setNomCliente(UtilString.defineString(rs.getString(1)));
					facturaCabecera.setDocumento(UtilString.defineString(rs.getString(2)));
					facturaCabecera.setDireccion(UtilString.defineString(rs.getString(3)));
					facturaCabecera.setTelefonos(UtilString.defineString(rs.getString(4)));
					facturaCabecera.setNombreTecnico(UtilString.defineString(rs.getString(6)));
					facturaCabecera.setPlaca(UtilString.defineString(rs.getString(7)));
					facturaCabecera.setVehiculo(UtilString.defineString(rs.getString(8)));
					facturaCabecera.setVin(UtilString.defineString(rs.getString(9)));
					facturaCabecera.setMotor(UtilString.defineString(rs.getString(10)));
					facturaCabecera.setColor(UtilString.defineString(rs.getString(11)));
					facturaCabecera.setAnio(UtilString.defineString(rs.getString(12)));
					facturaCabecera.setKilometraje(UtilString.defineString(rs.getString(14)));
					facturaCabecera.setNroOS(UtilString.defineString(rs.getString(16)));
					facturaCabecera.setNroFactura(UtilString.defineString(rs.getString(17)));
					facturaCabecera.setFecCreacion(UtilString.defineString(rs.getString(18)));
					facturaCabecera.setTipoDocumento(UtilString.defineString(rs.getString(19)));
					facturaCabecera.setObservacion(UtilString.defineString(rs.getString(20)));
					facturaCabecera.setMontoLetras(UtilString.defineString(rs.getString(21)));
					facturaCabecera.setAsegurado(UtilString.defineString(rs.getString(23)));
					facturaCabecera
							.setTipoCambio(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(24))));
					facturaCabecera.setFecPago(UtilString.defineString(rs.getString(25)));
					facturaCabecera.setFacturaTexto1(UtilString.defineString(rs.getString(26)));
					facturaCabecera
							.setMontoNeto(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(27))));
					facturaCabecera
							.setFranquicia(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(29))));
					facturaCabecera
							.setFactDctos(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(31))));
					facturaCabecera.setIgv(UtilString.defineString(rs.getString(35)));
					facturaCabecera
							.setSubTotal(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(36))));
					facturaCabecera
							.setMontoImpuesto(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(37))));
					facturaCabecera
							.setTotalFinal(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(38))));
					facturaCabecera.setFacturaTexto2(UtilString.defineString(rs.getString(39)));

					facturaCabecera.setTipoCambioContableVenta(Double.parseDouble(
							(rs.getString(41) == null ? scheduledProcesoStatus.getNumTipoCambio().doubleValue() + ""
									: rs.getString(41) + "")));// error NUMTIPOCAMBIOCONTVENTA NUMTIPOCAMBIO

					facturaCabecera.setTipoFacturaElectronica(UtilString.defineString(rs.getString(42)));
					facturaCabecera.setTipoDocumentoReceptorElectronico(UtilString.defineString(rs.getString(43)));
					facturaCabecera.setSerie(UtilString.defineString(rs.getString(44)));
					facturaCabecera.setDocumentoReceptorElectronico(UtilString.defineString(rs.getString(45)));
					facturaCabecera.setSustentoNotaCredito(UtilString.defineString(rs.getString(46)));
					facturaCabecera.setTipoNotaCredito(UtilString.defineString(rs.getString(47)));
					facturaCabecera.setCorrelativoFacturaElectronica(UtilString.defineString(rs.getString(48)));
					facturaCabecera.setActualIgv(rs.getDouble(49));
					facturaCabecera.setCodigoOrigenFactura(rs.getInt(50));
					facturaCabecera.setRelacionFactura(UtilString.defineString(rs.getString(51)));
					facturaCabecera.setDetraccion(UtilString.defineString(rs.getString(52)));
					facturaCabecera.setRazonSocial(UtilString.defineString(rs.getString(53)));
					facturaCabecera.setTelefonoFax(UtilString.defineString(rs.getString(54)));
					facturaCabecera.setEmailEmpresa(UtilString.defineString(rs.getString(55)));
					facturaCabecera.setDireccionSucursal(UtilString.defineString(rs.getString(56)));
					facturaCabecera.setTelefonoSucursal(UtilString.defineString(rs.getString(57)));
					facturaCabecera.setIgvDecimal(rs.getDouble(58));
					facturaCabecera.setIgvEnteroDecimal(rs.getDouble(59));
					facturaCabecera.setCodSucursalAnexo(rs.getString(60));
					facturaCabecera.setIcb(Constantes.formatDecimalDecimales(Double.parseDouble(rs.getString(61))));
					facturaCabecera.setImpuestoIcb(Constantes.formatDecimalDecimales(Double.parseDouble(
							(rs.getString(62) == null ? scheduledProcesoStatus.getIcbFec().doubleValue() + ""
									: rs.getString(62)))));
					facturaCabecera.setClienteEmail(UtilString.defineString(rs.getString("CLIEMAIL")));
					// SUNAT CUOTAS
					facturaCabecera.setTipoPago(UtilString.defineString(rs.getString("TIPPAGO"))); // -- TIPO DE PAGO :
																									// C=Contado, P =
																									// Credito
					facturaCabecera.setPendiente(Constantes.formatDecimalDecimales(rs.getDouble("SALDOPENDIENTE"))); // --
																														// MONTO
																														// PENDIENTE
																														// DE
																														// PAGO
					facturaCabecera.setNroCuotas(rs.getString("NROCUOTAS")); // -- NRO DE CUOTAS
					facturaCabecera.setFecVenceCuota(rs.getString("FEC_VENCE_CUOTA")); // -- FECHA DE VENICIMIENTO DE
																						// CUOTAS
					// 27/10/2021 Se agrega texto sobre la forma de pago
					facturaCabecera.setTextoFormaPago(rs.getString("TEXTO_FORMAPAGO"));
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			cnx.commit();
			cstmt.close();
			rs.close();
			cnx.close();

		}
		return facturaCabecera;

	}

	public String obtenerDocumentoXNC(String notaCredito) {

		CallableStatementCallback<String> callback = new CallableStatementCallback<String>() {
			@Override
			public String doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
				cs.registerOutParameter(1, OracleTypes.VARCHAR);
				cs.setString(2, notaCredito.trim());
				cs.execute();
				return cs.getString(1);
			}
		};
		String sql = "{call " + PKG_FACTURACION + ".OBT_DOCUMENTO_X_NC(?,?)}";
		return jdbcTemplate.execute(sql, callback);
		/*
		 * cstmt = cnx.prepareCall("{? = " + Constantes.OBTENER_DOCUMENTO_X_NC + "}");
		 * cstmt.registerOutParameter(1, OracleTypes.VARCHAR); cstmt.setString(2,
		 * notaCredito.trim()); cstmt.execute(); documento = cstmt.getString(1);
		 */
	}

	@Override
	public ArrayList<BeanFacturacion> ListarFacturaElectronicaDetalle(BeanFacturacion bean) throws Exception {
		ArrayList<BeanFacturacion> lista = new ArrayList<BeanFacturacion>();
		BeanFacturacion facturaDetalle = null;
		Connection cnx = jdbcTemplate.getDataSource().getConnection();
		CallableStatement cstmt = null;

		ResultSet rs = null;
		cnx.setAutoCommit(false);
		try {
			if (bean.getCodigo().substring(0, 2).matches("FC|BC")) {
				// Temporal.populateTempTableNC(cnx, bean);
			} else {
				if (bean.getCodigoOrigenFactura() == 2 || bean.getCodigoOrigenFactura() == 5) {
					cstmt = cnx.prepareCall("{ call " + PKG_METODOS + "." + Constantes.SET_BODY_FACTURANV + "}");
					cstmt.setString(1, bean.getCodigo());
					cstmt.execute();
				} else if (bean.getCodigoOrigenFactura() == 6) {
					cstmt = cnx.prepareCall("{ call " + PKG_METODOS + "." + Constantes.SET_BODY_FACTURAPSSALES + "}");
					cstmt.setString(1, bean.getCodigo());
					cstmt.execute();
				} else {
					cstmt = cnx.prepareCall("{ call " + PKG_METODOS + "." + Constantes.SET_BODY_FACTURAOS + "}");
					cstmt.setString(1, bean.getCodigo());
					cstmt.execute();
				}
			}
			cstmt = cnx.prepareCall(
					"{? = call " + PKG_FACTURACION + "." + Constantes.LISTAR_FACTURACION_ELECTRONICA_DETALLE + "}");
			cstmt.registerOutParameter(1, OracleTypes.CURSOR);
			cstmt.executeQuery();
			rs = (ResultSet) cstmt.getObject(1);

			while (rs.next()) {
				facturaDetalle = new BeanFacturacion();
				facturaDetalle.setItemCodigo(UtilString.defineString(rs.getString(1)));//
				facturaDetalle.setItemCodigoOperacionMaestro(UtilString.defineString(rs.getString(2)));
				facturaDetalle.setItemDescripcion(UtilString.defineString(rs.getString(3)));//
				facturaDetalle.setCantidadFE(rs.getDouble(5));//
				facturaDetalle.setItemPrecio(rs.getDouble(6));//
				facturaDetalle.setItemDescuento(rs.getDouble(7));//
				facturaDetalle.setItemImporteTotal(rs.getDouble(8));//
				facturaDetalle.setTipoDocumento(UtilString.defineString(rs.getString(9)));
				facturaDetalle.setCorrelativo(UtilString.defineString(rs.getString(11)));//
				facturaDetalle.setImpuestoIgv(rs.getDouble(12));
				facturaDetalle.setItemPrecioIgv(rs.getDouble(13));
				facturaDetalle.setItemCodigoOperacionServicio(UtilString.defineString(rs.getString(14)));
				facturaDetalle.setUnidadMedidaElectronica(UtilString.defineString(rs.getString(15)));
				facturaDetalle.setCodUNSPC(rs.getString(16));
				facturaDetalle.setItemIcb(rs.getBigDecimal(17));
				// ACtualizar
				facturaDetalle.setHorasHombre(rs.getString("HH"));
				facturaDetalle.setCostoHH(rs.getString("COSTO_HH"));
				lista.add(facturaDetalle);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			cnx.commit();
			cstmt.close();
			rs.close();
			cnx.close();

		}
		return lista;

	}

	@Override
	public BeanEmpresa obtenerEmpresa(int numCodigoEmpre) throws Exception {
		CallableStatementCallback<BeanEmpresa> callback = null;
		try {
			callback = new CallableStatementCallback<BeanEmpresa>() {
				@Override
				public BeanEmpresa doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					BeanEmpresa empresa = new BeanEmpresa();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, numCodigoEmpre);
					cs.execute();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						empresa = new BeanEmpresa();
						empresa.setCodigo(rs.getInt(1));
						empresa.setNombreComercial(rs.getString(2));
						empresa.setDireccion(rs.getString(3));
						empresa.setUbigeo(rs.getString(4));
						empresa.setRuc(rs.getString(5));
						empresa.setNombre(rs.getString(8));
						empresa.setRutaImpresora(rs.getString(9));
						empresa.setDetraccion(rs.getString(10));
						empresa.setCuentaDetraccion(rs.getString(11));
						empresa.setTelefono(rs.getString(12));
					}
					return empresa;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{? =call " + PKG_EMPRESA + ".OBTENER_EMPRESA(?)}";
		return jdbcTemplate.execute(sql, callback);

	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	public File obtenerFileReporteOc(ScheduledProceso scheduledProceso) throws Exception {
		Connection connection = jdbcTemplate.getDataSource().getConnection();
		try {

			String fileName = "OrdenCompra_" + scheduledProceso.getChrCodigoOc();
			String fileNameRoot = System.getProperty("java.io.tmpdir") + "/" + fileName + ".xls";
			String rptFileName = "reporteOC_Autorex.jasper";

			@SuppressWarnings("rawtypes")
			HashMap parametros = new HashMap();
			parametros.put("p_nrooc", scheduledProceso.getChrCodigoOc().trim());
			parametros.put("REPORT_LOCALE", new Locale("en", "US"));
			logger.info(fileNameRoot);
			InputStream inputStream = (InputStream) this.getClass().getResourceAsStream("/" + rptFileName);
			JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, parametros, connection);
			JRXlsExporter exporter = new JRXlsExporter();
			exporter.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
			exporter.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
			exporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.TRUE);
			exporter.setParameter(JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
			exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
			exporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, fileNameRoot);
			// exportar Excel
			exporter.exportReport();

			// -- Se crea el archivo en esta ruta
			File file = new File(fileNameRoot);
			connection.close();
			return file;
		} catch (Exception e) {
			// TODO: handle exception
			connection.close();
			e.printStackTrace();
			return null;
		}

	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	public File obtenerFileReporteOcVarios(ScheduledProceso scheduledProceso) throws Exception {
		Connection connection = jdbcTemplate.getDataSource().getConnection();
		try {

			String fileName = "OrdenCompra_" + scheduledProceso.getFechaIni().replaceAll("/", "") + "_"
					+ scheduledProceso.getFechaFin().replaceAll("/", "");
			String fileNameRoot = System.getProperty("java.io.tmpdir") + "/" + fileName + ".xls";
			logger.info("RUta:" + fileNameRoot);
			String rptFileName = "rpt_oc_varios.jasper";
			File file = new File(fileNameRoot);

			@SuppressWarnings("rawtypes")
			HashMap parametros = new HashMap();
			parametros.put("p_fecIni", scheduledProceso.getFechaIniHHmm());
			parametros.put("p_fecFin", scheduledProceso.getFechaFinHHmm());
			parametros.put("REPORT_LOCALE", new Locale("en", "US"));
			InputStream inputStream = (InputStream) this.getClass().getResourceAsStream("/" + rptFileName);
			JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, parametros, connection);
			JRXlsExporter exporter = new JRXlsExporter();
			exporter.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
			exporter.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
			exporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.TRUE);
			exporter.setParameter(JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
			exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
			exporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, fileNameRoot);
			// exportar Excel
			exporter.exportReport();
			// -- Se crea el archivo en esta ruta
			file = new File(fileNameRoot);
			connection.close();
			return file;

		} catch (Exception e) {
			// TODO: handle exception
			connection.close();
			e.printStackTrace();
			return null;
		}
	}

	public String obtenerReporteCotizacion(ReportePdfRequets reportePdfRequets) throws Exception {
		Connection connection = jdbcTemplate.getDataSource().getConnection();
		try {
			Statement stat = connection.createStatement();
			stat.execute("alter session set NLS_DATE_FORMAT='DD/MM/YY'");
			String path = new ClassPathResource("/").getFile().getAbsolutePath();
			@SuppressWarnings("rawtypes")
			HashMap parametros = new HashMap();
			parametros.put("codCotizacion", reportePdfRequets.getNumCodigoCotizacion() + "");
			parametros.put("pathReport", path);
			parametros.put("REPORT_LOCALE", new Locale("en", "US"));
			InputStream inputStream = (InputStream) this.getClass().getResourceAsStream("/reporteCotizacion.jasper");
			byte[] bytes = JasperRunManager.runReportToPdf(inputStream, parametros, connection);
			String pdfBase64 = Base64.getEncoder().encodeToString(bytes);
			connection.close();
			return pdfBase64;
		} catch (Exception e) {
			logger.info("**********************obtenerReporteCotizacion******************");
			e.printStackTrace();
			logger.info("**********************obtenerReporteCotizacion printStackTrace******************");
			connection.close();
			return "";

		}
	}

	public String obtenerReporteFactura(ReportePdfRequets reportePdfRequets) throws Exception {
		Connection connection = jdbcTemplate.getDataSource().getConnection();
		try {
			String path = new ClassPathResource("/").getFile().getAbsolutePath();
			CallableStatement cstmt = null;
			Statement stat = connection.createStatement();
			stat.execute("alter session set NLS_DATE_FORMAT='DD/MM/YY'");
			connection.setAutoCommit(false);
			cstmt = connection.prepareCall("{call " + PKG_METODOS + "." + Constantes.SET_HEADER_FACTURANV + "}");
			cstmt.setString(1, reportePdfRequets.getNumFacturas());
			cstmt.execute();

			cstmt = connection.prepareCall("{ call " + PKG_METODOS + "." + Constantes.SET_BODY_FACTURANV + "}");
			cstmt.setString(1, reportePdfRequets.getNumFacturas());
			cstmt.execute();

			@SuppressWarnings("rawtypes")
			HashMap parametros = new HashMap();
			parametros.put("duplicado",
					"******************************************* DOCUMENTO SIN VALOR COMERCIAL - DUPLICADO ***************************");
			parametros.put("pathReport", path);
		 	parametros.put("REPORT_LOCALE", new Locale("en", "US"));

			InputStream inputStream = (InputStream) this.getClass().getResourceAsStream("/reporteFacturaOS.jasper");
			byte[] bytes = JasperRunManager.runReportToPdf(inputStream, parametros, connection);
			String pdfBase64 = Base64.getEncoder().encodeToString(bytes);
			connection.close();
			return pdfBase64;
		} catch (Exception e) {
			 logger.info("**********************obtenerReporteFactura******************");
			e.printStackTrace();
			connection.close();
			logger.info("**********************obtenerReporteFactura printStackTrace******************");
			return "";

		}
	}

	public String obtenerReporteOrdenCompra(ReportePdfRequets reportePdfRequets) throws Exception {
		Connection connection = jdbcTemplate.getDataSource().getConnection();
		try {
			String path = new ClassPathResource("/").getFile().getAbsolutePath();
			CallableStatement cstmt = null;
			Statement stat = connection.createStatement();
			stat.execute("alter session set NLS_DATE_FORMAT='dd/mm/yyyy'");
			connection.setAutoCommit(false);
			cstmt = connection.prepareCall("{call " + PKG_METODOS + "." + Constantes.SET_BODY_OC + "}");
			cstmt.setString(1, reportePdfRequets.getChrCodigoOc());
			cstmt.execute();

			@SuppressWarnings("rawtypes")
			HashMap parametros = new HashMap();
			parametros.put("numoc", reportePdfRequets.getChrCodigoOc()+"");
			parametros.put("pathReport", path);
			 parametros.put("REPORT_LOCALE", new Locale("en", "US"));

			InputStream inputStream = (InputStream) this.getClass().getResourceAsStream("/rpt_OrdenCompra.jasper");
			byte[] bytes = JasperRunManager.runReportToPdf(inputStream, parametros, connection);
			String pdfBase64 = Base64.getEncoder().encodeToString(bytes);
			connection.close();
			return pdfBase64;
		} catch (Exception e) {
			logger.info("**********************obtenerReporteOrdenCompra******************");
			e.printStackTrace();
			logger.info("**********************obtenerReporteOrdenCompra printStackTrace******************");
			connection.close();
			return "";

		}
	}

	public String obtenerReporteGuiaSalida(ReportePdfRequets reportePdfRequets) throws Exception {
		Connection connection = jdbcTemplate.getDataSource().getConnection();
		try {
			String path = new ClassPathResource("/").getFile().getAbsolutePath();

			@SuppressWarnings("rawtypes")
			HashMap parametros = new HashMap();
			parametros.put("numguia", reportePdfRequets.getChrCodigoGuia());
			parametros.put("pathReport", path);
			 parametros.put("REPORT_LOCALE", new Locale("en", "US"));

			InputStream inputStream = (InputStream) this.getClass().getResourceAsStream("/rpt_GuiasSalida.jasper");
			byte[] bytes = JasperRunManager.runReportToPdf(inputStream, parametros, connection);
			String pdfBase64 = Base64.getEncoder().encodeToString(bytes);
			connection.close();
			return pdfBase64;
		} catch (Exception e) {
			logger.info("**********************obtenerReporteGuiaSalida******************");
			e.printStackTrace();
			logger.info("**********************obtenerReporteGuiaSalida printStackTrace******************");
			connection.close();
			return "";

		}
	}

	public File obtenerFileReporteOcOnline(ScheduledProceso scheduledProceso)throws Exception {
		Connection connection = jdbcTemplate.getDataSource().getConnection();
		try {

			String fileName = "OrdenCompra_" + scheduledProceso.getChrCodigoOc();
			String fileNameRoot = System.getProperty("java.io.tmpdir") + "/" + fileName + ".xls";
			String rptFileName = "reporteOCOnline.jasper";

			@SuppressWarnings("rawtypes")
			HashMap parametros = new HashMap();
			parametros.put("p_nrooc", scheduledProceso.getChrCodigoOc().trim());
			parametros.put("REPORT_LOCALE", new Locale("en", "US"));
			logger.info(fileNameRoot);
			InputStream inputStream = (InputStream) this.getClass().getResourceAsStream("/" + rptFileName);
			JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, parametros, connection);
			JRXlsExporter exporter = new JRXlsExporter();
			exporter.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
			exporter.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
			exporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.TRUE);
			exporter.setParameter(JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
			exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
			exporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, fileNameRoot);
			// exportar Excel
			exporter.exportReport();

			// -- Se crea el archivo en esta ruta
			File file = new File(fileNameRoot);
			connection.close();
			return file;
		} catch (Exception e) {
			// TODO: handle exception
			connection.close();
			e.printStackTrace();
			return null;
		}
	}

}

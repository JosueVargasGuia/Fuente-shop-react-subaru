package com.ShopAutoPartsServices.FE;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ShopAutoPartsServices.FE.Beans.BeanEmpresa;
import com.ShopAutoPartsServices.FE.Beans.BeanFacturacion;
import com.ShopAutoPartsServices.FE.Enums.FeCargoDescuento;
import com.ShopAutoPartsServices.FE.Enums.FeCatalogo14;
import com.ShopAutoPartsServices.FE.Enums.FeCatalogo15;
import com.ShopAutoPartsServices.FE.Enums.FeCatalogo5;
import com.ShopAutoPartsServices.FE.Enums.FeCatalogo51;
import com.ShopAutoPartsServices.FE.Enums.FeCatalogo53;
import com.ShopAutoPartsServices.FE.Enums.FeCatalogo55;
import com.ShopAutoPartsServices.FE.Enums.FeCatalogo6;
import com.ShopAutoPartsServices.FE.Enums.FeDatoEmisor;
import com.ShopAutoPartsServices.FE.Enums.FeEncabezado;
import com.ShopAutoPartsServices.FE.Enums.FeEncabezadoICB;
import com.ShopAutoPartsServices.FE.Enums.FeImpuestosRetencionesGlobales;
import com.ShopAutoPartsServices.FE.Enums.FeOtrosConcepto;
import com.ShopAutoPartsServices.FE.Enums.FePropiedadesAdicionales;
import com.ShopAutoPartsServices.FE.Enums.FeSeccion;
import com.ShopAutoPartsServices.FE.Enums.TipoComprobante;
import com.ShopAutoPartsServices.WsServices.IpnController;

public class Archivo {
	static Logger logger = LoggerFactory.getLogger(Archivo.class);
	static void lineaCabeceraFE(BufferedWriter bw, String codSeccion, String codConcepto, Object valor) {
		try {
			bw.write(codSeccion + Constantes.PATRON_FE + codConcepto + Constantes.PATRON_FEX2 + valor
					+ Constantes.LINEA_SEPERACION);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	static void lineaDetalleFE(BufferedWriter bw, String codSeccion, String codConcepto, Object idLinea, Object valor) {
		try {
			bw.write(codSeccion + Constantes.PATRON_FE + codConcepto + Constantes.PATRON_FE + idLinea
					+ Constantes.PATRON_FE + valor + Constantes.LINEA_SEPERACION);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	
	public static String validaNuloVacioComillas(String cadena) {
		if (cadena == null) {
			return "-";
		} else if (!cadena.isEmpty() && cadena != null && cadena != "") {
			return cadena;
		} else {
			return "-";
		}
	}

	public static void copia(File fuente, String srcEncoding, File fin, String tgtEncoding) throws IOException {
		BufferedReader br = null;
		BufferedWriter bw = null;
		try { 
			//logger.info("comenzando a copiar archivo con codificaci�n de:" + srcEncoding + "," + tgtEncoding);
			br = new BufferedReader(new InputStreamReader(new FileInputStream(fuente), srcEncoding));
			bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fin), tgtEncoding));
			char[] buffer = new char[16384];
			int read;
			while ((read = br.read(buffer)) != -1)
				bw.write(buffer, 0, read);
		} catch (Exception e) {
			logger.info("Error en la copia");
			e.printStackTrace();
		} finally {
			try {
				if (br != null)
					br.close();
			} finally {
				if (bw != null)
					bw.close();
			}
		}

	}

	public static boolean interfazFacturaElectronicaV3(BeanEmpresa empresa, BeanFacturacion facturaCabecera,
			ArrayList<BeanFacturacion> facturaDetalle) throws Exception {
		final Boolean sunatValidacion01072020 = false;
		final String extensionTexto = ".txt";
		Calendar calendario = Calendar.getInstance();
		Date v_fecha = new Date();
		calendario.setTime(v_fecha);
		BufferedWriter bw = null;
		String encoding = "Cp1252"; // Encoding ANSI
		String path;
		int anio = calendario.get(Calendar.YEAR);
		int mes = calendario.get(Calendar.MONTH);
		int dia_del_mes = calendario.get(Calendar.DAY_OF_MONTH);

		String rutaArchivo = "";
		String v_so = System.getProperty("os.name");
		String v_sep = System.getProperty("file.separator");
		String v_lineSep = System.getProperty("line.separator");
		String v_ruta_raiz = v_sep;
		
		if (v_so.toUpperCase().startsWith("WINDOWS")){v_ruta_raiz = "C:" + v_sep;
		rutaArchivo = String.format("%s" + v_sep + "%s" + v_sep + "%s"
				+ v_sep + "%s", v_ruta_raiz + "Facturacion_Digital", anio,
				Fecha.getMesIn(mes), dia_del_mes);
		}else{
			v_ruta_raiz =Constantes.TIPE_PAGE_APLICATIVO.equals("4") ? Constantes.RUTA_FILE_LINUX_FEEA_EG : Constantes.RUTA_FILE_LINUX_FEEA;
			rutaArchivo = String.format("%s/%s/%s", v_ruta_raiz +  anio,Fecha.getMesIn(mes), dia_del_mes);
		}
		String nombreDelArchivo =  facturaCabecera.getNroFactura();
		
		
		File fb = new File(rutaArchivo);
		if (fb.exists() && !fb.isDirectory()) {
			new File(rutaArchivo).mkdirs();
			if (v_so.toUpperCase().startsWith("WINDOWS"))
				path = String.format("%s".concat( v_sep ).concat("%s"), rutaArchivo,
					nombreDelArchivo.concat(extensionTexto));
			else
				path = String.format("%s/%s", rutaArchivo,
						nombreDelArchivo.concat(extensionTexto));
			bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path),encoding));
			fb.delete();
		} else {
			new File(rutaArchivo).mkdirs();

			if (v_so.toUpperCase().startsWith("WINDOWS"))
				path = String.format("%s".concat(v_sep).concat("%s"), rutaArchivo,
					nombreDelArchivo.concat(extensionTexto));
			else
				path = String.format("%s/%s", rutaArchivo,
						nombreDelArchivo.concat(extensionTexto));
			bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path),encoding));
		}

		try {
			//--validando si existe servicios en el documento
			String detraccion = "";
			Boolean existeServicios = false;
			Boolean detraccionValidada = false;
			//valida si es que existe servicio dentro del documento
			for(BeanFacturacion validaDetraccion : facturaDetalle){
				detraccion = validaDetraccion.getTipoDocumento().equals("R") ? "NIU": "ZZ";
				if(detraccion.equals("ZZ")){
					existeServicios = true;
					break;
				}
			}
			//--Validando que sea factura y el origen del documento sea 1 | 3 | 4
			//--Además, verifica si el valor total de la factura supera los 700 soles
			if (facturaCabecera.getTipoDocumento().trim().equals("F")) {
				if (facturaCabecera.getCodigoOrigenFactura() == 1
						|| facturaCabecera.getCodigoOrigenFactura() == 3
						|| facturaCabecera.getCodigoOrigenFactura() == 4) {
				
					if ((Double.parseDouble(facturaCabecera.getTotalFinal()) * facturaCabecera.getTipoCambioContableVenta()) >= 700) {
						if(existeServicios){
							//Si pasa todos los filtros este documento declarará un importe en la detracción
							detraccionValidada = true;
						}
					}
				}
			}
		    if(!facturaCabecera.getTipoDocumento().equals(TipoComprobante.NOTA_CREDITO.codigo)){
		    	//se agrega validación para cuando la operación este sujeta a detracción
		    	if(detraccionValidada) {
		    		lineaCabeceraFE(bw, FeSeccion.A.codigo, FeOtrosConcepto.TIPO_OPERACION.codigo, FeCatalogo51.OPERACION_SUJETA_A_DETRACCION.codigo);
		    	}
		    	else {
		    		lineaCabeceraFE(bw, FeSeccion.A.codigo, FeOtrosConcepto.TIPO_OPERACION.codigo, FeCatalogo51.VENTA_INTERNA.codigo);
		    	}
		    	
		    }	
			bw.write("A;CODI_EMPR;;"+empresa.getCodigo()+ v_lineSep);
			bw.write("A;TipoDTE;;"
					+ facturaCabecera.getTipoFacturaElectronica() + v_lineSep); 
			if(facturaCabecera.getTipoDocumento().equals("N")){
					bw.write("A;Serie;;" + facturaCabecera.getNroFactura().substring(0, 2)+ facturaCabecera.getSerie().substring(1, 3) + v_lineSep);
			}else{
			bw.write("A;Serie;;" + facturaCabecera.getTipoDocumento()+ facturaCabecera.getSerie() + v_lineSep);
			}
			bw.write("A;Correlativo;;"+ validaNuloVacioComillas(facturaCabecera.getCorrelativoFacturaElectronica())+ v_lineSep); // -- DUDA (CORRELATIVO INDEPENDIENTE DE
									// NROFACTURA)
			bw.write("A;FchEmis;;"
					+ Fecha.formatTimeByPattern(
							facturaCabecera.getFecCreacion(),
							Constantes.DATETIME_PATTERN_SLASH_dd_MM_yyyy,
							Constantes.DATETIME_PATTERN_yyyy_MM_dd) + v_lineSep); 
			bw.write("A;TipoMoneda;;USD" + v_lineSep); 

			// -- EMISOR (EA CORP )
			bw.write("A;RUTEmis;;".concat(empresa.getRuc()).concat(v_lineSep));
			lineaCabeceraFE(bw, FeSeccion.A.codigo, FeDatoEmisor.TIPO_RUC_EMISOR.codigo, FeCatalogo6.RUC.codigo  );
			bw.write("A;RznSocEmis;;".concat(empresa.getNombreComercial()).concat(v_lineSep));
			bw.write("A;ComuEmis;;".concat(empresa.getUbigeo()).concat(v_lineSep));
			bw.write("A;DirEmis;;".concat(empresa.getDireccion()).concat(v_lineSep));

			// -- RECEPTOR (EL CLIENTE)5
			bw.write("A;TipoRutReceptor;;".concat(facturaCabecera.getTipoDocumentoReceptorElectronico()).concat(v_lineSep));
			
			//UBL 2.1
			bw.write("A;CodigoLocalAnexo;;".concat(facturaCabecera.getCodSucursalAnexo()).concat(v_lineSep));
			
			// OPCIONES A LA TABLA DEL SISTEMA EA :
									// TIPOCLIENTE)
			bw.write("A;RUTRecep;;".concat(facturaCabecera.getDocumentoReceptorElectronico()).concat(v_lineSep));
			bw.write("A;RznSocRecep;;".concat(facturaCabecera.getNomCliente()).concat(v_lineSep));
			bw.write("A;DirRecep;;".concat(facturaCabecera.getDireccion()).concat(v_lineSep));
			// -----------------------------

			// NOTA DE CREDITO
			if (facturaCabecera.getTipoDocumento().equals("N")) {
	
				bw.write("A;Sustento;;"+ facturaCabecera.getSustentoNotaCredito() + v_lineSep);
				if(Integer.parseInt(facturaCabecera.getTipoNotaCredito())< 10){
					bw.write("A;TipoNotaCredito;;0"+ facturaCabecera.getTipoNotaCredito() + v_lineSep);
				}else{
					bw.write("A;TipoNotaCredito;;"+ facturaCabecera.getTipoNotaCredito() + v_lineSep);
				}
			}

			BigDecimal montoNeto = BigDecimal.ZERO;
			// -- TOTALES
			if (!facturaCabecera.getSubTotal().equals("0.00")&&  Double.parseDouble(facturaCabecera.getSubTotal())<= Double.parseDouble(facturaCabecera.getMontoNeto()) ) {
				bw.write("A;MntNeto;;" + facturaCabecera.getSubTotal()+ v_lineSep);
				montoNeto = new BigDecimal( facturaCabecera.getSubTotal());
			}else{
				bw.write("A;MntNeto;;" + facturaCabecera.getMontoNeto()	+ v_lineSep);
				montoNeto = new BigDecimal( facturaCabecera.getMontoNeto());
			}
			
			bw.write("A;MntExe;;0.00" + v_lineSep);
			bw.write("A;MntExo;;0.00" + v_lineSep);
			bw.write("A;MntTotal;;" + facturaCabecera.getTotalFinal()+ v_lineSep);
	
			// -- LEYENDAS
			// -- RETENCION
			// -- PERCEPCION
			// -- OTROS CONCEPTOS SUNAT
			// -- DIRECCION DE ENTREGA
			// -- OTROS CONCEPTOS SUITE ELECTRONICA
			
			//-------SEDE DE EMPRESA YA NO EXISTE
			if(Constantes.TIPE_PAGE_APLICATIVO.equals("2") & facturaCabecera.getSerie().equals("001")){
				bw.write("A;ImprDest;;".concat(empresa.getRutaImpresora()).concat(v_lineSep));}else
			if(Constantes.TIPE_PAGE_APLICATIVO.equals("3") & facturaCabecera.getSerie().equals("005")){
				if(!UtilString.defineString(empresa.getRutaImpresora()).isEmpty()){
					bw.write("A;ImprDest;;".concat(empresa.getRutaImpresora()).concat(v_lineSep));
				}
			}
			
		
			
		
			BigDecimal newPagoPendiente =  BigDecimal.ZERO;
			//--De existir DETRACCIÓN se resta este importe al importe pendiente
			if(detraccionValidada){
				//Se genera un nuevo pago pendiente ya que cuando hay detracción
				//es necesario restarlo
				newPagoPendiente = new BigDecimal(facturaCabecera.getPendiente())
						.subtract(new BigDecimal(facturaCabecera.getDetraccion()));
			}
			
			///////////////////////////////////////////////////////////////
			//-- TONY : A) INICIO (09/02/2021)
			if(facturaCabecera.getTipoDocumento().equals("F")){
				bw.write("A;FormaPago;;" + (facturaCabecera.getTipoPago().equals("C")?"Contado":"Credito") + v_lineSep);  //-- TONY : SOLO APLICA EN FACTURA
				if(facturaCabecera.getTipoPago().equals("P")){ //-- C = Contado, P = Credito
					//verifica que la variable newPagoPendiente sea mayor a cero, sino lo es obtiene el total de la factura
					if(newPagoPendiente.compareTo(BigDecimal.ZERO)>0) {
						bw.write("A;MontoNetoPendPago;;" + newPagoPendiente.setScale(2,RoundingMode.HALF_UP) + v_lineSep);
					}else {
						bw.write("A;MontoNetoPendPago;;" + facturaCabecera.getPendiente() + v_lineSep);  //-- Solo si la forma de pago es "Credito"
					}
				}
			}
//			}else if(facturaCabecera.getTipoDocumento().equals("N")){
//				// FormaPago : En NC, solo si la factura de referencia es a "Crédito"
//				if(facturaCabecera.getTipoPago().equals("P")){ //-- C = Contado, P = Credito
//					bw.write("A;MontoNetoPendPago;;" + facturaCabecera.getPendiente() + v_lineSep);  //-- Solo si la forma de pago es "Credito"
//				}
//			}
			
			//-- TONY : A) FIN 
			///////////////////////////////////////////////////////////////
			
			
			lineaCabeceraFE(bw, FeSeccion.A.codigo, FeEncabezado.HORA_EMISION.codigo, 
					new SimpleDateFormat("hh:mm:ss").format(v_fecha));
			// -------Impuestos/Retenciones Globales
			bw.write("A2;CodigoImpuesto;1;"+ FeCatalogo5.IGV.codigo + v_lineSep); // -- CATALOGO 5
			bw.write("A2;MontoImpuesto;1;" + facturaCabecera.getMontoImpuesto()	+ v_lineSep);
			bw.write("A2;TasaImpuesto;1;" + new BigDecimal(facturaCabecera.getIgvDecimal()*100).setScale(2)+ v_lineSep); // -- IGV 18%
			lineaDetalleFE(bw, FeSeccion.A2.codigo,FeImpuestosRetencionesGlobales.MONTO_IMPUESTO_BASE.codigo,1,montoNeto.setScale(2, RoundingMode.HALF_UP).toString());
			//bw.write("A2;MontoImpuestoBase;1;"+montoNeto+ v_lineSep );
			if(new BigDecimal(facturaCabecera.getIcb()).compareTo(BigDecimal.ZERO)>0){
				lineaDetalleFE(bw, FeSeccion.A2.codigo,"CodigoImpuesto",2,FeCatalogo5.ICB.codigo );
				lineaDetalleFE(bw, FeSeccion.A2.codigo,"MontoImpuesto",2,facturaCabecera.getIcb() );
			}

			// ------- Detalle Detracciones y otros
			// if( Double.parseDouble(facturaCabecera.getTotalFinal())*
			// facturaCabecera.getTipoCambioContableVenta() >= 700 ){
			if(detraccionValidada){
				bw.write("A3;codiDetraccion;1;" + FeCatalogo14.DETRACCIONES.codigo + v_lineSep); // --
				bw.write("A3;ValorDetraccion;1;-" + v_lineSep);
				bw.write("A3;MntDetraccion;1;"+ facturaCabecera.getDetraccion()+ v_lineSep);
				bw.write("A3;PorcentajeDetraccion;1;" + empresa.getDetraccion()+ v_lineSep);
				//Codigo de bb y ss sujetos a detraccion 23/03/2021
				//se agregan valores default enviados por el consultor
				bw.write("A3;codiDetraccion;2;3000" + v_lineSep);
				bw.write("A3;ValorDetraccion;2;037"+ v_lineSep);
				bw.write("A3;MntDetraccion;2;0"+ v_lineSep);
				bw.write("A3;PorcentajeDetraccion;2;0" + v_lineSep);
				bw.write("A3;codiDetraccion;3;" + FeCatalogo15.NUMERO_CTA_BN.codigo + v_lineSep); // --
				bw.write("A3;ValorDetraccion;3;" + empresa.getCuentaDetraccion()+ v_lineSep);
				//se agregan valores default enviados por el consultor  23/03/2021
				bw.write("A3;MntDetraccion;3;0"+ v_lineSep);
				bw.write("A3;PorcentajeDetraccion;3;0" + v_lineSep);
			}


			

			///////////////////////////////////////////////////////////////
			//-- TONY : A5) INICIO (10/02/2021)
					
			if(facturaCabecera.getTipoDocumento().equals("F")){
				if(facturaCabecera.getTipoPago().equals("P")){ //-- C = Contado, P = <Credito
					bw.write("A5;Cuota;1;" + facturaCabecera.getNroCuotas() + v_lineSep);  //-- Solo si la forma de pago es "Credito"
					//verifica si el pangoPendiente inicial fue modificado, si es mayor a 0 es porque existe detracción.
					if(newPagoPendiente.compareTo(BigDecimal.ZERO)>0) {
						bw.write("A5;MontoCuota;1;" + newPagoPendiente.setScale(2,RoundingMode.HALF_UP) + v_lineSep);
					}else {
						bw.write("A5;MontoCuota;1;" + new BigDecimal(facturaCabecera.getPendiente()).setScale(2,RoundingMode.HALF_UP) + v_lineSep);
					}
						bw.write("A5;FechaVencCuota;1;" + facturaCabecera.getFecVenceCuota() + v_lineSep);
				}
			}
//			else if(facturaCabecera.getTipoDocumento().equals("N")){
//				if(facturaCabecera.getTipoPago().equals("P")){ //-- C = Contado, P = Credito
//					bw.write("A5;MontoCuota;1;" + Constantes.formatNumberString(new Double(facturaCabecera.getPendiente()), 2) + v_lineSep);  //-- Solo si la forma de pago es "Credito"
//					bw.write("A5;FechaVencCuota;1;" + facturaCabecera.getFecVenceCuota() + v_lineSep);
//				}
//			}
			
			//-- TONY : A5) FIN 
			///////////////////////////////////////////////////////////////

			// -- DETALLE DE LA FACTURA
			ArrayList<String> detalleItem = new ArrayList<String>();
			ArrayList<String> det_item_hh = new ArrayList<String>();
			ArrayList<String> det_item_costo_hh = new ArrayList<String>();
			double v_montoDscto = 0;
			int contadorDescuento = 1;
			int adicionalDetalle = 1;
			int contador3 = 1;
			//StringBuffer adicionalSubtotal = new StringBuffer();
			//-- int v_linea_add_tip_2 = 115; //-- 
			int v_linea_hh = 1;
			int v_linea_chh = 1;         //--
			int detalleAdicional = 33;
			if(Constantes.TIPE_PAGE_APLICATIVO.equals("4")){
				detalleAdicional = 34;
			}
			int correlativoTipoFacturaOtro = 1;
			int sumaPorItemDespuesServicioRespuesto = 1;
			//Existencia de bien o servicio
			boolean existeServicio = false;
			boolean existeRepuesto = false;
			//Validación de ingreso del bucle 
			boolean ingresoServicio = false;
			boolean ingresoRepuesto = false;
			//Validación si es que contiene los dos en el mismo documento
			boolean SoloRepuesto = false;
			boolean SoloServicio = false;
			boolean flag_Ser = false;   //-- TONY
			boolean flag_Rep = false;   //-- TONY

			for(BeanFacturacion beanDetalle : facturaDetalle){
			
				if(beanDetalle.getTipoDocumento().equals("S")){
					existeServicio = true;
					flag_Ser = true; //-- tony
				}else if(beanDetalle.getTipoDocumento().equals("R")){
					existeRepuesto = true;
					flag_Rep = true; //-- tony
				}
				
			}
			
			if(existeServicio && existeRepuesto){
				SoloRepuesto = true;
				SoloServicio = true;
			}
			
			for (BeanFacturacion beanDetalle : facturaDetalle) {
								
				if (facturaCabecera.getCodigoOrigenFactura() == 4
						|| facturaCabecera.getCodigoOrigenFactura() == 3
						|| facturaCabecera.getCodigoOrigenFactura() == 2
						|| facturaCabecera.getCodigoOrigenFactura() == 5) {
					List<String> descripcion = new ArrayList<String>();
					if (beanDetalle.getItemDescripcion().contains("\r\n")) {
						descripcion = Arrays.asList(beanDetalle.getItemDescripcion().split("\r\n"));
					} else if (beanDetalle.getItemDescripcion().contains("\r")) {
						descripcion = Arrays.asList(beanDetalle.getItemDescripcion().replace("\n", "")
								.split("\r"));
					} else if (beanDetalle.getItemDescripcion().contains("\n")) {
						descripcion = Arrays.asList(beanDetalle.getItemDescripcion().replace("\r", "")
								.split("\n"));
					}
					//En el caso codigo origen de factura nota de venta
					//Agregar Repuesto
					if(facturaCabecera.getCodigoOrigenFactura() == 2 && !facturaCabecera.getTipoDocumento().equals("N")){
						if(sunatValidacion01072020) {
						//hata que digiflow los ponga como etiquetas => if(existeRepuesto){	
								bw.write("B;NroLinDet;" + correlativoTipoFacturaOtro+ ";" + correlativoTipoFacturaOtro+ v_lineSep);// *
								bw.write("B;QtyItem;" +  correlativoTipoFacturaOtro + ";1"+ v_lineSep);// *
								bw.write("B;UnmdItem;"+ correlativoTipoFacturaOtro + ";NIU"  + v_lineSep);
								bw.write("B;VlrCodigo;" + correlativoTipoFacturaOtro+ ";RE" + v_lineSep);// *
								bw.write("B;NmbItem;" +   correlativoTipoFacturaOtro+ ";REPUESTOS" + v_lineSep);// *
								bw.write("B;PrcItem;" +  correlativoTipoFacturaOtro+ ";0.00"+ v_lineSep);// *
								bw.write("B;PrcItemSinIgv;"+ correlativoTipoFacturaOtro + ";0.00" + v_lineSep);
								bw.write("B;MontoItem;" + correlativoTipoFacturaOtro + ";0.00" + v_lineSep);// *
								bw.write("B;IndExe;" + correlativoTipoFacturaOtro + ";10" + v_lineSep); // *
								bw.write("B;CodigoTipoIgv;"+  correlativoTipoFacturaOtro + ";1000"+ v_lineSep);// *
								bw.write("B;TasaIgv;" + correlativoTipoFacturaOtro + ";" + "18" + v_lineSep);// *
								bw.write("B;ImpuestoIgv;"+  correlativoTipoFacturaOtro + ";0.00"+  v_lineSep);
								bw.write("B;CodigoProductoSunat;"+correlativoTipoFacturaOtro+";78181507"+v_lineSep );
								correlativoTipoFacturaOtro++;
								existeRepuesto = false;
							}
						}
				
					if (descripcion.size() == 0 || descripcion == null) {
						v_montoDscto += beanDetalle.getItemDescuento();
						Object correlativo =  (beanDetalle.getCorrelativo().isEmpty() ? correlativoTipoFacturaOtro : beanDetalle.getCorrelativo()) ;
						bw.write("B;NroLinDet;" + correlativoTipoFacturaOtro+ ";" + correlativoTipoFacturaOtro + v_lineSep);// *
						bw.write("B;QtyItem;" +  correlativo + ";" + beanDetalle.getCantidadFE() + v_lineSep);// *
						bw.write("B;UnmdItem;"+ correlativo+ ";"+ (beanDetalle.getTipoDocumento().equals("S") ? "ZZ": (validaNuloVacioComillas(beanDetalle.getUnidadMedidaElectronica()).equals("-")? "NIU" : beanDetalle.getUnidadMedidaElectronica())) + v_lineSep);
						bw.write("B;VlrCodigo;" + correlativo+ ";" + (!beanDetalle.getItemCodigo().isEmpty() ? beanDetalle.getItemCodigo(): correlativoTipoFacturaOtro) + v_lineSep);// *
						bw.write("B;NmbItem;" +  correlativo+ ";" + beanDetalle.getItemDescripcion()+ v_lineSep);// *
						bw.write("B;PrcItem;" +correlativo+ ";" + beanDetalle.getItemPrecioIgv()+ v_lineSep);// *
						bw.write("B;PrcItemSinIgv;"+  correlativo+ ";"+ beanDetalle.getItemPrecio() + v_lineSep);
						bw.write("B;MontoItem;" + correlativo+ ";" + beanDetalle.getItemImporteTotal()+ v_lineSep);// *
						bw.write("B;IndExe;" +correlativo+ ";10" + v_lineSep); // *
						bw.write("B;CodigoTipoIgv;"+  correlativo + ";1000"+ v_lineSep);// *
						bw.write("B;TasaIgv;" +  correlativo+ ";" + "18" + v_lineSep);// *
						bw.write("B;ImpuestoIgv;"+correlativo+ ";"+ beanDetalle.getImpuestoIgv() + v_lineSep);
						bw.write("B;CodigoProductoSunat;"+ correlativo+ ";"+ beanDetalle.getCodUNSPC() + v_lineSep);
						if(beanDetalle.getItemIcb().compareTo(BigDecimal.ZERO)>0){
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.CODIGO_TRIBUTO_BOLSA_PLASTICA.codigo, correlativo, FeCatalogo5.ICB.codigo );
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.MONTO_TRIBUTO_BOLSA_PLASTICA.codigo, correlativo, beanDetalle.getItemIcb() );
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.MONTO_UNITARIO_BOLSA_PLASTICA.codigo, correlativo, facturaCabecera.getImpuestoIcb() );
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.CANTIDAD_BOLSA_PLASTICA.codigo, correlativo, beanDetalle.getCantidadFE());
						}
						if(beanDetalle.getItemDescuento()>0){
							Double montoBase = beanDetalle.getItemImporteTotal()+beanDetalle.getItemDescuento();
							Double factorDescuento = beanDetalle.getItemDescuento() / montoBase;
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.NRO_LIN_DET.codigo,correlativo,correlativo);
							//cuando sean cargos será true pero si son descuentos va false  1 -_- 0 
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.IND_CARGO_DESCUENTO.codigo, correlativo, 0);
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.CODIGO_CARGO_DESCUENTO.codigo,correlativo, FeCatalogo53.OTROS_DESCUENTOS.codigo);
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.FACTOR_CARGO_DESCUENTO.codigo, correlativo, new BigDecimal(factorDescuento).setScale(5, RoundingMode.HALF_UP));
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.MONTO_CARGO_DESCUENTO.codigo, correlativo,new BigDecimal( beanDetalle.getItemDescuento()).setScale(2, RoundingMode.HALF_UP));
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.MBASE_CARGO_DESCUENTO.codigo, correlativo, new BigDecimal(montoBase).setScale(2, RoundingMode.HALF_UP)  );
						}
						if(beanDetalle.getTipoDocumento()!= null && beanDetalle.getTipoDocumento().equals("S")){
							if(!UtilString.defineString(facturaCabecera.getPlaca()).equals("") ){
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.NRO_LIN_DET.codigo, correlativo,correlativo );
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.COD_CONTRIB.codigo, correlativo,FeCatalogo55.GASTOS_ART_37_Renta.codigo);
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.NOM_CONTRIB.codigo, correlativo,FeCatalogo55.GASTOS_ART_37_Renta.descripcion );
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.VAL_CONTRIB.codigo, correlativo,facturaCabecera.getPlaca() );
							}
						}
						
						//-- OrigenFactura : 2(OK),3,4,5
						//------------ TONY (INICIO) -------------------
						String vvv_hh = Double.parseDouble(beanDetalle.getHorasHombre())==0?"":Constantes.formatNumberString(Double.parseDouble(beanDetalle.getHorasHombre()),2);
						String vvv_costo_hh = Double.parseDouble(beanDetalle.getCostoHH())==0?"":Constantes.formatNumberString(Double.parseDouble(beanDetalle.getCostoHH()),2);
						
						//-- Adicionales : Tipo 02 (Horas Hombre)
						det_item_hh.add("E;TipoAdicSunat;" + "NEW_CORRELATIVO_HH_" + v_linea_hh + ";02" + v_lineSep); //-- ok
						//det_item_hh.add("E;TipoAdicSunat;" + "NEW_CORRELATIVO_HH_" + v_linea_chh + ";02;" + correlativo + "_" + beanDetalle.getItemCodigo() + "_" + beanDetalle.getItemDescripcion() + v_lineSep);
						det_item_hh.add("E;NmrLineasDetalle;" + "NEW_CORRELATIVO_HH_" + v_linea_hh + ";"+ correlativo + v_lineSep);
						det_item_hh.add("E;NmrLineasAdicSunat;" + "NEW_CORRELATIVO_HH_" + v_linea_hh + ";" + correlativo + "31" + v_lineSep);
						det_item_hh.add("E;DescripcionAdicSunat;" + "NEW_CORRELATIVO_HH_" + v_linea_hh + ";"+ vvv_hh + v_lineSep);
						v_linea_hh++;
						
						//-- Adicionales : Tipo 02 (Costo Horas Hombre)
						det_item_costo_hh.add("E;TipoAdicSunat;" + "NEW_CORRELATIVO_CHH_" + v_linea_chh + ";02" + v_lineSep); //-- ok
						//det_item_costo_hh.add("E;TipoAdicSunat;" + "NEW_CORRELATIVO_CHH_" + v_linea_chh + ";02;" + correlativo + "_" + beanDetalle.getItemCodigo() + "_" + beanDetalle.getItemDescripcion() + v_lineSep);
						det_item_costo_hh.add("E;NmrLineasDetalle;"+ "NEW_CORRELATIVO_CHH_" + v_linea_chh + ";"+ correlativo + v_lineSep);
						det_item_costo_hh.add("E;NmrLineasAdicSunat;"+ "NEW_CORRELATIVO_CHH_" + v_linea_chh + ";" + correlativo + "32" + v_lineSep);
						det_item_costo_hh.add("E;DescripcionAdicSunat;"+ "NEW_CORRELATIVO_CHH_" + v_linea_chh + ";"+ vvv_costo_hh + v_lineSep);
						v_linea_chh++;
						//------------ TONY (FIN) -------------------
						
					} else {
						v_montoDscto += beanDetalle.getItemDescuento();
						Object correlativo =   (beanDetalle.getCorrelativo().isEmpty() ? correlativoTipoFacturaOtro : beanDetalle.getCorrelativo()) ;
						bw.write("B;NroLinDet;" + correlativoTipoFacturaOtro+ ";" + correlativoTipoFacturaOtro + v_lineSep);// *
						bw.write("B;QtyItem;" + correlativo+ ";" + beanDetalle.getCantidadFE() + v_lineSep);// *
						bw.write("B;UnmdItem;"+ correlativo+ ";"+ (beanDetalle.getTipoDocumento().equals("S") ? "ZZ": (validaNuloVacioComillas(beanDetalle.getUnidadMedidaElectronica()).equals("-")? "NIU" : beanDetalle.getUnidadMedidaElectronica())) + v_lineSep);
						bw.write("B;VlrCodigo;" + correlativo+ ";" + (!beanDetalle.getItemCodigo().isEmpty() ? beanDetalle.getItemCodigo(): correlativoTipoFacturaOtro) + v_lineSep);// *
						bw.write("B;NmbItem;"+ correlativo+ ";"+ descripcion.get(0).replace("\r", "").replace("\n", "") + v_lineSep);// *
						bw.write("B;PrcItem;" + correlativo+ ";" + beanDetalle.getItemPrecioIgv()+ v_lineSep);// *
						bw.write("B;PrcItemSinIgv;"+ correlativo + ";"+ beanDetalle.getItemPrecio() + v_lineSep);
						bw.write("B;MontoItem;" +correlativo+ ";" + beanDetalle.getItemImporteTotal()+ v_lineSep);// *
						bw.write("B;IndExe;" + correlativo + ";10" + v_lineSep); // *
						bw.write("B;CodigoTipoIgv;"+ correlativo + ";1000"+ v_lineSep);// *
						bw.write("B;TasaIgv;" +  correlativo+ ";" + "18" + v_lineSep);// *
						bw.write("B;ImpuestoIgv;"+ correlativo + ";"+ beanDetalle.getImpuestoIgv() + v_lineSep);
						bw.write("B;CodigoProductoSunat;"+correlativo+ ";"+ beanDetalle.getCodUNSPC() + v_lineSep);
						if(beanDetalle.getItemIcb().compareTo(BigDecimal.ZERO)>0){
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.CODIGO_TRIBUTO_BOLSA_PLASTICA.codigo, correlativo, FeCatalogo5.ICB.codigo );
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.MONTO_TRIBUTO_BOLSA_PLASTICA.codigo, correlativo, beanDetalle.getItemIcb() );
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.MONTO_UNITARIO_BOLSA_PLASTICA.codigo, correlativo, facturaCabecera.getImpuestoIcb() );
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.CANTIDAD_BOLSA_PLASTICA.codigo, correlativo, beanDetalle.getCantidad());
						}
						if(beanDetalle.getItemDescuento()>0){
							Double montoBase = beanDetalle.getItemImporteTotal()+beanDetalle.getItemDescuento();
							Double factorDescuento = beanDetalle.getItemDescuento() / montoBase;
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.NRO_LIN_DET.codigo,correlativo,correlativo);
							//cuando sean cargos será true pero si son descuentos va false  1 -_- 0 
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.IND_CARGO_DESCUENTO.codigo,correlativo, 0);
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.CODIGO_CARGO_DESCUENTO.codigo,correlativo, FeCatalogo53.OTROS_DESCUENTOS.codigo);
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.FACTOR_CARGO_DESCUENTO.codigo, correlativo, new BigDecimal(factorDescuento).setScale(5, RoundingMode.HALF_UP));
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.MONTO_CARGO_DESCUENTO.codigo, correlativo, new BigDecimal( beanDetalle.getItemDescuento()).setScale(2, RoundingMode.HALF_UP));
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.MBASE_CARGO_DESCUENTO.codigo, correlativo, new BigDecimal(montoBase).setScale(2, RoundingMode.HALF_UP)  );
						}
						if(beanDetalle.getTipoDocumento() != null && beanDetalle.getTipoDocumento().equals("S")){
							if(!UtilString.defineString(facturaCabecera.getPlaca()).equals("") ){
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.NRO_LIN_DET.codigo, correlativo,correlativo );
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.COD_CONTRIB.codigo, correlativo,FeCatalogo55.GASTOS_ART_37_Renta.codigo);
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.NOM_CONTRIB.codigo, correlativo,FeCatalogo55.GASTOS_ART_37_Renta.descripcion );
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.VAL_CONTRIB.codigo, correlativo,facturaCabecera.getPlaca() );
							}
						}
						int contador2 = 1;
						for (int i = 1; i < descripcion.size(); i++) {
							String descripcionitem = descripcion.get(i).replace("\r", "").replace("\n", "");
							if(!descripcionitem.isEmpty() && descripcionitem != ""){
							detalleItem.add("E;TipoAdicSunat;"+ detalleAdicional + ";02" + v_lineSep);
							detalleItem.add("E;NmrLineasDetalle;"+ detalleAdicional + ";"+correlativoTipoFacturaOtro + v_lineSep);
							detalleItem.add("E;NmrLineasAdicSunat;"+ detalleAdicional + ";"+ correlativoTipoFacturaOtro+contador2+ v_lineSep);
							detalleItem.add("E;DescripcionAdicSunat;"+ detalleAdicional+ ";"+ descripcionitem+ v_lineSep);
							contador2++;
							detalleAdicional++;

							}
						}

					}
					correlativoTipoFacturaOtro++;
				}
				else {
				
					v_montoDscto += beanDetalle.getItemDescuento();
//					logger.info(beanDetalle.getCorrelativo());
//					logger.info(beanDetalle.getItemCodigo());
					if (!beanDetalle.getCorrelativo().isEmpty()
							|| !beanDetalle.getItemCodigo().isEmpty()) {
						if (beanDetalle.getItemCodigoOperacionServicio().equals("1V")
								|| beanDetalle.getItemCodigoOperacionServicio().equals("1W")
								|| beanDetalle.getItemCodigoOperacionServicio().equals("1X")
								|| beanDetalle.getItemCodigoOperacionServicio().equals("1Z")
								|| beanDetalle.getItemCodigoOperacionServicio().equals("1S")
								|| beanDetalle.getItemCodigo().equals("999999991")
								|| beanDetalle.getItemCodigo().equals("999999992")
								|| beanDetalle.getItemCodigo().equals("999999993")){
							
							adicionalDetalle = Integer.parseInt(beanDetalle
									.getCorrelativo());
							
							contador3 = adicionalDetalle;
							if(!facturaCabecera.getTipoNotaCredito().matches("4|5|7|10")&& sunatValidacion01072020){
								adicionalDetalle += sumaPorItemDespuesServicioRespuesto;
							}

							if(contador3 != adicionalDetalle){
								contador3 = 1;
							}
							
							if(ingresoServicio && !ingresoRepuesto){
								if(SoloRepuesto && SoloServicio){
									contador3=1;
								}
							}
							if(ingresoServicio && ingresoRepuesto){
								if(SoloRepuesto && SoloServicio){
									contador3=1;
								}
							}
							
							//-- Si no hay Servicios  y solo hay repuestos el contador3 inicia en 1
							if(!flag_Ser && flag_Rep){
								contador3=1;
							}
							
							
							//verifa si ya ingreso al servio y no al repuesto y no a pasado de 10 lineas
							if(ingresoServicio && !ingresoRepuesto  && sunatValidacion01072020){
								if(SoloRepuesto && SoloServicio){
									
									if(sumaPorItemDespuesServicioRespuesto == 1){
										if(!facturaCabecera.getTipoNotaCredito().matches("4|5|7|10")){
										adicionalDetalle++;
										}
									}
							}
							}
						}

							if(beanDetalle.getTipoDocumento().equals("R")
									&& facturaCabecera.getCodigoOrigenFactura() != 6 
									&& !facturaCabecera.getTipoNotaCredito().matches("1|2|3|6") ){
								
								if(existeRepuesto){
									//Cuando contien dos serivicios y respuestos
									if(SoloRepuesto && SoloServicio && sunatValidacion01072020)
									{
									beanDetalle.setCorrelativo(Integer.toString((Integer.parseInt(beanDetalle.getCorrelativo())+1)));
									}
									if(sunatValidacion01072020){
									bw.write("B;NroLinDet;" + beanDetalle.getCorrelativo()+ ";" + beanDetalle.getCorrelativo() + v_lineSep);// *
									bw.write("B;QtyItem;" +  beanDetalle.getCorrelativo() + ";1"+ v_lineSep);// *
									bw.write("B;UnmdItem;"+ beanDetalle.getCorrelativo() + ";NIU"  + v_lineSep);
									bw.write("B;VlrCodigo;" + beanDetalle.getCorrelativo()+ ";RE" + v_lineSep);// *
									bw.write("B;NmbItem;" +  beanDetalle.getCorrelativo()+ ";REPUESTOS" + v_lineSep);// *
									bw.write("B;PrcItem;" +  beanDetalle.getCorrelativo()+ ";0.00"+ v_lineSep);// *
									bw.write("B;PrcItemSinIgv;"+ beanDetalle.getCorrelativo() + ";0.00" + v_lineSep);
									bw.write("B;MontoItem;" + beanDetalle.getCorrelativo() + ";0.00" + v_lineSep);// *
									bw.write("B;IndExe;" +beanDetalle.getCorrelativo()+ ";10" + v_lineSep); // *
									bw.write("B;CodigoTipoIgv;"+  beanDetalle.getCorrelativo() + ";1000"+ v_lineSep);// *
									bw.write("B;TasaIgv;" + beanDetalle.getCorrelativo() + ";" + "18" + v_lineSep);// *
									bw.write("B;ImpuestoIgv;"+  beanDetalle.getCorrelativo() + ";0.00"+  v_lineSep);
									bw.write("B;CodigoProductoSunat;"+  beanDetalle.getCorrelativo()+ ";78181507" + v_lineSep);
									}
			
									existeRepuesto = false;
									ingresoRepuesto = true;
								}
							}else if(beanDetalle.getTipoDocumento().equals("S") 
									&& facturaCabecera.getCodigoOrigenFactura() != 6 
									&& !facturaCabecera.getTipoNotaCredito().matches("1|2|3|6")
									){
								
								if(sunatValidacion01072020){
									bw.write("B;NroLinDet;" + beanDetalle.getCorrelativo()+ ";" + correlativoTipoFacturaOtro + v_lineSep);// *
									bw.write("B;QtyItem;" +  beanDetalle.getCorrelativo() + ";1"+ v_lineSep);// *
									bw.write("B;UnmdItem;"+ beanDetalle.getCorrelativo() + ";NIU"  + v_lineSep);
									bw.write("B;VlrCodigo;" + beanDetalle.getCorrelativo()+ ";SE" + v_lineSep);// *
									bw.write("B;NmbItem;" +  beanDetalle.getCorrelativo()+ ";SERVICIOS" + v_lineSep);// *
									bw.write("B;PrcItem;" +  beanDetalle.getCorrelativo()+ ";0.00"+ v_lineSep);// *
									bw.write("B;PrcItemSinIgv;"+ beanDetalle.getCorrelativo() + ";0.00" + v_lineSep);
									bw.write("B;MontoItem;" + beanDetalle.getCorrelativo() + ";0.00" + v_lineSep);// *
									bw.write("B;IndExe;" +beanDetalle.getCorrelativo()+ ";10" + v_lineSep); // *
									bw.write("B;CodigoTipoIgv;"+  beanDetalle.getCorrelativo() + ";1000"+ v_lineSep);// *
									bw.write("B;TasaIgv;" + beanDetalle.getCorrelativo() + ";" + "18" + v_lineSep);// *
									bw.write("B;ImpuestoIgv;"+  beanDetalle.getCorrelativo() + ";0.00"+  v_lineSep);
									bw.write("B;CodigoProductoSunat;"+  beanDetalle.getCorrelativo()+ ";"+ beanDetalle.getCodUNSPC() + v_lineSep);
									existeServicio = false; 
									ingresoServicio = true;
								}
								if(existeServicio){
									existeServicio = false; 
									ingresoServicio = true;
								}
							}

							if(!facturaCabecera.getTipoNotaCredito().matches("1|2|3|6|10")
									&& facturaCabecera.getCodigoOrigenFactura() != 6 && sunatValidacion01072020 ){
								beanDetalle.setCorrelativo(Integer.toString((Integer.parseInt(beanDetalle
														.getCorrelativo())+sumaPorItemDespuesServicioRespuesto)));
							}
						String codigoProducto =  (beanDetalle.getItemCodigo().isEmpty() ? beanDetalle.getCorrelativo() : beanDetalle.getItemCodigo()) ;
						bw.write("B;NroLinDet;" + beanDetalle.getCorrelativo()+ ";" + beanDetalle.getCorrelativo()+ v_lineSep);// *
						bw.write("B;QtyItem;" + beanDetalle.getCorrelativo()+ ";" + beanDetalle.getCantidadFE() + v_lineSep);// *
						bw.write("B;UnmdItem;"+ beanDetalle.getCorrelativo()+ ";"+ (beanDetalle.getTipoDocumento().equals("S") ? "ZZ": (validaNuloVacioComillas(beanDetalle.getUnidadMedidaElectronica()).equals("-")? "NIU" : beanDetalle.getUnidadMedidaElectronica())) + v_lineSep);
						bw.write("B;VlrCodigo;" + beanDetalle.getCorrelativo()+ ";" + (beanDetalle.getItemCodigo().isEmpty() ? beanDetalle.getCorrelativo() : beanDetalle.getItemCodigo()) + v_lineSep);// *
						bw.write("B;NmbItem;" + beanDetalle.getCorrelativo()+ ";" + beanDetalle.getItemDescripcion()+ v_lineSep);// *
						bw.write("B;PrcItem;" + beanDetalle.getCorrelativo()+ ";" + beanDetalle.getItemPrecioIgv()+ v_lineSep);// *
						bw.write("B;PrcItemSinIgv;"+ beanDetalle.getCorrelativo() + ";"+ beanDetalle.getItemPrecio() + v_lineSep);
						bw.write("B;MontoItem;" + beanDetalle.getCorrelativo()+ ";" + beanDetalle.getItemImporteTotal()+ v_lineSep);// *mm
						bw.write("B;IndExe;" + beanDetalle.getCorrelativo()+ ";10" + v_lineSep); // *
						bw.write("B;CodigoTipoIgv;"+ beanDetalle.getCorrelativo() + ";1000"+ v_lineSep);// *
						bw.write("B;TasaIgv;" + beanDetalle.getCorrelativo()+ ";" + "18" + v_lineSep);// *
						bw.write("B;ImpuestoIgv;"+ beanDetalle.getCorrelativo() + ";"+ beanDetalle.getImpuestoIgv() + v_lineSep);
						bw.write("B;CodigoProductoSunat;"+  beanDetalle.getCorrelativo()+ ";"+ beanDetalle.getCodUNSPC() + v_lineSep);
						
						//------------ TONY (FIN) -------------------
						//-- Aqui solo afecta a los Documentos de (OrigenFactura = 1)
						String vvv_hh = Double.parseDouble(beanDetalle.getHorasHombre())==0?"":Constantes.formatNumberString(Double.parseDouble(beanDetalle.getHorasHombre()),2);
						String vvv_costo_hh = Double.parseDouble(beanDetalle.getCostoHH())==0?"":Constantes.formatNumberString(Double.parseDouble(beanDetalle.getCostoHH()),2);
						
						//-- Adicionales : Tipo 02 (Horas Hombre)
						det_item_hh.add("E;TipoAdicSunat;" + "NEW_CORRELATIVO_HH_" + v_linea_hh + ";02" + v_lineSep); //-- ok
						//det_item_hh.add("E;TipoAdicSunat;" + "NEW_CORRELATIVO_HH_" + v_linea_chh + ";02;" + beanDetalle.getCorrelativo() + "_" + beanDetalle.getItemCodigo() + "_" + beanDetalle.getItemDescripcion() + v_lineSep);
						det_item_hh.add("E;NmrLineasDetalle;" + "NEW_CORRELATIVO_HH_" + v_linea_hh + ";"+ beanDetalle.getCorrelativo() + v_lineSep);
						det_item_hh.add("E;NmrLineasAdicSunat;" + "NEW_CORRELATIVO_HH_" + v_linea_hh + ";" + beanDetalle.getCorrelativo() + "31" + v_lineSep);
						det_item_hh.add("E;DescripcionAdicSunat;" + "NEW_CORRELATIVO_HH_" + v_linea_hh + ";"+ vvv_hh + v_lineSep);
						v_linea_hh++;
						
						//-- Adicionales : Tipo 02 (Costo Horas Hombre)
						det_item_costo_hh.add("E;TipoAdicSunat;" + "NEW_CORRELATIVO_CHH_" + v_linea_chh + ";02" + v_lineSep); //-- ok
						//det_item_costo_hh.add("E;TipoAdicSunat;" + "NEW_CORRELATIVO_CHH_" + v_linea_chh + ";02;" + beanDetalle.getCorrelativo() + "_" + beanDetalle.getItemCodigo() + "_" + beanDetalle.getItemDescripcion() + v_lineSep);
						det_item_costo_hh.add("E;NmrLineasDetalle;"+ "NEW_CORRELATIVO_CHH_" + v_linea_chh + ";"+ beanDetalle.getCorrelativo() + v_lineSep);
						det_item_costo_hh.add("E;NmrLineasAdicSunat;"+ "NEW_CORRELATIVO_CHH_" + v_linea_chh + ";" + beanDetalle.getCorrelativo() + "32" + v_lineSep);
						det_item_costo_hh.add("E;DescripcionAdicSunat;"+ "NEW_CORRELATIVO_CHH_" + v_linea_chh + ";"+ vvv_costo_hh + v_lineSep);
						v_linea_chh++;
						//------------ TONY (FIN) -------------------
						
						
						if(beanDetalle.getItemIcb().compareTo(BigDecimal.ZERO)>0){
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.CODIGO_TRIBUTO_BOLSA_PLASTICA.codigo,  beanDetalle.getCorrelativo(), FeCatalogo5.ICB.codigo );
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.MONTO_TRIBUTO_BOLSA_PLASTICA.codigo,  beanDetalle.getCorrelativo(), beanDetalle.getItemIcb() );
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.MONTO_UNITARIO_BOLSA_PLASTICA.codigo,  beanDetalle.getCorrelativo(), facturaCabecera.getImpuestoIcb() );
							lineaDetalleFE(bw,FeSeccion.B.codigo, FeEncabezadoICB.CANTIDAD_BOLSA_PLASTICA.codigo,  beanDetalle.getCorrelativo(), beanDetalle.getCantidadFE());
						}
						if(beanDetalle.getItemDescuento()>0){
							Double montoBase = beanDetalle.getItemImporteTotal()+beanDetalle.getItemDescuento();
							Double factorDescuento = beanDetalle.getItemDescuento() / montoBase;
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.NRO_LIN_DET.codigo,beanDetalle.getCorrelativo(),beanDetalle.getCorrelativo());
							//cuando sean cargos será true pero si son descuentos va false  1 -_- 0 
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.IND_CARGO_DESCUENTO.codigo, beanDetalle.getCorrelativo(), 0);
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.CODIGO_CARGO_DESCUENTO.codigo,beanDetalle.getCorrelativo(), FeCatalogo53.OTROS_DESCUENTOS.codigo);
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.FACTOR_CARGO_DESCUENTO.codigo, beanDetalle.getCorrelativo(), new BigDecimal(factorDescuento).setScale(5, RoundingMode.HALF_UP));
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.MONTO_CARGO_DESCUENTO.codigo, beanDetalle.getCorrelativo(),new BigDecimal( beanDetalle.getItemDescuento()).setScale(2, RoundingMode.HALF_UP));
							lineaDetalleFE(bw,FeSeccion.B1.codigo,FeCargoDescuento.MBASE_CARGO_DESCUENTO.codigo, beanDetalle.getCorrelativo(), new BigDecimal(montoBase).setScale(2, RoundingMode.HALF_UP)  );
						}
						if(beanDetalle.getTipoDocumento() != null && beanDetalle.getTipoDocumento().equals("S")){
							if(!UtilString.defineString(facturaCabecera.getPlaca()).equals("") ){
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.NRO_LIN_DET.codigo, beanDetalle.getCorrelativo(),beanDetalle.getCorrelativo() );
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.COD_CONTRIB.codigo, beanDetalle.getCorrelativo(),FeCatalogo55.GASTOS_ART_37_Renta.codigo);
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.NOM_CONTRIB.codigo, beanDetalle.getCorrelativo(),FeCatalogo55.GASTOS_ART_37_Renta.descripcion );
							lineaDetalleFE(bw,FeSeccion.B2.codigo, FePropiedadesAdicionales.VAL_CONTRIB.codigo, beanDetalle.getCorrelativo(),facturaCabecera.getPlaca() );
							}
						}

						//al finalizar el bucle de servicios le aumenta
						if(ingresoServicio && ingresoRepuesto  && sunatValidacion01072020){
							++sumaPorItemDespuesServicioRespuesto;
							ingresoServicio = false;
						}
						
					} else {
						detalleItem.add("E;TipoAdicSunat;" + detalleAdicional+ ";02" + v_lineSep);
						detalleItem.add("E;NmrLineasDetalle;"+ detalleAdicional + ";"+adicionalDetalle+ v_lineSep);
						detalleItem.add("E;NmrLineasAdicSunat;"+ detalleAdicional + ";" + adicionalDetalle+contador3+ v_lineSep);
						detalleItem.add("E;DescripcionAdicSunat;"+ detalleAdicional + ";"+ beanDetalle.getItemDescripcion() + v_lineSep);
						detalleAdicional++;
						contador3++;
					}
				}
					
			}
			
			boolean existenciaFranquicia = false;
			if(!facturaCabecera.getFranquicia().equals("0.00")){
				existenciaFranquicia = true;
			}

			BigDecimal mntoBase = BigDecimal.ZERO;
			
			if(Double.parseDouble(facturaCabecera.getSubTotal())>=Double.parseDouble(facturaCabecera.getMontoNeto()) ){
				if(facturaCabecera.getTipoDocumento().equals("N")&&facturaCabecera.getTipoNotaCredito().matches("1|2|3|6")){
					mntoBase = new BigDecimal(facturaCabecera.getMontoNeto());
				}
				mntoBase = new BigDecimal(facturaCabecera.getSubTotal());
			
			}else{
				mntoBase = new BigDecimal(facturaCabecera.getMontoNeto());
			}
			//valida la existencia de franquicia, en el caso de que sea verdadera se antepone al descuento global ya existente
			//Se a declarado que en la facturación para las aseguradoras nunca vean que va a ver otro descuento global.
			BigDecimal dscto = new BigDecimal(0.0);
			if(existenciaFranquicia){
					dscto = new BigDecimal(facturaCabecera.getFranquicia());		
			}else if(!facturaCabecera.getTipoDocumento().equals("N")){
					dscto = new BigDecimal(facturaCabecera.getFactDctos());
			}
			if(!facturaCabecera.getTipoDocumento().equals("N")){
//				if(Constantes.TIPE_PAGE_APLICATIVO.equals("3")){
					if(dscto.compareTo(BigDecimal.ZERO)>0){
						bw.write("C;NroLinDR;" + contadorDescuento + ";1"+v_lineSep);
						bw.write("C;TpoMov;" + contadorDescuento + ";" + "G"+ v_lineSep);
						bw.write("C;ValorDR;" + contadorDescuento + ";"+  dscto.setScale(2, RoundingMode.HALF_UP) + v_lineSep);
						BigDecimal factor = dscto.divide(mntoBase,5,RoundingMode.HALF_UP);
						lineaDetalleFE(bw, FeSeccion.C.codigo, FeCargoDescuento.IND_CARGO_DESCUENTO.codigo, 1, 0);
						lineaDetalleFE(bw, FeSeccion.C.codigo, FeCargoDescuento.CODIGO_CARGO_DESCUENTO.codigo, 1, FeCatalogo53.DESCUENTO_GLOBAL.codigo);
						lineaDetalleFE(bw, FeSeccion.C.codigo, FeCargoDescuento.FACTOR_CARGO_DESCUENTO.codigo, 1, factor );
						lineaDetalleFE(bw, FeSeccion.C.codigo, FeCargoDescuento.MONTO_CARGO_DESCUENTO.codigo, 1, dscto);
						lineaDetalleFE(bw, FeSeccion.C.codigo, FeCargoDescuento.MBASE_CARGO_DESCUENTO.codigo, 1, mntoBase);
					}
				//}
//				else{
//						bw.write("C;NroLinDR;" + contadorDescuento + ";1"+v_lineSep);
//						bw.write("C;TpoMov;" + contadorDescuento + ";" + "G"+ v_lineSep);
//						bw.write("C;ValorDR;" + contadorDescuento + ";"+  dscto.setScale(2, RoundingMode.HALF_UP) + v_lineSep);
//						BigDecimal	factor = dscto.divide(mntoBase,5,RoundingMode.HALF_UP);
//						lineaDetalleFE(bw, FeSeccion.C.codigo, FeCargoDescuento.IND_CARGO_DESCUENTO.codigo, 1, 0);
//						lineaDetalleFE(bw, FeSeccion.C.codigo, FeCargoDescuento.CODIGO_CARGO_DESCUENTO.codigo, 1, FeCatalogo53.OTROS_DESCUENTOS.codigo);
//						lineaDetalleFE(bw, FeSeccion.C.codigo, FeCargoDescuento.FACTOR_CARGO_DESCUENTO.codigo, 1, factor );
//						lineaDetalleFE(bw, FeSeccion.C.codigo, FeCargoDescuento.MONTO_CARGO_DESCUENTO.codigo, 1, dscto);
//						lineaDetalleFE(bw, FeSeccion.C.codigo, FeCargoDescuento.MBASE_CARGO_DESCUENTO.codigo, 1, mntoBase);
//					
//				}
			}
			// -- DESCUENTOS Y RECARGOS GLOBALES
			
			// -- REFERENCIAS GLOBALES 
			//Nota de crédito
			if (facturaCabecera.getTipoDocumento().equals("N")) {
				if (facturaCabecera.getRelacionFactura() != "") {
					bw.write("D;NroLinRef;1;01" + v_lineSep);
					if(facturaCabecera.getRelacionFactura().trim().substring(0, 1).trim().equals("F")){
						bw.write("D;TpoDocRef;1;01" + v_lineSep);
					}else{
						bw.write("D;TpoDocRef;1;03"+ v_lineSep);
					}
					if(facturaCabecera.getRelacionFactura().length()>12){
						bw.write("D;SerieRef;1;"+ facturaCabecera.getRelacionFactura().trim().substring(1, 5) + v_lineSep);
						bw.write("D;FolioRef;1;" +facturaCabecera.getRelacionFactura().trim().substring(5, 13) + v_lineSep);
					}else{
						bw.write("D;SerieRef;1;"+ facturaCabecera.getRelacionFactura().trim().substring(0, 4) + v_lineSep);
						bw.write("D;FolioRef;1;" +facturaCabecera.getRelacionFactura().trim().substring(4, 12) + v_lineSep);
					}
				}
			}

			//Monto en letras
			bw.write("E;TipoAdicSunat;1;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;1;01" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;1;"+ facturaCabecera.getMontoLetras() + v_lineSep);

			//Monto neto
			bw.write("E;TipoAdicSunat;2;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;2;02" + v_lineSep);
			
			if(Double.parseDouble(facturaCabecera.getSubTotal())>=Double.parseDouble(facturaCabecera.getMontoNeto()) ){
				if(facturaCabecera.getTipoDocumento().equals("N")&&facturaCabecera.getTipoNotaCredito().matches("1|2|3|6")){
					facturaCabecera.setSubTotal(facturaCabecera.getMontoNeto());
				}
				bw.write("E;DescripcionAdicSunat;2;" + Constantes.formatDecimalMiles(Double.parseDouble(facturaCabecera.getSubTotal())) + v_lineSep);
			}else{
				bw.write("E;DescripcionAdicSunat;2;" + Constantes.formatDecimalMiles(Double.parseDouble(facturaCabecera.getMontoNeto())) + v_lineSep);
			}
			//Telefonos
			bw.write("E;TipoAdicSunat;3;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;3;03" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;3;"+ validaNuloVacioComillas(facturaCabecera.getTelefonos())+ v_lineSep);

			//Vehiculo
			bw.write("E;TipoAdicSunat;4;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;4;04" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;4;"+ validaNuloVacioComillas(facturaCabecera.getVehiculo())+ v_lineSep);

			//Vin
			bw.write("E;TipoAdicSunat;5;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;5;05" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;5;"+ validaNuloVacioComillas(facturaCabecera.getVin())+ v_lineSep);

			//Color
			bw.write("E;TipoAdicSunat;6;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;6;06" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;6;"+ validaNuloVacioComillas(facturaCabecera.getColor())+ v_lineSep);

			//Si es NOTA PEDIDO o FRANQUICIA por N/V  no se presenta en la representación impresa
			bw.write("E;TipoAdicSunat;7;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;7;07" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;7;"
					+ (facturaCabecera.getCodigoOrigenFactura() == 2
							|| facturaCabecera.getCodigoOrigenFactura() == 5 ? "-"
							: validaNuloVacioComillas(facturaCabecera.getKilometraje())) + v_lineSep);

			//Placa
			bw.write("E;TipoAdicSunat;8;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;8;08" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;8;"+ validaNuloVacioComillas(facturaCabecera.getPlaca())+ v_lineSep);

			//Motor
			bw.write("E;TipoAdicSunat;9;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;9;09" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;9;"+ validaNuloVacioComillas(facturaCabecera.getMotor())+ v_lineSep);

			//Anio
			bw.write("E;TipoAdicSunat;10;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;10;10" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;10;"+ validaNuloVacioComillas(facturaCabecera.getAnio())+ v_lineSep);

			//Numero de orden de servicio
			bw.write("E;TipoAdicSunat;11;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;11;11" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;11;"+ validaNuloVacioComillas(facturaCabecera.getNroOS())+ v_lineSep);

			//Nombre tecnico y Asesor
			bw.write("E;TipoAdicSunat;12;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;12;12" + v_lineSep);
			if( validaNuloVacioComillas(facturaCabecera.getNombreTecnico()).trim().equals("OTROS")){
				bw.write("E;DescripcionAdicSunat;12;-" + v_lineSep);
			}else{
				
				bw.write("E;DescripcionAdicSunat;12;"+validaNuloVacioComillas(facturaCabecera.getNombreTecnico()) + v_lineSep);
			}	
			//Subtotales concatenados por "|" para separar espacios de subtotal
			bw.write("E;TipoAdicSunat;13;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;13;13" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;13;"+ validaNuloVacioComillas(facturaCabecera.getFechaRelacionFactura())+"|"+ v_lineSep);

			int AdicionalObservacion = 14;
			// Poliza
			if (facturaCabecera.getObservacion() != null
					&& facturaCabecera.getObservacion() != ""
					&& !facturaCabecera.getObservacion().isEmpty()) {
				StringBuffer sb = new StringBuffer();
				ArrayList<String> listaSaltoLineaObservaciones = new ArrayList<String>();
				String[] spliteo = facturaCabecera.getObservacion()
						.replace("\n", " ").replace("\r", " ").trim()
						.split("[\\s]");
				int contador = 0;
				for (int i = 0; i < spliteo.length; i++) {
					if (contador >= 240) {
						listaSaltoLineaObservaciones.add(sb.toString());
						sb = new StringBuffer();
						sb.append(spliteo[i] + " ");
						contador = sb.length();
					}else if(i == spliteo.length - 1){
						sb.append(spliteo[i] + " ");
						listaSaltoLineaObservaciones.add(sb.toString());
					} else if (contador < 250) {
						sb.append(spliteo[i] + " ");
						contador = sb.length();
					}	
				}
				if (listaSaltoLineaObservaciones.size() > 0) {
					for (String observacion : listaSaltoLineaObservaciones) {
						if (AdicionalObservacion == 17) {
							break;
						}
						bw.write("E;TipoAdicSunat;" + AdicionalObservacion+ ";01" + v_lineSep);
						bw.write("E;NmrLineasAdicSunat;" + AdicionalObservacion+ ";"+AdicionalObservacion + v_lineSep);
						bw.write("E;DescripcionAdicSunat;"+ AdicionalObservacion + ";" + observacion+ v_lineSep);
						AdicionalObservacion++;
					}

				}
			}
			if (AdicionalObservacion >= 14) {
				int cont = AdicionalObservacion; 
				for (int i = cont; i < 18; i++) {
					bw.write("E;TipoAdicSunat;" + i + ";01"+ v_lineSep);
					bw.write("E;NmrLineasAdicSunat;" + i + ";"+i + v_lineSep);
					bw.write("E;DescripcionAdicSunat;" + i + ";" + "-"+ v_lineSep);
				}
			}
			// Asegurado

			bw.write("E;TipoAdicSunat;18;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;18;18" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;18;"+ validaNuloVacioComillas(facturaCabecera.getAsegurado())+ v_lineSep);

			//
			// Tipo Cambio Administratio
			bw.write("E;TipoAdicSunat;19;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;19;19" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;19;"+ facturaCabecera.getTipoCambio() 		        
					//27/10/2021 Se agrega texto sobre la forma de pago					
					+  (facturaCabecera.getTipoDocumento().matches("F|B")
							? facturaCabecera.getTextoFormaPago():"") + v_lineSep);
			
			
			bw.write("E;TipoAdicSunat;20;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;20;20" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;20;"+ facturaCabecera.getFecPago() + v_lineSep);
			
			// NOTAS INFERIORES DE LA FACTURA
			String[] adicionales = null;
			ArrayList<String> adicionalExtra = new ArrayList<String>();
			if (!facturaCabecera.getFacturaTexto1().isEmpty()
					&& facturaCabecera.getFacturaTexto1() != null
					&& facturaCabecera.getFacturaTexto1() != "") {
				adicionales = facturaCabecera.getFacturaTexto1().split("\r");
			}
			if (!facturaCabecera.getFacturaTexto2().isEmpty()
					&& facturaCabecera.getFacturaTexto2() != null
					&& facturaCabecera.getFacturaTexto2() != "") {
				StringBuffer sb = new StringBuffer();

				String[] spliteo = facturaCabecera.getFacturaTexto2()
						.replace("\n", " ").replace("\r", " ").trim()
						.split("[\\s]");
				int contador = 0;
				for (int i = 0; i < spliteo.length; i++) {
					if (contador >= 240) {
						adicionalExtra.add(sb.toString());
						sb = new StringBuffer();
						sb.append(spliteo[i] + " ");
						contador = sb.length();
					} else if(i == spliteo.length - 1){
						sb.append(spliteo[i] + " ");
						adicionalExtra.add(sb.toString());
					}else if (contador < 250) {
						sb.append(spliteo[i] + " ");
						contador = sb.length();
					}
					
				}
			}

			int cont = 21;
			int externo = 0;
			if (adicionales != null) {
				for (String adi : adicionales) {
					bw.write("E;TipoAdicSunat;" + cont + ";01"+ v_lineSep);
					bw.write("E;NmrLineasAdicSunat;" + cont + ";"+cont + v_lineSep);
					bw.write("E;DescripcionAdicSunat;" + cont + ";" + adi + v_lineSep);
					cont++;
				}
			}
			for (String adic : adicionalExtra) {
				bw.write("E;TipoAdicSunat;" + cont + ";01"+ v_lineSep);
				bw.write("E;NmrLineasAdicSunat;" + cont + ";"+cont + v_lineSep);
				bw.write("E;DescripcionAdicSunat;" + cont + ";"+ adic + v_lineSep);
				cont++;
			}
			if (adicionales == null) {
				externo = cont + 3;
				for (int i = externo - 3; i < externo; i++) {
					bw.write("E;TipoAdicSunat;" + i + ";01"+ v_lineSep);
					bw.write("E;NmrLineasAdicSunat;" + i + ";" +i+ v_lineSep);
					bw.write("E;DescripcionAdicSunat;" + i + ";"+ "-" + v_lineSep);
					cont++;
				}
			}
			if (adicionalExtra.size() == 0) {
				externo = cont + 3;
				for (int i = externo - 3; i < externo; i++) {
					bw.write("E;TipoAdicSunat;" + i + ";01" + v_lineSep);
					bw.write("E;NmrLineasAdicSunat;" + i + ";"+i + v_lineSep);
					bw.write("E;DescripcionAdicSunat;" + i + ";"+ "-" + v_lineSep);
					cont++;
				}
			}
			if(cont < 27){
				for(int i=cont; i < 27; i++){
					bw.write("E;TipoAdicSunat;" + i + ";01" + v_lineSep);
					bw.write("E;NmrLineasAdicSunat;" + i + ";"+i + v_lineSep);
					bw.write("E;DescripcionAdicSunat;" + i + ";"+ "-" + v_lineSep);
					cont++;
				}
			}
			
			bw.write("E;TipoAdicSunat;27;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;27;27" + v_lineSep);
			if(facturaCabecera.getFranquicia().equals("0.00") || facturaCabecera.getTipoNotaCredito().matches("1|2|3|6")){
				bw.write("E;DescripcionAdicSunat;27;0"+ v_lineSep);
			} else{
			
				bw.write("E;DescripcionAdicSunat;27;1"+ v_lineSep);
			}
			
			bw.write("E;TipoAdicSunat;28;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;28;28" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;28;"+facturaCabecera.getRazonSocial()+ v_lineSep);

			bw.write("E;TipoAdicSunat;29;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;29;29" + v_lineSep);
			if(Constantes.TIPE_PAGE_APLICATIVO.equals("4") && facturaCabecera.getSerie().equals("001")){
				bw.write("E;DescripcionAdicSunat;29;-" +v_lineSep);
			}else{
				bw.write("E;DescripcionAdicSunat;29;"+facturaCabecera.getTelefonoFax()+ v_lineSep);
			}
			
			bw.write("E;TipoAdicSunat;30;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;30;30" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;30;"+validaNuloVacioComillas(facturaCabecera.getDireccionSucursal())+ v_lineSep);
			
			bw.write("E;TipoAdicSunat;31;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;31;31" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;31;"+validaNuloVacioComillas(facturaCabecera.getTelefonoSucursal())+ v_lineSep);
			
			bw.write("E;TipoAdicSunat;32;01" + v_lineSep);
			bw.write("E;NmrLineasAdicSunat;32;32" + v_lineSep);
			bw.write("E;DescripcionAdicSunat;32;"+validaNuloVacioComillas(facturaCabecera.getEmailEmpresa())+ v_lineSep);
			
			if(Constantes.TIPE_PAGE_APLICATIVO.equals("4")){
				String logo = "-";
				bw.write("E;TipoAdicSunat;33;01" + v_lineSep);
				bw.write("E;NmrLineasAdicSunat;33;33" + v_lineSep);
				if(facturaCabecera.getSerie().equals("001")){
					logo= "Service";
				}else if(facturaCabecera.getSerie().equals("002")){
					logo= "Parts";
				}
				bw.write("E;DescripcionAdicSunat;33;"+validaNuloVacioComillas(logo)+ v_lineSep);
				
			}		
			
			//-- Adicionales : Tipo 02 (Items q solo tienen descripcion : serv.contenidos, rptos con doble linea - solo la 2da linea)
			for (String detItem : detalleItem) {
				bw.write(detItem);
			}			
			
			if(Constantes.TIPE_PAGE_APLICATIVO.matches("3|4")){
				facturaCabecera.setClienteEmail(UtilString.defineString(facturaCabecera.getClienteEmail()));
				if(!facturaCabecera.getClienteEmail().isEmpty()){
					if(UtilString.emailValido(facturaCabecera.getClienteEmail())){
						bw.write("M;NroLinMail;1;01"+ v_lineSep);
						bw.write("M;MailEnvi;1;"+facturaCabecera.getClienteEmail()+ v_lineSep);
						if(Constantes.TIPE_PAGE_APLICATIVO.matches("3")){
							bw.write("M;MailCCO;1;envio.electronica@eacorp.pe"+ v_lineSep);
						}else if(Constantes.TIPE_PAGE_APLICATIVO.matches("4")){
							bw.write("M;MailCCO;1;envio.electronica@eanet.pe"+ v_lineSep);
						}
					}
				}
			}
			
			/***************** TONY ************************/
			//-- Adicionales : Tipo 02 (Horas Hombre)
			v_linea_hh = 1;  //-- Reinicar el contador para luego reemplazar el contenido
			int v_hh = 1;
			for (String detItem : det_item_hh){
				//-- Si se termina los 4 cuatro parametros en HH, se incrementa en 1
				if(v_hh == 5){
					detalleAdicional++;
					v_linea_hh++;
					v_hh = 1;
				}
				detItem = detItem.replaceAll("NEW_CORRELATIVO_HH_"+v_linea_hh, ""+detalleAdicional);
				//logger.info("detItem : "+detItem);
				bw.write(detItem);
				v_hh++;
			}
			
			//-- Adicionales : Tipo 02 (Costo Horas Hombre)
			v_linea_chh = 1; //-- Reinicar el contador para luego reemplazar el contenido
			int v_chh = 1;
			for (int vi=0; vi < det_item_costo_hh.size(); vi++ ){  //- String detItem : det_item_costo_hh
				String detItem = det_item_costo_hh.get(vi);
				
				if(vi == 0){ detalleAdicional++; }
				
				//-- Si se termina los 4 cuatro parametros en Costo HH, se incrementa en 1
				if(v_chh == 5){
					detalleAdicional++;
					v_linea_chh++;
					v_chh = 1;
				}
				detItem = detItem.replaceAll("NEW_CORRELATIVO_CHH_"+v_linea_chh, ""+detalleAdicional);
				//logger.info("detItem : "+detItem);
				bw.write(detItem);
				v_chh++;
			}
			/***************** TONY ************************/

		logger.info("Generación de la factura a terminado correctamente: "+ facturaCabecera.getNroFactura());
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			logger.info("ERROR ESCRITURA ARCHIVO: " + e.getMessage());
			return false;
		} catch (IOException ex) {
			ex.printStackTrace();
			logger.info("ERROR ESCRITURA ARCHIVO: " + ex.getMessage());
			return false;
		} catch (Exception f) {
			logger.info("ERROR ESCRITURA ARCHIVO: " + f.getMessage());
			f.printStackTrace();
			return false;
		} finally {
			bw.close();
			try {
				logger.info("Inicio de copia  a sucursal: ".concat(rutaArchivo).concat("/").concat(nombreDelArchivo.concat(extensionTexto)));
				
				
				
				
				//Constantes.TIPE_PAGE_APLICATIVO.equals("4") ? :Constantes.RUTA_FILE_LINUX_FEEA_COPIA
				//String rutaDestinoCopia = Constantes.TIPE_PAGE_APLICATIVO.equals("4")?Constantes.RUTA_FILE_LINUX_FEEA_COPIA_EG :Constantes.RUTA_FILE_LINUX_FEEA_COPIA;
				
				String rutaDestinoCopia = "";
				if (v_so.toUpperCase().startsWith("WINDOWS")) {
					rutaDestinoCopia = v_ruta_raiz + "Facturacion_Digital"
							+ (Constantes.TIPE_PAGE_APLICATIVO.equals("4")
									? Constantes.RUTA_FILE_LINUX_FEEA_COPIA_EG
									: Constantes.RUTA_FILE_LINUX_FEEA_COPIA);
				} else {
					rutaDestinoCopia =(Constantes.TIPE_PAGE_APLICATIVO.equals("4")
							? Constantes.RUTA_FILE_LINUX_FEEA_COPIA_EG
							: Constantes.RUTA_FILE_LINUX_FEEA_COPIA);
				}
				if (!new File(rutaDestinoCopia).exists()) {					
					new File(rutaDestinoCopia).mkdirs();
					logger.info("Creando carpeta:"+new File(rutaDestinoCopia).exists());
				}		
				if (!new File(rutaDestinoCopia + nombreDelArchivo + extensionTexto).exists()) {				 
					new BufferedWriter(new OutputStreamWriter(
							new FileOutputStream(rutaDestinoCopia + nombreDelArchivo + extensionTexto), encoding))
									.close();
					logger.info("Creando archivo:"+new File(rutaDestinoCopia + nombreDelArchivo + extensionTexto).exists());
				}	
				logger.info("Ruta de la copia: " +rutaDestinoCopia+nombreDelArchivo+extensionTexto);
				copia(new File(rutaArchivo.concat("/").concat(nombreDelArchivo.concat(extensionTexto))),encoding,new File(rutaDestinoCopia+nombreDelArchivo+extensionTexto),encoding);
			} catch (Exception e) {
				logger.info("ERROR AL COPIAR DOCUMENTO" + facturaCabecera.getNroFactura());
				e.printStackTrace();
			}
		}
		
		
		return true;
	}

}

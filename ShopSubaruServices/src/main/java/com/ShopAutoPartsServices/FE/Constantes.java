package com.ShopAutoPartsServices.FE;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;

public class Constantes {

 
	public static final String TIPE_PAGE_APLICATIVO ="3"/*EA CORP S.A.C*/;
	// public static final String TIPE_PAGE_APLICATIVO = "4"/* EANET GLOBAL S.A.C */;
	public static final String PATH_DOCKER = System.getProperty("os.name").toUpperCase().startsWith("WINDOWS")?"": "/usr/local/tomcat/webapps";
	// public static final String RUTA_FILE_LINUX_FEEA =
	// "/eanetwork/facturacionelectronica/";
	// public static final String RUTA_FILE_LINUX_FEEA_EG =
	// "/eanetwork/facturacionelectronica/eanetglobal/";

	public static final String RUTA_FILE_LINUX_FEEA_EG = PATH_DOCKER+"/facturacionelectronica/"
			+ (TIPE_PAGE_APLICATIVO.equalsIgnoreCase("3") ? "subaruwork/"
					: (TIPE_PAGE_APLICATIVO.equalsIgnoreCase("4") ? "eanetwork/" : "otroswork/"));

	public static final String RUTA_FILE_LINUX_FEEA = PATH_DOCKER+"/facturacionelectronica/"
			+ (TIPE_PAGE_APLICATIVO.equalsIgnoreCase("3") ? "subaruwork/"
					: (TIPE_PAGE_APLICATIVO.equalsIgnoreCase("4") ? "eanetwork/" : "otroswork/"));

	public static final String DATETIME_PATTERN_SLASH_dd_MM_yyyy = "dd/MM/yyyy";
	public static final String DATETIME_PATTERN_yyyy_MM_dd = "yyyy-MM-dd";

	// public static final String RUTA_FILE_LINUX_FEEA_COPIA_EG =
	// "/mnt/eanetglobal/";
	// public static final String RUTA_FILE_LINUX_FEEA_COPIA = "/mnt/in/";

	public static final String RUTA_FILE_LINUX_FEEA_COPIA_EG =PATH_DOCKER+ "/facturacionelectronica/"
			+ (TIPE_PAGE_APLICATIVO.equalsIgnoreCase("3") ? "subaruin/"
					: (TIPE_PAGE_APLICATIVO.equalsIgnoreCase("4") ? "eanetin/" : "otrosin/"));

	public static final String RUTA_FILE_LINUX_FEEA_COPIA = PATH_DOCKER+"/facturacionelectronica/"
			+ (TIPE_PAGE_APLICATIVO.equalsIgnoreCase("3") ? "subaruin/"
					: (TIPE_PAGE_APLICATIVO.equalsIgnoreCase("4") ? "eanetin/" : "otrosin/"));

	public static final String RUTA_FILE_LINUX_FEEA_COPIA_EG1 = (System.getProperty("os.name").toUpperCase()
			.startsWith("WINDOWS") ? "" : "");
	public static final String RUTA_FILE_LINUX_FEEA_COPIA1 = "/usr/local/tomcat/webapps/facturacionelectronica/subaruin/";

	public final static String PATRON_FE = ";";
	public static final String LINEA_SEPERACION = System.getProperty("line.separator");
	public static final String PATRON_FEX2 = ";;";

	public static final String LISTAR_FACTURACION_ELECTRONICA_CABECERA_NC = "LISTAR_FACT_ELECT_CAB_NC(?)";
	public static final String SET_HEADER_FACTURANV = "SET_HEADER_FACTURANV(?)";
	public static final String SET_HEADER_FACTURAOS = "SET_HEADER_FACTURAOS(?)";
	public static final String LISTAR_FACTURACION_ELECTRONICA_CABECERA = "LISTAR_FACT_ELECT_CAB";
	public static final String SET_BODY_FACTURANV = "SET_BODY_FACTURANV(?)";
	public static final String SET_BODY_FACTURAPSSALES = "SET_BODY_FACTURAPSSALES(?)";
	public static final String SET_BODY_FACTURAOS = "SET_BODY_FACTURAOS(?)";
	public static final String LISTAR_FACTURACION_ELECTRONICA_DETALLE = "LISTAR_FACT_ELECT_DETALLE";
	public static final String SET_BODY_OC = "SET_BODY_OC(?)";
	public static String formatDecimalMiles(double number) {
		DecimalFormat df;
		DecimalFormatSymbols misimbolo;
		misimbolo = new DecimalFormatSymbols();
		misimbolo.setDecimalSeparator('.');
		misimbolo.setGroupingSeparator(',');
		String formato = "###,###,##0.00";
		df = new DecimalFormat(formato, misimbolo);
		return df.format(number);
	}

	public static String formatDecimalDecimales(double number) {
		DecimalFormat df;
		DecimalFormatSymbols misimbolo;
		misimbolo = new DecimalFormatSymbols();
		misimbolo.setDecimalSeparator('.');
		String formato = "########0.00";
		df = new DecimalFormat(formato, misimbolo);
		return df.format(number);
	}
    @SuppressWarnings("deprecation")
	public static String formatNumberString(double number, int numDecimal){
	     //-------------------------------------------------------------
   	 BigDecimal new_number = BigDecimal.ZERO;
   	 new_number = new BigDecimal(""+number); 
   	 new_number = new_number.setScale(numDecimal, BigDecimal.ROUND_HALF_UP);
   	 //-- Correcto   : new BigDecimal(""+number);  (solo si es el parametro : double)
   	 //-- Incorrecto : new BigDecimal(number);     (solo si es el parametro : double)
   	 //-------------------------------------------------------------
   	 DecimalFormat df;
	     DecimalFormatSymbols misimbolo;
	     misimbolo=new DecimalFormatSymbols();
	     misimbolo.setDecimalSeparator('.');
	     misimbolo.setGroupingSeparator(',');
	     String formato = "#####0.00";
	     if(numDecimal==5){ formato = "#####0.00000"; }
	     else if(numDecimal==4){ formato = "#####0.0000"; }
	     else if(numDecimal==3){ formato = "#####0.000"; }
	     else if(numDecimal==1){ formato = "#####0.0"; }
	     else if(numDecimal==0){ formato = "#####0"; }
	     df = new DecimalFormat(formato,misimbolo);
	     
	   return df.format(new_number);
	}
}

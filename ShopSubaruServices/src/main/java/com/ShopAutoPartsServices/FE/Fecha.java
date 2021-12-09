package com.ShopAutoPartsServices.FE;

/*	======================================================================
 *  FECHA: 09-04-2016
 * 	RESPONSABLE: Isaac Vel�squez 
 * 	CAMBIO: Se agrega m�todo getMes que retorna nombre seg�n indice
 *  =======================================================================
 * */

import java.text.SimpleDateFormat;
import java.util.Date;

public class Fecha {
	public static final String[] meses = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
			"Setiembre", "Octubre", "Noviembre", "Diciembre" };

	// Fin IV-09/05/2016
	static public String getMesIn(int mes) {
		return meses[mes];
	}

	static public String formatTimeByPattern(String strDate, String currentPattern, String toPattern) {
		if (strDate != null) {
			SimpleDateFormat dsReceived = new SimpleDateFormat(currentPattern);
			SimpleDateFormat ds = new SimpleDateFormat(toPattern);
			Date d = null;

			try {
				d = dsReceived.parse(strDate);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return ds.format(d);
		} else
			return null;
	}

}

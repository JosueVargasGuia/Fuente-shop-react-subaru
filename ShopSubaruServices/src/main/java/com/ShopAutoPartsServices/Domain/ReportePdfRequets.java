package com.ShopAutoPartsServices.Domain;

import com.ShopAutoPartsServices.Enums.TypeReporte;

public class ReportePdfRequets {
	String numFacturas;
	String numCodigoCotizacion;
	String chrCodigoOc;
	String chrCodigoGuia;
	String chrCodigoOcOnline;
	TypeReporte typeReporte;
  
	public String getNumCodigoCotizacion() {
		return numCodigoCotizacion;
	}

	public ReportePdfRequets setNumCodigoCotizacion(String numCodigoCotizacion) {
		this.numCodigoCotizacion = numCodigoCotizacion;
		return this;
	}
	
	public String getNumFacturas() {
		return numFacturas;
	}

	public ReportePdfRequets setNumFacturas(String numFacturas) {
		this.numFacturas = numFacturas;
		return this;
	}

	public TypeReporte getTypeReporte() {
		return typeReporte;
	}

	public ReportePdfRequets setTypeReporte(TypeReporte typeReporte) {
		this.typeReporte = typeReporte;
		return this;
	}

	public String getChrCodigoOc() {
		return chrCodigoOc;
	}

	public ReportePdfRequets setChrCodigoOc(String chrCodigoOc) {
		this.chrCodigoOc = chrCodigoOc;
		return this;
	}

	public String getChrCodigoGuia() {
		return chrCodigoGuia;
	}

	public ReportePdfRequets setChrCodigoGuia(String chrCodigoGuia) {
		this.chrCodigoGuia = chrCodigoGuia;
		return this;
	}

	public String getChrCodigoOcOnline() {
		return chrCodigoOcOnline;
	}

	public ReportePdfRequets setChrCodigoOcOnline(String chrCodigoOcOnline) {
		this.chrCodigoOcOnline = chrCodigoOcOnline;
		return this;
	}

	 

}

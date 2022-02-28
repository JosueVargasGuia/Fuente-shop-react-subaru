package com.ShopAutoPartsServices.Domain;

import java.math.BigDecimal;
import java.math.RoundingMode;

import com.ShopAutoPartsServices.Enums.MetodoEnvio;
import com.ShopAutoPartsServices.Enums.TipoActualizacionCotizacionDetalle;

public class CotizacionOnlineDetalle {
	int numCodigoCotizacionOnline;
	int numcodCotizacionOnlinedet;
	TipoActualizacionCotizacionDetalle tipoActualizacionCotizacionDetalle; 
	MetodoEnvio metodoEnvio=MetodoEnvio.RecojoAlmacen;
	Producto producto;
	int numCantidad;
	/*BigDecimal numCostoEnvioSol=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	BigDecimal numCostoEnvioDol=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);*/
	
	String numSubTotalSol="00.00";
	String numSubTotalSolIgv="00.00";
	String numIgvSol="00.00";
	String numTotalSol="00.00";

	String numSubTotalDol="00.00";
	String numSubTotalDolIgv="00.00";
	String numIgvDol="00.00";
	String numTotalDol="00.00";
	
	String numPrecioUnitarioDol="00.00";
	String numPrecioUnitarioSol="00.00";
	String numPrecioUnitarioDolIgv="00.00";
	String numPrecioUnitarioSolIgv="00.00";
	
	String numTotalDisplay="00.00";
	
	Response response = new Response();
	String chrSrcImagen;
	String chrType;
	
	
	public String getNumPrecioUnitarioDolIgv() {
		return numPrecioUnitarioDolIgv;
	}
	public void setNumPrecioUnitarioDolIgv(String numPrecioUnitarioDolIgv) {
		this.numPrecioUnitarioDolIgv = numPrecioUnitarioDolIgv;
	}
	public String getNumPrecioUnitarioSolIgv() {
		return numPrecioUnitarioSolIgv;
	}
	public void setNumPrecioUnitarioSolIgv(String numPrecioUnitarioSolIgv) {
		this.numPrecioUnitarioSolIgv = numPrecioUnitarioSolIgv;
	}
	public int getNumCodigoCotizacionOnline() {
		return numCodigoCotizacionOnline;
	}
	public void setNumCodigoCotizacionOnline(int numCodigoCotizacionOnline) {
		this.numCodigoCotizacionOnline = numCodigoCotizacionOnline;
	}
	public int getNumcodCotizacionOnlinedet() {
		return numcodCotizacionOnlinedet;
	}
	public void setNumcodCotizacionOnlinedet(int numcodCotizacionOnlinedet) {
		this.numcodCotizacionOnlinedet = numcodCotizacionOnlinedet;
	}
	public TipoActualizacionCotizacionDetalle getTipoActualizacionCotizacionDetalle() {
		return tipoActualizacionCotizacionDetalle;
	}
	public void setTipoActualizacionCotizacionDetalle(
			TipoActualizacionCotizacionDetalle tipoActualizacionCotizacionDetalle) {
		this.tipoActualizacionCotizacionDetalle = tipoActualizacionCotizacionDetalle;
	}
	public MetodoEnvio getMetodoEnvio() {
		return metodoEnvio;
	}
	public void setMetodoEnvio(MetodoEnvio metodoEnvio) {
		this.metodoEnvio = metodoEnvio;
	}
	public Producto getProducto() {
		return producto;
	}
	public void setProducto(Producto producto) {
		this.producto = producto;
	}
	public int getNumCantidad() {
		return numCantidad;
	}
	public void setNumCantidad(int numCantidad) {
		this.numCantidad = numCantidad;
	}
	public String getNumSubTotalSol() {
		return numSubTotalSol;
	}
	public void setNumSubTotalSol(String numSubTotalSol) {
		this.numSubTotalSol = numSubTotalSol;
	}
	public String getNumIgvSol() {
		return numIgvSol;
	}
	public void setNumIgvSol(String numIgvSol) {
		this.numIgvSol = numIgvSol;
	}
	public String getNumTotalSol() {
		return numTotalSol;
	}
	public void setNumTotalSol(String numTotalSol) {
		this.numTotalSol = numTotalSol;
	}
	public String getNumSubTotalDol() {
		return numSubTotalDol;
	}
	public void setNumSubTotalDol(String numSubTotalDol) {
		this.numSubTotalDol = numSubTotalDol;
	}
	public String getNumIgvDol() {
		return numIgvDol;
	}
	public void setNumIgvDol(String numIgvDol) {
		this.numIgvDol = numIgvDol;
	}
	public String getNumTotalDol() {
		return numTotalDol;
	}
	public void setNumTotalDol(String numTotalDol) {
		this.numTotalDol = numTotalDol;
	}
	public String getNumPrecioUnitarioDol() {
		return numPrecioUnitarioDol;
	}
	public void setNumPrecioUnitarioDol(String numPrecioUnitarioDol) {
		this.numPrecioUnitarioDol = numPrecioUnitarioDol;
	}
	public String getNumPrecioUnitarioSol() {
		return numPrecioUnitarioSol;
	}
	public void setNumPrecioUnitarioSol(String numPrecioUnitarioSol) {
		this.numPrecioUnitarioSol = numPrecioUnitarioSol;
	}
	public String getNumTotalDisplay() {
		return numTotalDisplay;
	}
	public void setNumTotalDisplay(String numTotalDisplay) {
		this.numTotalDisplay = numTotalDisplay;
	}
	public Response getResponse() {
		return response;
	}
	public void setResponse(Response response) {
		this.response = response;
	}
	public String getChrSrcImagen() {
		return chrSrcImagen;
	}
	public void setChrSrcImagen(String chrSrcImagen) {
		this.chrSrcImagen = chrSrcImagen;
	}
	public String getChrType() {
		return chrType;
	}
	public void setChrType(String chrType) {
		this.chrType = chrType;
	}
	public String getNumSubTotalSolIgv() {
		return numSubTotalSolIgv;
	}
	public void setNumSubTotalSolIgv(String numSubTotalSolIgv) {
		this.numSubTotalSolIgv = numSubTotalSolIgv;
	}
	public String getNumSubTotalDolIgv() {
		return numSubTotalDolIgv;
	}
	public void setNumSubTotalDolIgv(String numSubTotalDolIgv) {
		this.numSubTotalDolIgv = numSubTotalDolIgv;
	}
	 

 

}

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
	
	BigDecimal numSubTotalSol=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	BigDecimal numIgvSol=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	BigDecimal numTotalSol=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);

	BigDecimal numSubTotalDol=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	BigDecimal numIgvDol=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	BigDecimal numTotalDol=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	BigDecimal numPrecioUnitarioDol=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	BigDecimal numPrecioUnitarioSol=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	
	
	BigDecimal numTotalDisplay=BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);	
	Response response = new Response();
	String chrSrcImagen;
	String chrType;
	public int getNumCodigoCotizacionOnline() {
		return numCodigoCotizacionOnline;
	}

	public CotizacionOnlineDetalle setNumCodigoCotizacionOnline(int numCodigoCotizacionOnline) {
		this.numCodigoCotizacionOnline = numCodigoCotizacionOnline;
		return this;
	}

	public int getNumcodCotizacionOnlinedet() {
		return numcodCotizacionOnlinedet;
	}

	public CotizacionOnlineDetalle setNumcodCotizacionOnlinedet(int numcodCotizacionOnlinedet) {
		this.numcodCotizacionOnlinedet = numcodCotizacionOnlinedet;
		return this;
	}

	 

	public Producto getProducto() {
		return producto;
	}

	public CotizacionOnlineDetalle setProducto(Producto producto) {
		this.producto = producto;
		return this;
	}

	public int getNumCantidad() {
		return numCantidad;
	}

	public CotizacionOnlineDetalle setNumCantidad(int numCantidad) {
		this.numCantidad = numCantidad;
		return this;
	}
/*
	public BigDecimal getNumCostoEnvioSol() {
		return numCostoEnvioSol;
	}

	public CotizacionOnlineDetalle setNumCostoEnvioSol(BigDecimal numCostoEnvioSol) {
		this.numCostoEnvioSol = numCostoEnvioSol;
		return this;
	}*/

	public BigDecimal getNumSubTotalSol() {
		return numSubTotalSol;
	}

	public CotizacionOnlineDetalle setNumSubTotalSol(BigDecimal numSubTotalSol) {
		this.numSubTotalSol = numSubTotalSol;
		return this;
	}

	public BigDecimal getNumIgvSol() {
		return numIgvSol;
	}

	public CotizacionOnlineDetalle setNumIgvSol(BigDecimal numIgvSol) {
		this.numIgvSol = numIgvSol;
		return this;
	}

	public BigDecimal getNumTotalSol() {
		return numTotalSol;
	}

	public CotizacionOnlineDetalle setNumTotalSol(BigDecimal numTotalSol) {
		this.numTotalSol = numTotalSol;
		return this;
	}
/*
	public BigDecimal getNumCostoEnvioDol() {
		return numCostoEnvioDol;
	}

	public CotizacionOnlineDetalle setNumCostoEnvioDol(BigDecimal numCostoEnvioDol) {
		this.numCostoEnvioDol = numCostoEnvioDol;
		return this;
	}*/

	public BigDecimal getNumSubTotalDol() {
		return numSubTotalDol;
	}

	public CotizacionOnlineDetalle setNumSubTotalDol(BigDecimal numSubTotalDol) {
		this.numSubTotalDol = numSubTotalDol;
		return this;
	}

	public BigDecimal getNumIgvDol() {
		return numIgvDol;
	}

	public CotizacionOnlineDetalle setNumIgvDol(BigDecimal numIgvDol) {
		this.numIgvDol = numIgvDol;
		return this;
	}

	public BigDecimal getNumTotalDol() {
		return numTotalDol;
	}

	public CotizacionOnlineDetalle setNumTotalDol(BigDecimal numTotalDol) {
		this.numTotalDol = numTotalDol;
		return this;
	}

	public BigDecimal getNumPrecioUnitarioDol() {
		return numPrecioUnitarioDol;
	}

	public CotizacionOnlineDetalle setNumPrecioUnitarioDol(BigDecimal numPrecioUnitarioDol) {
		this.numPrecioUnitarioDol = numPrecioUnitarioDol;
		return this;
	}

	public BigDecimal getNumPrecioUnitarioSol() {
		return numPrecioUnitarioSol;
	}

	public CotizacionOnlineDetalle setNumPrecioUnitarioSol(BigDecimal numPrecioUnitarioSol) {
		this.numPrecioUnitarioSol = numPrecioUnitarioSol;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public CotizacionOnlineDetalle setResponse(Response response) {
		this.response = response;
		return this;
	}

	 

	public String getChrSrcImagen() {
		return chrSrcImagen;
	}

	public CotizacionOnlineDetalle setChrSrcImagen(String chrSrcImagen) {
		this.chrSrcImagen = chrSrcImagen;
		return this;
	}

	public String getChrType() {
		return chrType;
	}

	public CotizacionOnlineDetalle setChrType(String chrType) {
		this.chrType = chrType;
		return this;
	}

	public TipoActualizacionCotizacionDetalle getTipoActualizacionCotizacionDetalle() {
		return tipoActualizacionCotizacionDetalle;
	}

	public CotizacionOnlineDetalle setTipoActualizacionCotizacionDetalle(
			TipoActualizacionCotizacionDetalle tipoActualizacionCotizacionDetalle) {
		this.tipoActualizacionCotizacionDetalle = tipoActualizacionCotizacionDetalle;
		return this;
	}

	public MetodoEnvio getMetodoEnvio() {
		return metodoEnvio;
	}

	public CotizacionOnlineDetalle setMetodoEnvio(MetodoEnvio metodoEnvio) {
		this.metodoEnvio = metodoEnvio;
		return this;
	}

	public BigDecimal getNumTotalDisplay() {
		return numTotalDisplay;
	}

	public CotizacionOnlineDetalle setNumTotalDisplay(BigDecimal numTotalDisplay) {
		this.numTotalDisplay = numTotalDisplay;
		return this;
	}

	@Override
	public String toString() {
		return "CotizacionOnlineDetalle [numCodigoCotizacionOnline=" + numCodigoCotizacionOnline
				+ ", numcodCotizacionOnlinedet=" + numcodCotizacionOnlinedet + ", tipoActualizacionCotizacionDetalle="
				+ tipoActualizacionCotizacionDetalle + ", metodoEnvio=" + metodoEnvio + ", producto=" + producto
				+ ", numCantidad=" + numCantidad + ", numSubTotalSol=" + numSubTotalSol + ", numIgvSol=" + numIgvSol
				+ ", numTotalSol=" + numTotalSol + ", numSubTotalDol=" + numSubTotalDol + ", numIgvDol=" + numIgvDol
				+ ", numTotalDol=" + numTotalDol + ", numPrecioUnitarioDol=" + numPrecioUnitarioDol
				+ ", numPrecioUnitarioSol=" + numPrecioUnitarioSol + ", numTotalDisplay=" + numTotalDisplay
				+ ", response=" + response + ", chrSrcImagen=" + chrSrcImagen + ", chrType=" + chrType + "]";
	}
 

 

}

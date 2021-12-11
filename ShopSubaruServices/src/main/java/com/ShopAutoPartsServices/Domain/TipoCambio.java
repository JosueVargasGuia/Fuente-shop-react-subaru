package com.ShopAutoPartsServices.Domain;

import java.math.BigDecimal;
import java.util.Date;

public class TipoCambio {
	Date fecha;
	BigDecimal tipoCambioCompra = BigDecimal.ZERO;
	BigDecimal tipoCambioVenta = BigDecimal.ZERO;
	Response response=new Response();

	public Date getFecha() {
		return fecha;
	}

	public TipoCambio setFecha(Date fecha) {
		this.fecha = fecha;
		return this;
	}

	public BigDecimal getTipoCambioCompra() {
		return tipoCambioCompra;
	}

	public TipoCambio setTipoCambioCompra(BigDecimal tipoCambioCompra) {
		this.tipoCambioCompra = tipoCambioCompra;
		return this;
	}

	public BigDecimal getTipoCambioVenta() {
		return tipoCambioVenta;
	}

	public TipoCambio setTipoCambioVenta(BigDecimal tipoCambioVenta) {
		this.tipoCambioVenta = tipoCambioVenta;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public TipoCambio setResponse(Response response) {
		this.response = response;
		return this;
	}

}

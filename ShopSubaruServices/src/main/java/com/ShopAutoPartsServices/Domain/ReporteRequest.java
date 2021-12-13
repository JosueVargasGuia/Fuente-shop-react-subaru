package com.ShopAutoPartsServices.Domain;

import java.util.Date;

public class ReporteRequest {
	Date dteInicio, dteFinal;

	public Date getDteInicio() {
		return dteInicio;
	}

	public ReporteRequest setDteInicio(Date dteInicio) {
		this.dteInicio = dteInicio;
		return this;
	}

	public Date getDteFinal() {
		return dteFinal;
	}

	public ReporteRequest setDteFinal(Date dteFinal) {
		this.dteFinal = dteFinal;
		return this;
	}

	@Override
	public String toString() {
		return "ReporteRequest [dteInicio=" + dteInicio + ", dteFinal=" + dteFinal + "]";
	}

}

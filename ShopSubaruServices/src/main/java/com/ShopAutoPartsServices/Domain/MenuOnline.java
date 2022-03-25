package com.ShopAutoPartsServices.Domain;

import java.util.List;

import com.ShopAutoPartsServices.Enums.CRUD;

public class MenuOnline {
	String vchrCodigo, vchrDescripcion, bloSrcImg, chrTypeImg, vchrGrupo;
	List<String> vchrSubFamilia, vchrPalabraClave;
	CRUD crud;
	int numSecuencia;
	String  status;
	public String getVchrCodigo() {
		return vchrCodigo;
	}
	public void setVchrCodigo(String vchrCodigo) {
		this.vchrCodigo = vchrCodigo;
	}
	public String getVchrDescripcion() {
		return vchrDescripcion;
	}
	public void setVchrDescripcion(String vchrDescripcion) {
		this.vchrDescripcion = vchrDescripcion;
	}
	public String getBloSrcImg() {
		return bloSrcImg;
	}
	public void setBloSrcImg(String bloSrcImg) {
		this.bloSrcImg = bloSrcImg;
	}
	public String getChrTypeImg() {
		return chrTypeImg;
	}
	public void setChrTypeImg(String chrTypeImg) {
		this.chrTypeImg = chrTypeImg;
	}
	public String getVchrGrupo() {
		return vchrGrupo;
	}
	public void setVchrGrupo(String vchrGrupo) {
		this.vchrGrupo = vchrGrupo;
	}
	public List<String> getVchrSubFamilia() {
		return vchrSubFamilia;
	}
	public void setVchrSubFamilia(List<String> vchrSubFamilia) {
		this.vchrSubFamilia = vchrSubFamilia;
	}
	public List<String> getVchrPalabraClave() {
		return vchrPalabraClave;
	}
	public void setVchrPalabraClave(List<String> vchrPalabraClave) {
		this.vchrPalabraClave = vchrPalabraClave;
	}
	public int getNumSecuencia() {
		return numSecuencia;
	}
	public void setNumSecuencia(int numSecuencia) {
		this.numSecuencia = numSecuencia;
	}
	public CRUD getCrud() {
		return crud;
	}
	public void setCrud(CRUD crud) {
		this.crud = crud;
	}
	
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "MenuOnline [vchrCodigo=" + vchrCodigo + ", vchrDescripcion=" + vchrDescripcion + ", bloSrcImg="
				+ bloSrcImg + ", chrTypeImg=" + chrTypeImg + ", vchrGrupo=" + vchrGrupo + ", vchrSubFamilia="
				+ vchrSubFamilia + ", vchrPalabraClave=" + vchrPalabraClave + ", crud=" + crud + ", numSecuencia="
				+ numSecuencia + "]";
	}

	 
}

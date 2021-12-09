package com.ShopAutoPartsServices.Domain.IziPay;

import com.ShopAutoPartsServices.Enums.EstadoCotizacion;

public class IpnRequets {
	String krHash;
	String krHashAlgorithm;
	String krHashKey;
	String krAnswerType;
	String krAnswer;
	int numCodigoCotizacionOnline;	
	EstadoCotizacion estadoCotizacion;
	String status;
	String statusAction;
	String uuid;
	String legacyTransId;	
	public String getKrHash() {
		return krHash;
	}
	public IpnRequets setKrHash(String krHash) {
		this.krHash = krHash;
		return this;
	}
	public String getKrHashAlgorithm() {
		return krHashAlgorithm;
	}
	public IpnRequets setKrHashAlgorithm(String krHashAlgorithm) {
		this.krHashAlgorithm = krHashAlgorithm;
		return this;
	}
	public String getKrHashKey() {
		return krHashKey;
	}
	public IpnRequets setKrHashKey(String krHashKey) {
		this.krHashKey = krHashKey;
		return this;
	}
	public String getKrAnswerType() {
		return krAnswerType;
	}
	public IpnRequets setKrAnswerType(String krAnswerType) {
		this.krAnswerType = krAnswerType;
		return this;
	}
	public String getKrAnswer() {
		return krAnswer;
	}
	public IpnRequets setKrAnswer(String krAnswer) {
		this.krAnswer = krAnswer;
		return this;
	}
	public int getNumCodigoCotizacionOnline() {
		return numCodigoCotizacionOnline;
	}
	public IpnRequets setNumCodigoCotizacionOnline(int numCodigoCotizacionOnline) {
		this.numCodigoCotizacionOnline = numCodigoCotizacionOnline;
		return this;
	}
	public EstadoCotizacion getEstadoCotizacion() {
		return estadoCotizacion;
	}
	public IpnRequets setEstadoCotizacion(EstadoCotizacion estadoCotizacion) {
		this.estadoCotizacion = estadoCotizacion;
		return this;
	}
	public String getStatus() {
		return status;
	}
	public IpnRequets setStatus(String status) {
		this.status = status;
		return this;
	}
	public String getStatusAction() {
		return statusAction;
	}
	public IpnRequets setStatusAction(String statusAction) {
		this.statusAction = statusAction;
		return this;
	}
	public String getUuid() {
		return uuid;
	}
	public IpnRequets setUuid(String uuid) {
		this.uuid = uuid;
		return this;
	}
	public String getLegacyTransId() {
		return legacyTransId;
	}
	public IpnRequets setLegacyTransId(String legacyTransId) {
		this.legacyTransId = legacyTransId;
		return this;
	}
	 
}

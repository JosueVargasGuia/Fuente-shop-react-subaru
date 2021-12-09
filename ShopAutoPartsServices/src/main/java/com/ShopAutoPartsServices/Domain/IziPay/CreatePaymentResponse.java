package com.ShopAutoPartsServices.Domain.IziPay;

import com.ShopAutoPartsServices.Domain.Response;

public class CreatePaymentResponse {
	String webService, version, applicationVersion, status, ticket, serverDate, applicationProvider, metadata, _type,
			type;
	Answer answer = new Answer();
	
	/*
	 * webService version applicationVersion status ticket serverDate
	 * applicationProvider metadata _type
	 */	
	
	public CreatePaymentResponse() {
	}

	public String getType() {
		return type;
	}

	public CreatePaymentResponse setType(String type) {
		this.type = type;
		return this;
	}

	public String getWebService() {
		return webService;
	}

	public CreatePaymentResponse setWebService(String webService) {
		this.webService = webService;
		return this;
	}

	public String getVersion() {
		return version;
	}

	public CreatePaymentResponse setVersion(String version) {
		this.version = version;
		return this;
	}

	public String getApplicationVersion() {
		return applicationVersion;
	}

	public CreatePaymentResponse setApplicationVersion(String applicationVersion) {
		this.applicationVersion = applicationVersion;
		return this;
	}

	public String getStatus() {
		return status;
	}

	public CreatePaymentResponse setStatus(String status) {
		this.status = status;
		return this;
	}

	public String getTicket() {
		return ticket;
	}

	public CreatePaymentResponse setTicket(String ticket) {
		this.ticket = ticket;
		return this;
	}

	public String getServerDate() {
		return serverDate;
	}

	public CreatePaymentResponse setServerDate(String serverDate) {
		this.serverDate = serverDate;
		return this;
	}

	public String getApplicationProvider() {
		return applicationProvider;
	}

	public CreatePaymentResponse setApplicationProvider(String applicationProvider) {
		this.applicationProvider = applicationProvider;
		return this;
	}

	public String getMetadata() {
		return metadata;
	}

	public CreatePaymentResponse setMetadata(String metadata) {
		this.metadata = metadata;
		return this;
	}

	public String get_type() {
		return _type;
	}

	public CreatePaymentResponse set_type(String _type) {
		this._type = _type;
		return this;
	}

	public Answer getAnswer() {
		return answer;
	}

	public CreatePaymentResponse setAnswer(Answer answer) {
		this.answer = answer;
		return this;
	}

	@Override
	public String toString() {
		return "CreatePaymentResponse [webService=" + webService + ", version=" + version + ", applicationVersion="
				+ applicationVersion + ", status=" + status + ", ticket=" + ticket + ", serverDate=" + serverDate
				+ ", applicationProvider=" + applicationProvider + ", metadata=" + metadata + ", _type=" + _type
				+ ", type=" + type + ", answer=" + answer.toString() + "]";
	}
}

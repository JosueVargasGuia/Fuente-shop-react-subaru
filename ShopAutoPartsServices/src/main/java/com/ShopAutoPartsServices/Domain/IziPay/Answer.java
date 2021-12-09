package com.ShopAutoPartsServices.Domain.IziPay;

import java.util.ArrayList;

public class Answer {

	String formToken;

	String shopId, orderCycle, orderStatus, serverDate;
	String subMerchantDetails, _type;
	OrderDetails orderDetails;
	String errorCode;
	String errorMessage;
	String detailedErrorCode;
	String detailedErrorMessage; 
	
	ArrayList<Transaction>transactions=new ArrayList<Transaction>();
	public String getFormToken() {
		return formToken;
	}

	public Answer setFormToken(String formToken) {
		this.formToken = formToken;
		return this;
	}

	public String getShopId() {
		return shopId;
	}

	public Answer setShopId(String shopId) {
		this.shopId = shopId;
		return this;
	}

	public String getOrderCycle() {
		return orderCycle;
	}

	public Answer setOrderCycle(String orderCycle) {
		this.orderCycle = orderCycle;
		return this;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public Answer setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
		return this;
	}

	public String getServerDate() {
		return serverDate;
	}

	public Answer setServerDate(String serverDate) {
		this.serverDate = serverDate;
		return this;
	}

	public String getSubMerchantDetails() {
		return subMerchantDetails;
	}

	public Answer setSubMerchantDetails(String subMerchantDetails) {
		this.subMerchantDetails = subMerchantDetails;
		return this;
	}

	public String get_type() {
		return _type;
	}

	public Answer set_type(String _type) {
		this._type = _type;
		return this;
	}

	public OrderDetails getOrderDetails() {
		return orderDetails;
	}

	public Answer setOrderDetails(OrderDetails orderDetails) {
		this.orderDetails = orderDetails;
		return this;
	}

	public ArrayList<Transaction> getTransactions() {
		return transactions;
	}

	public Answer setTransactions(ArrayList<Transaction> transactions) {
		this.transactions = transactions;
		return this;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public Answer setErrorCode(String errorCode) {
		this.errorCode = errorCode;
		return this;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public Answer setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
		return this;
	}

	public String getDetailedErrorCode() {
		return detailedErrorCode;
	}

	public Answer setDetailedErrorCode(String detailedErrorCode) {
		this.detailedErrorCode = detailedErrorCode;
		return this;
	}

	public String getDetailedErrorMessage() {
		return detailedErrorMessage;
	}

	public Answer setDetailedErrorMessage(String detailedErrorMessage) {
		this.detailedErrorMessage = detailedErrorMessage;
		return this;
	}

	@Override
	public String toString() {
		return "Answer [formToken=" + formToken + ", shopId=" + shopId + ", orderCycle=" + orderCycle + ", orderStatus="
				+ orderStatus + ", serverDate=" + serverDate + ", subMerchantDetails=" + subMerchantDetails + ", _type="
				+ _type + ", orderDetails=" + orderDetails + ", errorCode=" + errorCode + ", errorMessage="
				+ errorMessage + ", detailedErrorCode=" + detailedErrorCode + ", detailedErrorMessage="
				+ detailedErrorMessage + ", transactions=" + transactions + "]";
	}
 
}

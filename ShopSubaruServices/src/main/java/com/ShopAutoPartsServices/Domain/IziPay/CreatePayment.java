package com.ShopAutoPartsServices.Domain.IziPay;

public class CreatePayment {
	String amount;
	String orderId;
	Customer customer;
	/* valores por defecto */
	final String currency = "USD";
	final String formAction = "PAYMENT";

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getCurrency() {
		return currency;
	}

	public String getFormAction() {
		return formAction;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	@Override
	public String toString() {
		return "CreatePayment [amount=" + amount + ", orderId=" + orderId + ", customer=" + customer.toString() + ", currency="
				+ currency + ", formAction=" + formAction + "]";
	}

	 

	 

}

package com.ShopAutoPartsServices.Domain.IziPay;

public class Customer {
	String reference;
	String email;
	BillingDetails billingDetails; 
	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public BillingDetails getBillingDetails() {
		return billingDetails;
	}

	public void setBillingDetails(BillingDetails billingDetails) {
		this.billingDetails = billingDetails;
	}

	@Override
	public String toString() {
		return "Customer [reference=" + reference + ", email=" + email + ", billingDetails=" + billingDetails.toString() + "]";
	}

	 

}

package com.ShopAutoPartsServices.Domain.IziPay;

public class Transaction {
	String uuid;
	TransactionDetails transactionDetails=new TransactionDetails();

	public String getUuid() {
		return uuid;
	}

	public Transaction setUuid(String uuid) {
		this.uuid = uuid;
		return this;
	}

	public TransactionDetails getTransactionDetails() {
		return transactionDetails;
	}

	public Transaction setTransactionDetails(TransactionDetails transactionDetails) {
		this.transactionDetails = transactionDetails;
		return this;
	}

}

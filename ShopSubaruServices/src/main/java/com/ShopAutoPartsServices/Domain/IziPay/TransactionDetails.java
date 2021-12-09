package com.ShopAutoPartsServices.Domain.IziPay;

public class TransactionDetails {
	CardDetails cardDetails=new CardDetails();

	public CardDetails getCardDetails() {
		return cardDetails;
	}

	public TransactionDetails setCardDetails(CardDetails cardDetails) {
		this.cardDetails = cardDetails;
		return this;
	} 
	
}

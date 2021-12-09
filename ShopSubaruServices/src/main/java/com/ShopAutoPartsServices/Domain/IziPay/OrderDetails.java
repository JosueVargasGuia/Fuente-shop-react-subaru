package com.ShopAutoPartsServices.Domain.IziPay;

public class OrderDetails {
	String orderTotalAmount, orderEffectiveAmount, orderCurrency, mode, orderId, _type;

	public String getOrderTotalAmount() {
		return orderTotalAmount;
	}

	public OrderDetails setOrderTotalAmount(String orderTotalAmount) {
		this.orderTotalAmount = orderTotalAmount;
		return this;
	}

	public String getOrderEffectiveAmount() {
		return orderEffectiveAmount;
	}

	public OrderDetails setOrderEffectiveAmount(String orderEffectiveAmount) {
		this.orderEffectiveAmount = orderEffectiveAmount;
		return this;
	}

	public String getOrderCurrency() {
		return orderCurrency;
	}

	public OrderDetails setOrderCurrency(String orderCurrency) {
		this.orderCurrency = orderCurrency;
		return this;
	}

	public String getMode() {
		return mode;
	}

	public OrderDetails setMode(String mode) {
		this.mode = mode;
		return this;
	}

	public String getOrderId() {
		return orderId;
	}

	public OrderDetails setOrderId(String orderId) {
		this.orderId = orderId;
		return this;
	}

	public String get_type() {
		return _type;
	}

	public OrderDetails set_type(String _type) {
		this._type = _type;
		return this;
	}

	@Override
	public String toString() {
		return "OrderDetails [orderTotalAmount=" + orderTotalAmount + ", orderEffectiveAmount=" + orderEffectiveAmount
				+ ", orderCurrency=" + orderCurrency + ", mode=" + mode + ", orderId=" + orderId + ", _type=" + _type
				+ "]";
	}

}

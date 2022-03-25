package com.ShopAutoPartsServices.Domain;

import java.util.List;

public class MenuOnlineResponse {
	Response response=new Response();
	MenuOnline menuOnline=new MenuOnline();
	List<MenuOnline>listaMenu;
	public Response getResponse() {
		return response;
	}

	public void setResponse(Response response) {
		this.response = response;
	}

	public MenuOnline getMenuOnline() {
		return menuOnline;
	}

	public void setMenuOnline(MenuOnline menuOnline) {
		this.menuOnline = menuOnline;
	}

	public List<MenuOnline> getListaMenu() {
		return listaMenu;
	}

	public void setListaMenu(List<MenuOnline> listaMenu) {
		this.listaMenu = listaMenu;
	}

}

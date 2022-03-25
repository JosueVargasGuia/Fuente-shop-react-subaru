package com.ShopAutoPartsServices.Service;

import java.util.List;

import com.ShopAutoPartsServices.Domain.CorreoJobsOnline;
import com.ShopAutoPartsServices.Domain.MenuOnline;

public interface UtilService {

	List<CorreoJobsOnline> obtenerListaCorreoJobs(CorreoJobsOnline correoJobsOnline)throws Exception;

	void registrarCorreo(CorreoJobsOnline correoJobsOnline)throws Exception;

	boolean validarScheduledCorrreo(String scheduled)throws Exception;

	MenuOnline saveUpdateMenu(MenuOnline menuOnline)throws Exception;

	List<MenuOnline> obtenerListaMenu()throws Exception;

}

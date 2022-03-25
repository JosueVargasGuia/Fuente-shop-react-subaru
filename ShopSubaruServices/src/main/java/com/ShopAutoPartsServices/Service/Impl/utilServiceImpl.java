package com.ShopAutoPartsServices.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ShopAutoPartsServices.Domain.CorreoJobsOnline;
import com.ShopAutoPartsServices.Domain.MenuOnline;
import com.ShopAutoPartsServices.Repository.UtilServiceRepository;
 
import com.ShopAutoPartsServices.Service.UtilService;

 
@Service
public class utilServiceImpl implements UtilService{
	@Autowired
	private UtilServiceRepository utilServiceRepository;

	@Override
	public List<CorreoJobsOnline> obtenerListaCorreoJobs(CorreoJobsOnline correoJobsOnline)throws Exception {
		// TODO Auto-generated method stub
		return utilServiceRepository.obtenerListaCorreoJobs(correoJobsOnline);
	}

	@Override
	public void registrarCorreo(CorreoJobsOnline correoJobsOnline) throws Exception {
		utilServiceRepository.registrarCorreo(correoJobsOnline);
		
	}

	@Override
	public boolean validarScheduledCorrreo(String scheduled) throws Exception {
		// TODO Auto-generated method stub
		return utilServiceRepository.validarScheduledCorrreo(scheduled);
	}

	@Override
	public MenuOnline saveUpdateMenu(MenuOnline menuOnline)throws Exception {
		return utilServiceRepository.saveUpdateMenu(menuOnline);
	}

	@Override
	public List<MenuOnline> obtenerListaMenu() throws Exception {
		// TODO Auto-generated method stub
		return utilServiceRepository.obtenerListaMenu();
	}
}

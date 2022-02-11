package com.ShopAutoPartsServices.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ShopAutoPartsServices.Domain.CorreoJobsOnline;
import com.ShopAutoPartsServices.Repository.CorreoJobsServiceRepository;
import com.ShopAutoPartsServices.Service.CorreoJobsService;

 
@Service
public class CorreoJobsServiceImpl implements CorreoJobsService{
	@Autowired
	private CorreoJobsServiceRepository correoJobsServiceRepository;

	@Override
	public List<CorreoJobsOnline> obtenerListaCorreoJobs(CorreoJobsOnline correoJobsOnline)throws Exception {
		// TODO Auto-generated method stub
		return correoJobsServiceRepository.obtenerListaCorreoJobs(correoJobsOnline);
	}

	@Override
	public void registrarCorreo(CorreoJobsOnline correoJobsOnline) throws Exception {
		correoJobsServiceRepository.registrarCorreo(correoJobsOnline);
		
	}

	@Override
	public boolean validarScheduledCorrreo(String scheduled) throws Exception {
		// TODO Auto-generated method stub
		return correoJobsServiceRepository.validarScheduledCorrreo(scheduled);
	}
}

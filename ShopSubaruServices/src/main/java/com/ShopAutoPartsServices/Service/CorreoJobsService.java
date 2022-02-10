package com.ShopAutoPartsServices.Service;

import java.util.List;

import com.ShopAutoPartsServices.Domain.CorreoJobsOnline;

public interface CorreoJobsService {

	List<CorreoJobsOnline> obtenerListaCorreoJobs(CorreoJobsOnline correoJobsOnline)throws Exception;

	void registrarCorreo(CorreoJobsOnline correoJobsOnline)throws Exception;

	boolean validarScheduledCorrreo(String scheduled)throws Exception;

}
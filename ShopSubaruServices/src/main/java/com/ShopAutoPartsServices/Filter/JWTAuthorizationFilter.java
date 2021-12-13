package com.ShopAutoPartsServices.Filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.filter.OncePerRequestFilter;

import com.ShopAutoPartsServices.Config.UrlAccess;
import com.ShopAutoPartsServices.ServiceConfiguracion.JwtEnum;

import io.jsonwebtoken.Claims;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends OncePerRequestFilter {
	Logger logger = LoggerFactory.getLogger(JWTAuthorizationFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		UrlAccess urlAccess = new UrlAccess();
		String path = request.getRequestURI().substring(request.getContextPath().length());
		String method = request.getMethod();
		String authorization = request.getHeader(JwtEnum.AUTHORIZATION.getContex());
		 
		if ((urlAccess.getAdministrador().contains(path) || urlAccess.getPrivado().contains(path))
				&& !method.equalsIgnoreCase("OPTIONS")) {
			if (isBearer(authorization)) {
				String jwtToken = request.getHeader(JwtEnum.AUTHORIZATION.getContex())
						.replace(JwtEnum.BEARER.getContex(), "");
				try {
					Claims claims = validateToken(jwtToken);
					if (claims.get(JwtEnum.AUTHORITIES.getContex()) != null) {
						List<String> authorities = (List) claims.get(JwtEnum.AUTHORITIES.getContex());
						UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
								claims.getSubject(), null,
								authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
						SecurityContextHolder.getContext().setAuthentication(auth);
						//logger.info(String.format("%s %s %s %s %s", "Aceso autorizado", path, method,	isBearer(authorization), authorization));
					} else {
						//logger.info(String.format("%s %s %s %s %s", "Sin Autorizacion", path, method,		isBearer(authorization), authorization));
						SecurityContextHolder.clearContext();
					}
					chain.doFilter(request, response);
				} catch (JwtException e) {
					logger.info(String.format("%s %s %s %s %s", "Aceso SC_UNAUTHORIZED", path, method,
							isBearer(authorization), authorization));
					logger.info("JwtException " + HttpServletResponse.SC_UNAUTHORIZED + " " + e.getMessage());
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
					return;
				}
			}
		} else {
			List<String> authorities = new ArrayList<String>();
			authorities.add(JwtEnum.ROLE_ANONIMO.getContex());
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
					JwtEnum.ROLE_ANONIMO.getContex(), JwtEnum.ROLE_ANONIMO.getContex(),
					authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
			SecurityContextHolder.getContext().setAuthentication(auth);
			//logger.info(String.format("%s %s %s %s %s", "Acceso Publico", path, method, isBearer(authorization),authorization));
			chain.doFilter(request, response);
		}
	}

	public boolean isBearer(String authorization) {
		return authorization != null && authorization.startsWith(JwtEnum.BEARER.getContex())
				&& authorization.split("\\.").length == 3;

	}

	public static Claims validateToken(String jwtToken) {

		return Jwts.parser().setSigningKey(JwtEnum.SECRET_KEY.getContex().getBytes()).parseClaimsJws(jwtToken)
				.getBody();
	}

	/**
	 * Metodo para autenticarnos dentro del flujo de Spring
	 * 
	 * @param claims
	 */
	private void setUpSpringAuthentication(Claims claims) {
		@SuppressWarnings("unchecked")
		List<String> authorities = (List) claims.get(JwtEnum.AUTHORITIES.getContex());

		// UsernamePasswordAuthenticationToken auth = new
		// UsernamePasswordAuthenticationToken(claims.getSubject(), null,
		// authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
		// SecurityContextHolder.getContext().setAuthentication(auth);

	}

	/*
	 * private boolean existeJWTToken(HttpServletRequest request,
	 * HttpServletResponse res) { String authenticationHeader =
	 * request.getHeader(JwtEnum.AUTHORIZATION.getContex()); if
	 * (authenticationHeader == null ||
	 * !authenticationHeader.startsWith(JwtEnum.BEARER.getContex())) return false;
	 * return true; }
	 */
}

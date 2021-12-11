package com.ShopAutoPartsServices.ServiceConfiguracion;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

/*import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;;*/

import org.springframework.stereotype.Service;
import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService {

	public String createToken(ClienteUsuario clienteUsuario) {
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils
				.commaSeparatedStringToAuthorityList(clienteUsuario.getChrRol().getContex());
		// .commaSeparatedStringToAuthorityList(JwtEnum.ROLE_USER.getContex());
		int numHrs =3;
		int milesegundos = 3600000;//Equivalente a 1hrs
		 //milesegundos=10000;
		String token = Jwts.builder()
				// .setId("softtekJWT")
				.setSubject(clienteUsuario.getChrEmail()).setIssuedAt(new Date(System.currentTimeMillis()))
				.setNotBefore(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + (milesegundos * numHrs)))
				.claim(JwtEnum.AUTHORITIES.getContex(),
						grantedAuthorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.claim(JwtEnum.NUMCODIGOCLIENTE.getContex(), clienteUsuario.getNumCodigoCliente())
				.signWith(SignatureAlgorithm.HS512, JwtEnum.SECRET_KEY.getContex().getBytes()).compact();
		return token;
	}
}

package com.ShopAutoPartsServices;

import java.util.Collections;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.support.ErrorPageFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/*import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;*/

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ShopAutoPartsServices.Config.Empresa;
import com.ShopAutoPartsServices.Filter.JWTAuthorizationFilter;
import com.ShopAutoPartsServices.ServiceConfiguracion.JwtEnum;

@SpringBootApplication 

public class ShopAutoPartsServicesApplication {

	public static void main(String[] args) {
		// SpringApplication.run(ShopAutoPartsServicesApplication.class, args);
		SpringApplication app = new SpringApplication(ShopAutoPartsServicesApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port", "8086"));/**/
		app.getSources().remove(ErrorPageFilter.class);
		app.run(args);		
	}

	/*
	 * io.jsonwebtoken Configuracion
	 * https://blog.softtek.com/es/autenticando-apis-con-spring-y-jwt
	 */
	@EnableWebSecurity
	@Configuration
	class WebSecurityConfig extends WebSecurityConfigurerAdapter {

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			/*
			 * http.csrf().disable() .addFilterAfter(new
			 * JWTAuthorizationFilter(),UsernamePasswordAuthenticationFilter.class)
			 * .authorizeRequests()
			 * .antMatchers(HttpMethod.POST,"/service/suscripcion/**").hasAuthority(JwtEnum.
			 * ROLE_ANONIMO.getContex())
			 * .antMatchers(HttpMethod.POST,"/service/cotizacion/**").permitAll()
			 * .antMatchers(HttpMethod.POST,"/service/authorization/cliente**").permitAll()
			 * .anyRequest().authenticated();
			 * 
			 */
			http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
					.authorizeRequests()					 
					.antMatchers(HttpMethod.POST, "/service/authorization/cliente/**").permitAll()
					.antMatchers(HttpMethod.POST, "/service/suscripcion/registro").permitAll()
					.anyRequest().authenticated().and()
					.addFilterAfter(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
		}
	}
	/*
	 * @Bean public FilterRegistrationBean<JWTAuthorizationFilter>
	 * FilterJWTAuthorizationFilter() {
	 * FilterRegistrationBean<JWTAuthorizationFilter> registrationBean = new
	 * FilterRegistrationBean<>(); registrationBean.setFilter(new
	 * JWTAuthorizationFilter()); registrationBean.addUrlPatterns("/*"); return
	 * registrationBean; }
	 */

	/* BEAN DE ADMINISTRACION */
	/* CORS Configuracion */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/service/**")
				 .allowedOrigins("*")
				 
				 
				//Ip Publica
				//.allowedOrigins("http://190.81.61.102:3000")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").maxAge(3600);

			}

		};
	}
	/*
	 * Codificación de contraseña Configuracion
	 * https://www.baeldung.com/spring-security-registration-password-encoding-
	 * bcrypt URL de como hacer la validacion simple
	 * https://www.yawintutor.com/encode-decode-using-bcryptpasswordencoder-in-
	 * spring-boot-security/
	 */

	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

}
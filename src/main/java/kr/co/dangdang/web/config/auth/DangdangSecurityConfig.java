package kr.co.dangdang.web.config.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class DangdangSecurityConfig {
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		PasswordEncoder encoder = new BCryptPasswordEncoder();
//		System.out.println(encoder.encode("q1w2e3r4"));
		
		return encoder;
	}
	
	@Bean
	public SecurityFilterChain filterchain (HttpSecurity http) throws Exception {
		
		http.csrf(csrf->csrf.disable())
			.authorizeHttpRequests(
					authorize->authorize
					.requestMatchers("/member/**")
						.hasAnyRole("ADMIN", "MEMBER")
						.anyRequest().permitAll())
			.formLogin(
					form->form
					.loginPage("/user/login"))
			.logout(
					logout-> logout
					.logoutUrl("/user/logout")
					.logoutSuccessUrl("/index"));
		
		return http.build();
	}

}

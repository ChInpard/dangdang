package kr.co.dangdang.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
	
	@Bean
	public WebMvcConfigurer webMvxConfigurer() {
		
		WebMvcConfigurer config = new WebMvcConfigurer() {
			
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				
				registry
					.addMapping("/**")
						.allowedOrigins(
								"http://127.0.0.1:3000/",
								"http://127.0.0.1:3002/",
								"http://127.0.0.1:5500/")
						.allowedMethods("DELETE", "POST", "GET");
			}
		};
		
		return config;
	}
}
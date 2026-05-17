package com.api.gestioncitasmedicas.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Gestión de Citas Médicas")
                        .version("1.0.0")
                        .description("Sistema para la administración de citas médicas.")
                        .contact(new Contact()
                                .name("DAW-Grupo1")
                                .email("mo21016@ues.edu.sv")));
    }
}
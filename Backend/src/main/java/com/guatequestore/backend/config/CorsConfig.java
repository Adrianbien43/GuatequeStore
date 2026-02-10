package com.guatequestore.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Configuración CORS para permitir acceso desde los frontends
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // Aplicar CORS a todas las rutas
                registry.addMapping("/**")

                        // Frontends permitidos
                        .allowedOrigins(
                                "http://localhost:3000",  // React
                                "http://localhost:4200",  // Angular
                                "http://localhost:5173"   // Vue
                        )

                        // Métodos HTTP permitidos
                        .allowedMethods(
                                "GET",
                                "POST",
                                "PUT",
                                "DELETE",
                                "OPTIONS"
                        )

                        // Headers permitidos en la petición
                        .allowedHeaders(
                                "Authorization",   // Para enviar tokens JWT
                                "Content-Type",    // Para indicar tipo de datos
                                "Accept",          // Tipo de datos aceptados
                                "Origin"           // Origen de la petición
                        )

                        // Headers expuestos en la respuesta
                        .exposedHeaders(
                                "Authorization",       // Para leer tokens
                                "Content-Disposition"  // Para descargas de archivos
                        )

                        // Permitir enviar credenciales (cookies, tokens)
                        .allowCredentials(true)

                        // Tiempo de caché para preflight (1 hora)
                        .maxAge(3600); // 3600 segundos = 1 hora
            }
        };
    }
}

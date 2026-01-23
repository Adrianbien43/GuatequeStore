package com.guatequestore.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración CORS MEJORADA pero fácil de entender.
 *
 * Mejoras importantes:
 * 1. Solo permite métodos HTTP realmente necesarios
 * 2. Headers específicos en lugar de "*" (más seguro)
 * 3. Headers expuestos para que el frontend los pueda leer
 * 4. Tiempo de caché para mejorar el rendimiento
 *
 * @author Adrian Bienvenido
 * @version 1.1.0 (Mejorada pero simple)
 */
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // CONFIGURACIÓN PARA TODAS LAS RUTAS
                registry.addMapping("/**")

                        // QUIÉN PUEDE ACCEDER (tus frontends)
                        .allowedOrigins(
                                "http://localhost:3000",  // React
                                "http://localhost:4200",  // Angular
                                "http://localhost:5173"   // Vue
                        )

                        // QUÉ PUEDEN HACER (métodos HTTP)
                        .allowedMethods(
                                "GET",     // Obtener datos
                                "POST",    // Crear datos
                                "PUT",     // Actualizar datos
                                "DELETE",  // Eliminar datos
                                "OPTIONS"  // Preguntar qué puede hacer (automático)
                        )

                        // QUÉ PUEDEN ENVIAR (headers en la petición)
                        .allowedHeaders(
                                "Authorization",   // Para enviar tokens JWT
                                "Content-Type",    // Para decir qué tipo de datos envía
                                "Accept",          // Para decir qué tipo de datos acepta
                                "Origin"           // Para decir de dónde viene
                        )

                        // QUÉ PUEDEN LEER (headers en la respuesta)
                        .exposedHeaders(
                                "Authorization",       // Para leer tokens
                                "Content-Disposition"  // Para descargar archivos
                        )

                        // PUEDEN ENVIAR CREDENCIALES (cookies, tokens)
                        .allowCredentials(true)

                        // GUARDAR EN CACHÉ POR 1 HORA (mejor rendimiento)
                        .maxAge(3600); // 3600 segundos = 1 hora
            }
        };
    }
}
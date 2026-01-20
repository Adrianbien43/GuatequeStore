package com.guatequestore.backend.config;

import com.guatequestore.backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Desabilitar CSRF (es stateless, no aplica)
                .csrf(csrf -> csrf.disable())

                // Configuración de sesiones: stateless
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Configurar autorización
                .authorizeHttpRequests(authz -> authz
                        // Rutas públicas
                        .requestMatchers("/api/usuarios", "/api/usuarios/**", "/api/auth/login", "/api/auth/validate",                         "/api/almacenes",
                                "/api/almacenes/**",
                                "/api/productos",
                                "/api/productos/**",
                                "/api/proveedores",
                                "/api/proveedores/**",
                                "/api/pedidos",
                                "/api/pedidos/**",
                                "/api/inventario",
                                "/api/inventario/**").permitAll()

                        // Rutas protegidas
                        .anyRequest().authenticated()
                )

                // Configurar manejador de excepciones
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(401);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"codigo\": 401, \"mensaje\": \"No autorizado\"}");
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(403);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"codigo\": 403, \"mensaje\": \"Acceso denegado\"}");
                        })
                );

        // Agregar filtro JWT ANTES de UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
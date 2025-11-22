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

/**
 * Configuración de seguridad para la aplicación.
 *
 * Implementa autenticación sin estado (stateless) usando JWT.
 * No usa sesiones ni cookies.
 *
 * Flujo de autenticación:
 * 1. Cliente envía credenciales a POST /api/auth/login
 * 2. Se validan credenciales
 * 3. Se retorna token JWT
 * 4. Cliente incluye token en header Authorization de futuras requests
 * 5. JwtAuthenticationFilter valida el token
 * 6. Si es válido, request se procesa
 * 7. Si no, retorna 401 Unauthorized
 *
 * Configuración:
 * - Autenticación: Credenciales en /api/auth/login
 * - Autorización: Token JWT en Authorization header
 * - Sesiones: Deshabilitadas (stateless)
 * - CSRF: Deshabilitado (es stateless)
 * - Contraseñas: Encriptadas con BCrypt
 *
 * Rutas públicas:
 * - GET /api/clientes (registro)
 * - POST /api/auth/login
 *
 * Rutas protegidas:
 * - GET /api/clientes/{id}
 * - PUT /api/clientes/{id}
 * - DELETE /api/clientes/{id}
 * - GET /api/auth/me
 * - POST /api/auth/validate
 *
 * @author Guateque Store
 * @since 1.0
 * @see JwtAuthenticationFilter
 * @see BCryptPasswordEncoder
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * Bean para encriptar contraseñas con BCrypt.
     *
     * BCrypt:
     * - Algoritmo adaptativo
     * - Cada contraseña tiene diferente salt
     * - Imposible revertir (one-way)
     * - Recomendado por OWASP
     *
     * @return BCryptPasswordEncoder
     */
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configuración principal de seguridad HTTP.
     *
     * Configuraciones:
     *
     * 1. CSRF: Deshabilitado
     *    - Razón: API es stateless, CSRF no aplica
     *    - Tokens JWT previenen ataques similares
     *
     * 2. Sesiones: Stateless
     *    - No se crean sesiones en servidor
     *    - Token en cada request
     *    - Escalable horizontalmente
     *
     * 3. Autorización:
     *    - /api/clientes: Público (GET para listar, POST para crear)
     *    - /api/auth/login: Público (para login)
     *    - /api/auth/validate: Público (para validar tokens)
     *    - Resto: Requiere autenticación
     *
     * 4. Filtros:
     *    - JwtAuthenticationFilter antes de UsernamePasswordAuthenticationFilter
     *    - Intercepción de cada request
     *
     * 5. Excepción:
     *    - Entrada: Para usuarios no autenticados
     *    - Acceso denegado: Para usuarios sin permiso
     *
     * @param http configurador HTTP
     * @return SecurityFilterChain configurada
     * @throws Exception si hay error en configuración
     */
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
                        .requestMatchers("/api/clientes", "/api/auth/login", "/api/auth/validate").permitAll()

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
package com.guatequestore.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Filtro JWT que se ejecuta en cada request HTTP.
 *
 * Responsabilidades:
 * - Extraer token del header Authorization
 * - Validar el token
 * - Extraer email del token
 * - Establecer autenticación en SecurityContext
 *
 * Flujo:
 * 1. Request llega al servidor
 * 2. JwtAuthenticationFilter intercepta
 * 3. Extrae token del header "Authorization: Bearer <token>"
 * 4. Valida token con JwtUtil
 * 5. Si es válido, establece autenticación
 * 6. Request continúa con usuario autenticado
 *
 * Header esperado:
 * Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
 *
 * @author Guateque Store
 * @since 1.0
 * @see JwtUtil
 * @see OncePerRequestFilter
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    private static final String BEARER_PREFIX = "Bearer ";
    private static final String AUTHORIZATION_HEADER = "Authorization";

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    /**
     * Filtra cada request HTTP.
     *
     * @param request solicitud HTTP
     * @param response respuesta HTTP
     * @param filterChain cadena de filtros
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        try {
            // Extraer token del header Authorization
            String token = extractTokenFromRequest(request);

            // Si hay token y es válido
            if (token != null && jwtUtil.validateToken(token)) {
                // Extraer email del token
                String email = jwtUtil.getEmailFromToken(token);

                // Crear autenticación
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                new ArrayList<>()); // Sin roles por ahora

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                // Establecer en SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Error al procesar token JWT: " + e.getMessage());
        }

        // Continuar con el siguiente filtro
        filterChain.doFilter(request, response);
    }

    /**
     * Extrae el token JWT del header Authorization.
     *
     * Formato esperado: "Authorization: Bearer <token>"
     *
     * @param request solicitud HTTP
     * @return token JWT o null si no existe
     */
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(BEARER_PREFIX.length());
        }

        return null;
    }
}
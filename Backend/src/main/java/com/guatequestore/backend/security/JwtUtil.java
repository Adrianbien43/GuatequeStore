package com.guatequestore.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * Utilidad para manejar JSON Web Tokens (JWT).
 *
 * Responsabilidades:
 * - Generar tokens JWT firmados
 * - Validar y extraer información de tokens
 * - Manejo de expiración de tokens
 *
 * Configuración desde application.properties:
 * - app.jwt.secret: Clave secreta para firmar tokens
 * - app.jwt.expiration: Tiempo en milisegundos (defecto: 24 horas)
 *
 * Versión compatible con JJWT 0.12.3
 *
 * @author Guateque Store
 * @since 1.0
 */
@Component
public class JwtUtil {

    @Value("${app.jwt.secret:tu-clave-secreta-muy-larga-aqui-debe-ser-minimo-32-caracteres}")
    private String jwtSecret;

    @Value("${app.jwt.expiration:86400000}") // 24 horas por defecto
    private long jwtExpiration;

    /**
     * Genera un token JWT para un usuario.
     *
     * Contenido del token:
     * - Subject (sub): Email del usuario
     * - Issued At (iat): Fecha de emisión
     * - Expiration (exp): Fecha de vencimiento
     * - Signature: Firmado con clave secreta
     *
     * @param email email del cliente autenticado
     * @return token JWT firmado
     */
    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Extrae el email del token JWT.
     *
     * @param token token JWT a analizar
     * @return email del usuario
     * @throws io.jsonwebtoken.JwtException si el token es inválido
     */
    public String getEmailFromToken(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * Valida si el token JWT es válido.
     *
     * Validaciones:
     * - Firma es correcta
     * - No ha expirado
     * - Formato es correcto
     *
     * @param token token JWT a validar
     * @return true si es válido, false si no
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Verifica si el token ha expirado.
     *
     * @param token token JWT a verificar
     * @return true si ha expirado
     */
    public boolean isTokenExpired(String token) {
        try {
            return getClaims(token).getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    /**
     * Extrae todos los claims (información) del token.
     *
     * @param token token JWT
     * @return Claims con la información decodificada
     */
    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Genera la clave de firma a partir del secreto.
     *
     * @return SecretKey para firmar tokens
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
}
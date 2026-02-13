package com.guatequestore.backend.config;

import com.guatequestore.backend.usuario.model.*;
import com.guatequestore.backend.usuario.repository.TelefonoUsuarioRepository;
import com.guatequestore.backend.usuario.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdmin(
            UsuarioRepository usuarioRepository,
            TelefonoUsuarioRepository telefonoRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {

            // -------------------- ADMIN --------------------
            if (!usuarioRepository.existsByEmail("admin@admin.com")) {
                Usuario admin = new Usuario();
                admin.setNombre("Administrador");
                admin.setEmail("admin@admin.com");
                admin.setDireccion("Ciudad Central");
                admin.setRol(RolUsuario.ADMINISTRADOR);
                admin.setActivo(true);

                // Contraseña cifrada
                Contrasena adminContrasena = new Contrasena();
                adminContrasena.setHash(passwordEncoder.encode("Admin1234!"));
                admin.addContrasena(adminContrasena);

                // Guardar usuario primero
                Usuario savedAdmin = usuarioRepository.save(admin);

                // Teléfono vinculado al admin
                TelefonoUsuario telefono = new TelefonoUsuario();
                telefono.setNumero("12345678");       // Número de ejemplo
                telefono.setUsuario(savedAdmin);       // Vinculado al admin
                telefono.setTipo(TipoTelefono.MOVIL);

                telefonoRepository.save(telefono);

                System.out.println("Administrador creado: admin@admin.com / Admin1234! con teléfono 12345678");
            }
        };
    }
}


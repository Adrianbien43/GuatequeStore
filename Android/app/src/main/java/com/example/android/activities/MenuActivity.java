package com.example.android.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.android.R;
import com.example.android.iniciosesion.LoginActivity;
import com.example.android.iniciosesion.SessionManager;
import com.example.android.novedades.EventoActivity;
import com.example.android.registrate.RegistrateActivity;
import com.example.android.ropahombre.RopaHombreActivity;
import com.example.android.ropamujer.RopaMujerActivity;

public class MenuActivity extends AppCompatActivity {

    private SessionManager sessionManager;
    private Button botonRegistrate;
    private Button botonLogin;
    private Button btnProveedores;
    private Button btnLogout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_menu);

        // Inicializar SessionManager
        sessionManager = new SessionManager(this);

        // Inicializar todos los botones
        Button botonNovedades = findViewById(R.id.boton_novedades);
        Button botonRopaHombre = findViewById(R.id.boton_ropahombre);
        Button botonRopaMujer = findViewById(R.id.boton_ropamujer);
        botonRegistrate = findViewById(R.id.boton_registrate);
        botonLogin = findViewById(R.id.boton_login);
        btnProveedores = findViewById(R.id.btnProveedores);
        btnLogout = findViewById(R.id.btnLogout);

        // Configurar visibilidad según el estado de sesión y rol
        configurarVisibilidadBotones();

        // Configurar listeners para cada botón
        botonNovedades.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this, EventoActivity.class);
                startActivity(intent);
            }
        });

        botonRopaHombre.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this, RopaHombreActivity.class);
                startActivity(intent);
            }
        });

        botonRopaMujer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this, RopaMujerActivity.class);
                startActivity(intent);
            }
        });

        botonRegistrate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this, RegistrateActivity.class);
                startActivity(intent);
            }
        });

        botonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });

        btnProveedores.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this, ProveedorActivity.class);
                startActivity(intent);
            }
        });

        // Listener para el botón de logout
        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                cerrarSesion();
            }
        });
    }

    private void configurarVisibilidadBotones() {
        if (sessionManager.isLoggedIn()) {
            // Usuario logueado - ocultar login/registro, mostrar logout
            botonLogin.setVisibility(View.GONE);
            botonRegistrate.setVisibility(View.GONE);
            btnLogout.setVisibility(View.VISIBLE);

            // Verificar si es ADMIN para mostrar proveedores
            if (sessionManager.isAdmin()) {
                btnProveedores.setVisibility(View.VISIBLE);
                Toast.makeText(this, "Bienvenido Administrador", Toast.LENGTH_SHORT).show();
            } else {
                btnProveedores.setVisibility(View.GONE);
                Toast.makeText(this, "Bienvenido Cliente", Toast.LENGTH_SHORT).show();
            }
        } else {
            // Usuario no logueado - mostrar login/registro, ocultar logout y proveedores
            botonLogin.setVisibility(View.VISIBLE);
            botonRegistrate.setVisibility(View.VISIBLE);
            btnLogout.setVisibility(View.GONE);
            btnProveedores.setVisibility(View.GONE);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Reconfigurar visibilidad cuando volvemos a la actividad
        configurarVisibilidadBotones();
    }

    private void cerrarSesion() {
        // Borrar datos de sesión
        sessionManager.logout();

        // Mostrar mensaje
        Toast.makeText(this, "Sesión cerrada", Toast.LENGTH_SHORT).show();

        // Redirigir al login y limpiar el stack de actividades
        Intent intent = new Intent(MenuActivity.this, MenuActivity.class); // CORREGIDO: iba a MenuActivity
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}
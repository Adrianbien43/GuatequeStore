package com.example.android.iniciosesion;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.android.R;
import com.example.android.activities.MenuActivity;
import com.example.android.api.ApiClient;
import com.example.android.api.ApiService;
import com.example.android.api.LoginRequest;
import com.example.android.api.LoginResponse;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private static final String TAG = "LOGIN_DEBUG";

    private EditText editTextEmail, editTextPassword;
    private Button btnIniciarSesion, btnVolverMenu;
    private TextView textViewRegistrarse, textViewOlvidePassword;
    private ProgressBar progressBar;
    private SessionManager sessionManager;
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login);

        Log.d(TAG, "=== INICIANDO LoginActivity ===");

        try {
            // PASO 1: Inicializar ApiClient
            Log.d(TAG, "PASO 1: Inicializando ApiClient...");
            ApiClient.init(this);
            Log.d(TAG, "✓ ApiClient inicializado correctamente");
            Log.d(TAG, "  URL Base: " + ApiClient.getBaseUrl());

            // PASO 2: Inicializar SessionManager
            Log.d(TAG, "PASO 2: Inicializando SessionManager...");
            sessionManager = new SessionManager(this);
            Log.d(TAG, "✓ SessionManager inicializado");

            // PASO 3: Verificar sesión activa
            Log.d(TAG, "PASO 3: Verificando sesión activa...");
            if (sessionManager.isLoggedIn()) {
                Log.d(TAG, "  ¡Sesión activa detectada! Redirigiendo al menú...");
                irAlMenu();
                return;
            } else {
                Log.d(TAG, "  No hay sesión activa");
            }

            // PASO 4: Obtener ApiService
            Log.d(TAG, "PASO 4: Obteniendo ApiService...");
            apiService = ApiClient.getApi();
            Log.d(TAG, "✓ ApiService obtenido correctamente");

            // PASO 5: Inicializar vistas
            Log.d(TAG, "PASO 5: Inicializando vistas...");
            initViews();
            Log.d(TAG, "✓ Vistas inicializadas");

            // PASO 6: Configurar listeners
            Log.d(TAG, "PASO 6: Configurando listeners...");
            setupListeners();
            Log.d(TAG, "✓ Listeners configurados");

            Log.d(TAG, "=== LoginActivity iniciada correctamente ===");

        } catch (Exception e) {
            Log.e(TAG, "❌ ERROR CRÍTICO en onCreate: " + e.getMessage(), e);
            Toast.makeText(this, "Error al iniciar: " + e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

    private void initViews() {
        editTextEmail = findViewById(R.id.editTextEmailLogin);
        editTextPassword = findViewById(R.id.editTextPasswordLogin);
        btnIniciarSesion = findViewById(R.id.btnIniciarSesion);
        btnVolverMenu = findViewById(R.id.btnVolverMenu);
        textViewRegistrarse = findViewById(R.id.textViewRegistrarse);
        textViewOlvidePassword = findViewById(R.id.textViewOlvidePassword);

        // Verificar que las vistas no sean null
        if (editTextEmail == null) Log.e(TAG, "❌ editTextEmail es null");
        if (editTextPassword == null) Log.e(TAG, "❌ editTextPassword es null");
        if (btnIniciarSesion == null) Log.e(TAG, "❌ btnIniciarSesion es null");
        if (btnVolverMenu == null) Log.e(TAG, "❌ btnVolverMenu es null");
    }

    private void setupListeners() {
        btnIniciarSesion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d(TAG, "▶️ Botón Iniciar Sesión pulsado");
                iniciarSesion();
            }
        });

        btnVolverMenu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d(TAG, "◀️ Botón Volver pulsado");
                finish();
            }
        });

        textViewRegistrarse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d(TAG, "📝 Enlace Registrarse pulsado");
                Toast.makeText(LoginActivity.this, "Ir a Registro", Toast.LENGTH_SHORT).show();
            }
        });

        textViewOlvidePassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d(TAG, "❓ Enlace Olvidé contraseña pulsado");
                Toast.makeText(LoginActivity.this, "Recuperar contraseña", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void iniciarSesion() {
        String email = editTextEmail.getText().toString().trim();
        String password = editTextPassword.getText().toString().trim();

        Log.d(TAG, "=== INTENTANDO LOGIN ===");
        Log.d(TAG, "Email: " + email);
        Log.d(TAG, "Password: " + (password.isEmpty() ? "VACÍA" : "******"));

        // Validaciones
        if (TextUtils.isEmpty(email)) {
            editTextEmail.setError("Email requerido");
            return;
        }

        if (TextUtils.isEmpty(password)) {
            editTextPassword.setError("Contraseña requerida");
            return;
        }

        showLoading(true);

        try {
            // Crear request con email y password
            LoginRequest loginRequest = new LoginRequest(email, password);

            Log.d(TAG, "URL Base: " + ApiClient.getBaseUrl());
            Log.d(TAG, "URL completa: " + ApiClient.getBaseUrl() + "api/auth/login");

            Call<LoginResponse> call = apiService.login(loginRequest);

            call.enqueue(new Callback<LoginResponse>() {
                @Override
                public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                    showLoading(false);

                    Log.d(TAG, "Código respuesta: " + response.code());

                    if (response.isSuccessful() && response.body() != null) {
                        LoginResponse loginResponse = response.body();

                        Log.d(TAG, "✅ LOGIN EXITOSO");
                        Log.d(TAG, "Token: " + loginResponse.getToken());
                        Log.d(TAG, "Nombre: " + loginResponse.getNombre());
                        Log.d(TAG, "Rol: " + loginResponse.getRol());

                        // Guardar datos de sesión INCLUYENDO EL ROL
                        sessionManager.saveLoginDetails(
                                loginResponse.getToken(),
                                loginResponse.getEmail(), // Usamos el email como ID
                                loginResponse.getNombre(),
                                loginResponse.getEmail(),
                                loginResponse.getRol()  // <-- AÑADIDO: guardar el rol
                        );

                        Toast.makeText(LoginActivity.this,
                                "¡Bienvenido " + loginResponse.getNombre() + "!",
                                Toast.LENGTH_LONG).show();

                        irAlMenu();

                    } else {
                        // Error en login
                        Log.e(TAG, "❌ Error en login. Código: " + response.code());
                        try {
                            String errorBody = response.errorBody() != null ?
                                    response.errorBody().string() : "Error desconocido";
                            Log.e(TAG, "Error body: " + errorBody);

                            String mensaje;
                            if (response.code() == 401 || response.code() == 403) {
                                mensaje = "Email o contraseña incorrectos";
                            } else {
                                mensaje = "Error " + response.code() + ": " + errorBody;
                            }

                            String finalMensaje = mensaje;
                            runOnUiThread(() ->
                                    Toast.makeText(LoginActivity.this, finalMensaje, Toast.LENGTH_LONG).show()
                            );

                        } catch (IOException e) {
                            Log.e(TAG, "Error leyendo errorBody", e);
                            runOnUiThread(() ->
                                    Toast.makeText(LoginActivity.this,
                                            "Error al iniciar sesión", Toast.LENGTH_LONG).show()
                            );
                        }
                    }
                }

                @Override
                public void onFailure(Call<LoginResponse> call, Throwable t) {
                    showLoading(false);

                    // Error de conexión
                    Log.e(TAG, "❌ ERROR DE CONEXIÓN", t);
                    Log.e(TAG, "Mensaje: " + t.getMessage());
                    Log.e(TAG, "Clase del error: " + t.getClass().getSimpleName());

                    String mensajeError;
                    if (t instanceof java.net.ConnectException) {
                        mensajeError = "No se pudo conectar al servidor.\n" +
                                "Verifica:\n" +
                                "• Que el servidor esté encendido\n" +
                                "• Que la IP " + ApiClient.getBaseUrl() + " sea correcta\n" +
                                "• Que estés en la misma red WiFi";
                    } else if (t instanceof java.net.SocketTimeoutException) {
                        mensajeError = "Tiempo de espera agotado";
                    } else if (t instanceof java.net.UnknownHostException) {
                        mensajeError = "No se encuentra el servidor.\nIP incorrecta: " + ApiClient.getBaseUrl();
                    } else {
                        mensajeError = "Error de conexión: " + t.getMessage();
                    }

                    String finalMensajeError = mensajeError;
                    runOnUiThread(() ->
                            Toast.makeText(LoginActivity.this, finalMensajeError, Toast.LENGTH_LONG).show()
                    );
                }
            });

        } catch (Exception e) {
            showLoading(false);
            Log.e(TAG, "❌ EXCEPCIÓN al crear la llamada", e);
            Toast.makeText(this, "Error: " + e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

    private void showLoading(boolean show) {
        btnIniciarSesion.setEnabled(!show);
        btnIniciarSesion.setText(show ? "Iniciando sesión..." : "Iniciar Sesión");
    }

    private void irAlMenu() {
        Log.d(TAG, "➡️ Redirigiendo al menú principal");
        Intent intent = new Intent(LoginActivity.this, MenuActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}
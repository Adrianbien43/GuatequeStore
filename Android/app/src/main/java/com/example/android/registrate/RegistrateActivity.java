package com.example.android.registrate;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.android.R;
import com.example.android.activities.MenuActivity;
import com.example.android.api.ApiClient;
import com.example.android.api.ApiService;
import com.example.android.api.LoginResponse;
import com.example.android.api.RegisterRequest;
import com.example.android.iniciosesion.SessionManager;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegistrateActivity extends AppCompatActivity {

    private static final String TAG = "REGISTER_DEBUG";

    private EditText editTextNombre, editTextEmail, editTextPassword, editTextConfirmPassword;
    private Button btnRegistrar, btnVolverMenu;
    private ProgressBar progressBar;
    private SessionManager sessionManager;
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_registrate);

        // Inicializar ApiClient
        ApiClient.init(this);

        // Inicializar SessionManager
        sessionManager = new SessionManager(this);

        // Verificar si ya hay sesión iniciada
        if (sessionManager.isLoggedIn()) {
            irAlMenu();
            return;
        }

        // Inicializar ApiService
        apiService = ApiClient.getApi();

        // Inicializar views
        initViews();

        // Configurar listeners
        setupListeners();
    }

    private void initViews() {
        editTextNombre = findViewById(R.id.editTextNombre);
        editTextEmail = findViewById(R.id.editTextEmail);
        editTextPassword = findViewById(R.id.editTextPassword);
        editTextConfirmPassword=findViewById(R.id.editTextConfirmPassword);
        btnRegistrar = findViewById(R.id.btnRegistrar);
        btnVolverMenu = findViewById(R.id.btnVolverMenu);

        // Si tienes ProgressBar en tu layout, descomenta:
        // progressBar = findViewById(R.id.progressBar);
    }

    private void setupListeners() {
        btnRegistrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                registrarUsuario();
            }
        });

        btnVolverMenu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                volverAlMenu();
            }
        });
    }

    private void registrarUsuario() {
        String nombre = editTextNombre.getText().toString().trim();
        String email = editTextEmail.getText().toString().trim();
        String password = editTextPassword.getText().toString().trim();
        String confirmPassword = editTextConfirmPassword.getText().toString().trim();

        // ESTO SOLO OCURRE EN EL MÓVIL
        if (!password.equals(confirmPassword)) {
            editTextConfirmPassword.setError("Las contraseñas no coinciden");
            return;
        }

        // Validaciones
        if (TextUtils.isEmpty(nombre)) {
            editTextNombre.setError("Nombre requerido");
            return;
        }

        if (TextUtils.isEmpty(email)) {
            editTextEmail.setError("Email requerido");
            return;
        }

        if (TextUtils.isEmpty(password)) {
            editTextPassword.setError("Contraseña requerida");
            return;
        }

        if (password.length() < 6) {
            editTextPassword.setError("Mínimo 6 caracteres");
            return;
        }

        // Mostrar loading
        showLoading(true);

        // Crear request de registro
        RegisterRequest registerRequest = new RegisterRequest(nombre, email, password);

        Log.d(TAG, "Intentando registrar: " + email);
        Log.d(TAG, "URL: " + ApiClient.getBaseUrl() + "api/auth/register");

        // Llamar a la API
        Call<LoginResponse> call = apiService.register(registerRequest);

        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                showLoading(false);

                Log.d(TAG, "Código respuesta: " + response.code());

                if (response.isSuccessful() && response.body() != null) {
                    LoginResponse loginResponse = response.body();

                    Log.d(TAG, "✅ REGISTRO EXITOSO");
                    Log.d(TAG, "Token: " + loginResponse.getToken());
                    Log.d(TAG, "Nombre: " + loginResponse.getNombre());
                    Log.d(TAG, "Rol: " + loginResponse.getRol());

                    // Guardar datos de sesión (el usuario queda logueado automáticamente)
                    sessionManager.saveLoginDetails(
                            loginResponse.getToken(),
                            loginResponse.getEmail(),
                            loginResponse.getNombre(),
                            loginResponse.getEmail(),
                            loginResponse.getRol()
                    );

                    Toast.makeText(RegistrateActivity.this,
                            "¡Bienvenido " + loginResponse.getNombre() + "!",
                            Toast.LENGTH_LONG).show();

                    irAlMenu();

                } else {
                    // Error en registro
                    Log.e(TAG, "❌ Error en registro. Código: " + response.code());
                    try {
                        String errorBody = response.errorBody() != null ?
                                response.errorBody().string() : "Error desconocido";
                        Log.e(TAG, "Error body: " + errorBody);

                        String mensaje;
                        if (response.code() == 409) { // Conflict - usuario ya existe
                            mensaje = "El email ya está registrado";
                        } else if (response.code() == 400) {
                            mensaje = "Datos inválidos";
                        } else {
                            mensaje = "Error " + response.code() + ": " + errorBody;
                        }

                        Toast.makeText(RegistrateActivity.this, mensaje, Toast.LENGTH_LONG).show();

                    } catch (IOException e) {
                        Log.e(TAG, "Error leyendo errorBody", e);
                        Toast.makeText(RegistrateActivity.this,
                                "Error al registrar", Toast.LENGTH_LONG).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                showLoading(false);
                Log.e(TAG, "❌ Error de conexión", t);
                Toast.makeText(RegistrateActivity.this,
                        "Error de conexión: " + t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private void showLoading(boolean show) {
        btnRegistrar.setEnabled(!show);
        btnRegistrar.setText(show ? "Registrando..." : "Registrarse");

        // Si tienes ProgressBar
        // if (progressBar != null) {
        //     progressBar.setVisibility(show ? View.VISIBLE : View.GONE);
        // }
    }

    private void volverAlMenu() {
        Intent intent = new Intent(RegistrateActivity.this, MenuActivity.class);
        startActivity(intent);
        finish();
    }

    private void irAlMenu() {
        Intent intent = new Intent(RegistrateActivity.this, MenuActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}
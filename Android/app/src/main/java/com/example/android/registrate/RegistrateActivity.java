package com.example.android.registrate;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.android.R;
import com.example.android.activities.MenuActivity;

public class RegistrateActivity extends AppCompatActivity {

    private EditText editTextNombre, editTextEmail, editTextPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_registrate);


        // Inicializar views
        editTextNombre = findViewById(R.id.editTextNombre);
        editTextEmail = findViewById(R.id.editTextEmail);
        editTextPassword = findViewById(R.id.editTextPassword);
        Button btnRegistrar = findViewById(R.id.btnRegistrar);
        Button btnVolverMenu = findViewById(R.id.btnVolverMenu);

        // Botón para registrar
        btnRegistrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                registrarUsuario();
            }
        });

        // Botón para volver al menú
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

        if (nombre.isEmpty() || email.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Por favor, complete todos los campos", Toast.LENGTH_SHORT).show();
            return;
        }

        if (password.length() < 6) {
            Toast.makeText(this, "La contraseña debe tener al menos 6 caracteres", Toast.LENGTH_SHORT).show();
            return;
        }

        // Aquí iría la lógica de registro real
        Toast.makeText(this, "¡Registro exitoso! Bienvenido " + nombre, Toast.LENGTH_LONG).show();

        // Limpiar campos después del registro
        editTextNombre.setText("");
        editTextEmail.setText("");
        editTextPassword.setText("");
    }

    private void volverAlMenu() {
        Intent intent = new Intent(RegistrateActivity.this, MenuActivity.class);
        startActivity(intent);
        finish();
    }
}
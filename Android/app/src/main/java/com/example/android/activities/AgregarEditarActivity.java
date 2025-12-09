package com.example.android.activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.android.R;
import com.example.android.api.ApiClient;
import com.example.android.model.Proveedor;
import java.util.Collections;  // ← ESTE IMPORT ARREGLA EL ERROR
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AgregarEditarActivity extends AppCompatActivity {

    private EditText etNombre, etDireccion;
    private Button btnGuardar, btnVolverMenu;
    private Proveedor proveedorEditar = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_agregar_editar);

        // Vistas
        etNombre = findViewById(R.id.etNombre);
        etDireccion = findViewById(R.id.etDireccion);
        btnGuardar = findViewById(R.id.btnGuardar);
        btnVolverMenu = findViewById(R.id.btnVolverMenu);

        // Si estamos editando
        if (getIntent().hasExtra("proveedor")) {
            proveedorEditar = (Proveedor) getIntent().getSerializableExtra("proveedor");
            etNombre.setText(proveedorEditar.getNombre());
            etDireccion.setText(proveedorEditar.getDireccion() != null ? proveedorEditar.getDireccion() : "");
            setTitle("Editar Proveedor");
        } else {
            setTitle("Nuevo Proveedor");
        }

        // Botón Guardar
        btnGuardar.setOnClickListener(v -> guardarProveedor());

        // Botón Volver al Menú
        btnVolverMenu.setOnClickListener(v -> {
            startActivity(new Intent(this, MenuActivity.class));
            finish();
        });
    }

    private void guardarProveedor() {
        String nombre = etNombre.getText().toString().trim();
        String direccion = etDireccion.getText().toString().trim();

        if (nombre.isEmpty()) {
            Toast.makeText(this, "El nombre es obligatorio", Toast.LENGTH_SHORT).show();
            return;
        }

        Proveedor p = new Proveedor(nombre, direccion);
        p.setTelefonos(Collections.emptyList());

        Call<Proveedor> call;
        if (proveedorEditar == null) {
            call = ApiClient.getApi().crearProveedor(p);
        } else {
            p.setId(proveedorEditar.getId());
            call = ApiClient.getApi().actualizarProveedor(p.getId(), p);
        }

        call.enqueue(new Callback<Proveedor>() {
            @Override
            public void onResponse(Call<Proveedor> call, Response<Proveedor> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(AgregarEditarActivity.this, "¡Guardado correctamente!", Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    Toast.makeText(AgregarEditarActivity.this, "Error al guardar en el servidor", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<Proveedor> call, Throwable t) {
                Toast.makeText(AgregarEditarActivity.this, "Error de conexión: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
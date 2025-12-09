package com.example.android.activities;

import android.os.Bundle;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;


import com.example.android.R;
import com.example.android.api.ApiClient;
import com.example.android.model.Proveedor;
import com.example.android.model.TelefonoProveedor;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import java.util.ArrayList;

public class AgregarEditarActivity extends AppCompatActivity {

    private EditText etNombre, etDireccion;
    private LinearLayout layoutTelefonos;
    private Button btnAgregarTelefono, btnGuardar;
    private Proveedor proveedorEditar = null;
    private ArrayList<TelefonoProveedor> listaTelefonos = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_agregar_editar);

        etNombre = findViewById(R.id.etNombre);
        etDireccion = findViewById(R.id.etDireccion);
        layoutTelefonos = findViewById(R.id.layoutTelefonos);
        btnAgregarTelefono = findViewById(R.id.btnAgregarTelefono);
        btnGuardar = findViewById(R.id.btnGuardar);

        // Si viene un proveedor para editar
        if (getIntent().hasExtra("proveedor")) {
            proveedorEditar = (Proveedor) getIntent().getSerializableExtra("proveedor");
            etNombre.setText(proveedorEditar.getNombre());
            etDireccion.setText(proveedorEditar.getDireccion() != null ? proveedorEditar.getDireccion() : "");
            listaTelefonos.addAll(proveedorEditar.getTelefonos());
            actualizarListaTelefonos();
            setTitle("Editar Proveedor");
        } else {
            setTitle("Nuevo Proveedor");
        }

        btnAgregarTelefono.setOnClickListener(v -> agregarCampoTelefono(null, null));

        btnGuardar.setOnClickListener(v -> guardarProveedor());
    }

    private void agregarCampoTelefono(String numero, String tipo) {
        TextView fila = (TextView) getLayoutInflater().inflate(R.layout.item_telefono_input, layoutTelefonos, false);

        EditText etTel = fila.findViewById(R.id.etTelefono);
        Spinner spTipo = fila.findViewById(R.id.spTipo);
        ImageButton btnQuitar = fila.findViewById(R.id.btnQuitar);

        // Spinner con MOVIL y FIJO
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this,
                android.R.layout.simple_spinner_item, new String[]{"MOVIL", "FIJO"});
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spTipo.setAdapter(adapter);

        if (numero != null) etTel.setText(numero);
        if (tipo != null) spTipo.setSelection(tipo.equals("MOVIL") ? 0 : 1);

        btnQuitar.setOnClickListener(v -> layoutTelefonos.removeView(fila));

        layoutTelefonos.addView(fila);
    }

    private void actualizarListaTelefonos() {
        layoutTelefonos.removeAllViews();
        for (TelefonoProveedor tel : listaTelefonos) {
            agregarCampoTelefono(tel.getTelefono(), tel.getTipo());
        }
    }

    private void guardarProveedor() {
        String nombre = etNombre.getText().toString().trim();
        String direccion = etDireccion.getText().toString().trim();

        if (nombre.isEmpty()) {
            Toast.makeText(this, "El nombre es obligatorio", Toast.LENGTH_SHORT).show();
            return;
        }

        // Recoger teléfonos
        listaTelefonos.clear();
        for (int i = 0; i < layoutTelefonos.getChildCount(); i++) {
            TextView fila = (TextView) layoutTelefonos.getChildAt(i);
            String tel = ((EditText) fila.findViewById(R.id.etTelefono)).getText().toString().trim();
            String tipo = (String) ((Spinner) fila.findViewById(R.id.spTipo)).getSelectedItem();

            if (!tel.isEmpty()) {
                listaTelefonos.add(new TelefonoProveedor(tel, tipo));
            }
        }

        Proveedor p = new Proveedor(nombre, direccion);
        p.setTelefonos(listaTelefonos);

        if (proveedorEditar == null) {
            // CREAR
            ApiClient.getApi().crearProveedor(p).enqueue(callback);
        } else {
            // EDITAR
            p.setId(proveedorEditar.getId());
            ApiClient.getApi().actualizarProveedor(p.getId(), p).enqueue(callback);
        }
    }

    private final Callback<Proveedor> callback = new Callback<Proveedor>() {
        @Override
        public void onResponse(Call<Proveedor> call, Response<Proveedor> response) {
            if (response.isSuccessful()) {
                Toast.makeText(AgregarEditarActivity.this, "¡Guardado correctamente!", Toast.LENGTH_SHORT).show();
                finish();
            } else {
                Toast.makeText(AgregarEditarActivity.this, "Error del servidor", Toast.LENGTH_LONG).show();
            }
        }

        @Override
        public void onFailure(Call<Proveedor> call, Throwable t) {
            Toast.makeText(AgregarEditarActivity.this, "Error de conexión: " + t.getMessage(), Toast.LENGTH_LONG).show();
        }
    };
}
package com.example.android;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.android.activities.AgregarEditarActivity;
import com.example.android.adapters.ProveedorAdapter;
import com.example.android.api.ApiClient;
import com.example.android.model.Proveedor;

import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProveedorActivity extends AppCompatActivity {

    private RecyclerView recycler;
    private ProveedorAdapter adapter;
    private List<Proveedor> listaProveedores = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_proveedor);

        recycler = findViewById(R.id.recyclerProveedores);
        recycler.setLayoutManager(new LinearLayoutManager(this));

        adapter = new ProveedorAdapter(listaProveedores, new ProveedorAdapter.OnItemClickListener() {
            @Override
            public void onEditClick(Proveedor p) {
                Intent i = new Intent(ProveedorActivity.this, AgregarEditarActivity.class);
                i.putExtra("proveedor", p);
                startActivity(i);
            }

            @Override
            public void onDeleteClick(Proveedor p) {
                eliminarProveedor(p);
            }
        });
        recycler.setAdapter(adapter);

        findViewById(R.id.fabAgregar).setOnClickListener(v ->
                startActivity(new Intent(this, AgregarEditarActivity.class)));

        cargarProveedores();
    }

    private void cargarProveedores() {
        ApiClient.getApi().getProveedores().enqueue(new Callback<List<Proveedor>>() {
            @Override
            public void onResponse(Call<List<Proveedor>> call, Response<List<Proveedor>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    listaProveedores.clear();
                    listaProveedores.addAll(response.body());
                    adapter.actualizarLista(listaProveedores);
                }
            }

            @Override
            public void onFailure(Call<List<Proveedor>> call, Throwable t) {
                Toast.makeText(ProveedorActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }

    private void eliminarProveedor(Proveedor p) {
        ApiClient.getApi().eliminarProveedor(p.getId()).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    cargarProveedores();
                    Toast.makeText(ProveedorActivity.this, "Eliminado", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<Void> call, Throwable t) {}
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        cargarProveedores();
    }
}
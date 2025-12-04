package com.example.prueba.ropahombre;

import android.content.Intent;
import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.prueba.Producto;
import com.example.prueba.ProductoAdapter;
import com.example.prueba.ProductoDetalleActivity2;
import com.example.prueba.R;

import java.util.ArrayList;
import java.util.List;


/**
 * Esta es la clase es la vista de Ropa de Hombre
 *
 * @author Adrian Bienvenido Morales Perdomo
 * @version 1.0.0
 */

public class RopaHombreActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private ProductoAdapter adapter;
    private List<Producto> listaProductos;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_ropa_hombre);

        recyclerView = findViewById(R.id.recycler_hombre);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // crear y llenar la lista
        listaProductos = new ArrayList<>();
        listaProductos.add(new Producto("Camisa azul", "Camisa elegante", "19€", R.drawable.camisa));
        listaProductos.add(new Producto("Pantalón negro", "Muy cómodo", "25€", R.drawable.pantalon));
        listaProductos.add(new Producto("Zapatillas sport", "Nuevas", "59€", R.drawable.zapatillas1));

        // crear adapter y pasar listener para el click
        adapter = new ProductoAdapter(this, listaProductos, producto -> {
            Intent intent = new Intent(RopaHombreActivity.this, ProductoDetalleActivity2.class);
            intent.putExtra("nombre", producto.getNombre());
            intent.putExtra("descripcion", producto.getDescripcion());
            intent.putExtra("precio", producto.getPrecio());
            intent.putExtra("imagen", producto.getImagenResId());
            startActivity(intent);
        });

        recyclerView.setAdapter(adapter);
    }
}


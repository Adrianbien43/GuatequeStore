package com.example.android.ropamujer;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.android.R;
import com.example.android.activities.MenuActivity;
import com.example.android.activities.ProductoDetalleActivity2;
import com.example.android.adapters.ProductoAdapter;
import com.example.android.model.Producto;
import java.util.ArrayList;
import java.util.List;

public class RopaMujerActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ropa_mujer);

        // Botón volver bonito y grande
        Button btnVolverMenu = findViewById(R.id.btnVolverMenu);
        btnVolverMenu.setOnClickListener(v -> {
            startActivity(new Intent(this, MenuActivity.class));
            finish();
        });

        // RecyclerView vertical
        RecyclerView recyclerView = findViewById(R.id.recycler_mujer);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Lista de productos mujer (con imagen del sistema para que nunca falle)
        List<Producto> listaMujer = new ArrayList<>();
        listaMujer.add(new Producto("Vestido Floral", "Perfecto para primavera", "49.99€", android.R.drawable.ic_menu_gallery));
        listaMujer.add(new Producto("Blusa Elegante", "Seda suave", "34.99€", android.R.drawable.ic_menu_gallery));
        listaMujer.add(new Producto("Falda Plisada", "Rosa pastel", "29.99€", android.R.drawable.ic_menu_gallery));
        listaMujer.add(new Producto("Top Crop", "Estilo festival", "22.99€", android.R.drawable.ic_menu_gallery));
        listaMujer.add(new Producto("Jeans Mom", "Cómodos y modernos", "39.99€", android.R.drawable.ic_menu_gallery));
        listaMujer.add(new Producto("Chaqueta Denim", "Con bordados", "59.99€", android.R.drawable.ic_menu_gallery));
        listaMujer.add(new Producto("Sandalias Verano", "Cómodas y chic", "44.99€", android.R.drawable.ic_menu_gallery));

        // Adapter con click al detalle
        ProductoAdapter adapter = new ProductoAdapter(this, listaMujer, producto -> {
            Intent intent = new Intent(RopaMujerActivity.this, ProductoDetalleActivity2.class);
            intent.putExtra("nombre", producto.getNombre());
            intent.putExtra("descripcion", producto.getDescripcion());
            intent.putExtra("precio", producto.getPrecio());
            intent.putExtra("imagen", producto.getImagenResId());
            startActivity(intent);
        });

        recyclerView.setAdapter(adapter);
    }
}
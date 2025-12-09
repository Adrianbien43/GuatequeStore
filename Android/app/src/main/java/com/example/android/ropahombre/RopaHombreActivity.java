package com.example.android.ropahombre;

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

public class RopaHombreActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ropa_hombre);

        //Boton para volver al menu
        Button btnVolverMenu = findViewById(R.id.btnVolverMenu);
        btnVolverMenu.setOnClickListener(v -> {
            startActivity(new Intent(this, MenuActivity.class));
            finish();
        });


        RecyclerView recyclerView = findViewById(R.id.recycler_hombre);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Lista de productos (usamos imagen del sistema para que NUNCA dé error con formatos sostenibles para sostenibilidad)
        List<Producto> listaProductos = new ArrayList<>();
        listaProductos.add(new Producto("Camisa azul", "Camisa elegante", "19€", android.R.drawable.ic_menu_gallery));
        listaProductos.add(new Producto("Pantalón negro", "Muy cómodo", "25€", android.R.drawable.ic_menu_gallery));
        listaProductos.add(new Producto("Zapatillas sport", "Nuevas", "59€", android.R.drawable.ic_menu_gallery));
        listaProductos.add(new Producto("Camiseta Rock", "Edición limitada", "24€", android.R.drawable.ic_menu_gallery));
        listaProductos.add(new Producto("Hoodie Festival", "Ideal para conciertos", "45€", android.R.drawable.ic_menu_gallery));
        listaProductos.add(new Producto("Gorra Vinyl", "Estilo retro", "19€", android.R.drawable.ic_menu_gallery));

        // Adapter con click para ir al detalle
        ProductoAdapter adapter = new ProductoAdapter(this, listaProductos, producto -> {
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
package com.example.prueba;

import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class ProductoDetalleActivity2 extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_producto_detalle);

        ImageView img = findViewById(R.id.img_detalle);
        TextView nombre = findViewById(R.id.tv_nombre_detalle);
        TextView descripcion = findViewById(R.id.tv_descripcion_detalle);
        TextView precio = findViewById(R.id.tv_precio_detalle);

        // Recoger datos del Intent (si no vienen, se muestran valores vacíos/0)
        String nombreP = getIntent().getStringExtra("nombre");
        String descripcionP = getIntent().getStringExtra("descripcion");
        String precioP = getIntent().getStringExtra("precio");
        int imagenP = getIntent().getIntExtra("imagen", 0);

        if (nombreP != null) nombre.setText(nombreP);
        if (descripcionP != null) descripcion.setText(descripcionP);
        if (precioP != null) precio.setText(precioP);
        if (imagenP != 0) img.setImageResource(imagenP);
    }
}


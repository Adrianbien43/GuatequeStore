package com.example.android.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import com.example.android.R;
import com.example.android.novedades.EventoActivity;
import com.example.android.registrate.RegistrateActivity;
import com.example.android.ropahombre.RopaHombreActivity;
import com.example.android.ropamujer.RopaMujerActivity;

public class MenuActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_menu);


        //Estos son los botones para cambiar a las actividades
        Button botonNovedades = findViewById(R.id.boton_novedades); //Novedades
        Button botonRopaHombre = findViewById(R.id.boton_ropahombre); //Ropa Hombre
        Button botonRopaMujer = findViewById(R.id.boton_ropamujer); // Ropa Mujer
        Button botonRegistrate = findViewById(R.id.boton_registrate); //Registro

        //Este es el codigo para pasar de al evento
        botonNovedades.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this, EventoActivity.class);
                startActivity(intent);
            }
        });

        //Para hombres
        botonRopaHombre.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this, RopaHombreActivity.class);
                startActivity(intent);
            }
        });

        //Para pasar a mujeres
        botonRopaMujer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this, RopaMujerActivity.class);
                startActivity(intent);
            }
        });

        //Este para pasar registro
        botonRegistrate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MenuActivity.this, RegistrateActivity.class);
                startActivity(intent);
            }
        });

        Button btnProveedores = findViewById(R.id.btnProveedores);
        btnProveedores.setOnClickListener(v -> {
            Intent intent = new Intent(MenuActivity.this, ProveedorActivity.class);
            startActivity(intent);
        });

    }
}
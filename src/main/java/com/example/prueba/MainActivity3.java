package com.example.prueba;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.example.prueba.novedades.EventoActivity;
import com.example.prueba.registrate.RegistrateActivity;
import com.example.prueba.ropahombre.RopaHombreActivity;
import com.example.prueba.ropamujer.RopaMujerActivity;

public class MainActivity3 extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main3);

    //Estos son los botones para cambiar a las actividades
    Button botonNovedades = findViewById(R.id.boton_novedades); //Novedades
    Button botonRopaHombre = findViewById(R.id.boton_ropahombre); //Ropa Hombre
    Button botonRopaMujer = findViewById(R.id.boton_ropamujer); // Ropa Mujer
    Button botonRegistrate = findViewById(R.id.boton_registrate); //Registro

    //Este es el codigo para pasar de al evento
    botonNovedades.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent = new Intent(MainActivity3.this, EventoActivity.class);
            startActivity(intent);
        }
    });

    //Para hombres
    botonRopaHombre.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent = new Intent(MainActivity3.this, RopaHombreActivity.class);
            startActivity(intent);
        }
    });

    //Para pasar a mujeres
    botonRopaMujer.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Intent intent = new Intent(MainActivity3.this, RopaMujerActivity.class);
            startActivity(intent);
        }
    });

        //Este para pasar registro
        botonRegistrate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity3.this, RegistrateActivity.class);
                startActivity(intent);
            }
        });

    }
}
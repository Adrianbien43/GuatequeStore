package com.example.android.model;


public class Producto {
    private String nombre;
    private String descripcion;
    private String precio;
    private int imagenResId;

    //Este es el constructor
    public Producto(String nombre, String descripcion, String precio, int imagenResId){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenResId = imagenResId;
    }

    //Estos son los Getter
    public String getNombre() {
        return nombre;
    }
    public String getPrecio() {return precio;}
    public int getImagenResId() {
        return imagenResId;
    }
    public String getDescripcion() {
        return descripcion;
    }

}

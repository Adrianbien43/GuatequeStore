package com.example.android.api;

import com.example.android.model.Proveedor;

import retrofit2.Call;
import retrofit2.http.*;
import java.util.List;

public interface ApiService {
    @GET("api/proveedores")
    Call<List<Proveedor>> getProveedores();

    @POST("api/proveedores")
    Call<Proveedor> crearProveedor(@Body Proveedor proveedor);

    @PUT("api/proveedores/{id}")
    Call<Proveedor> actualizarProveedor(@Path("id") Long id, @Body Proveedor proveedor);

    @DELETE("api/proveedores/{id}")
    Call<Void> eliminarProveedor(@Path("id") Long id);
}
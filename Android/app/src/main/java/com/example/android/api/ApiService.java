package com.example.android.api;

import com.example.android.model.Proveedor;

import retrofit2.Call;
import retrofit2.http.*;
import java.util.List;

public interface ApiService {

    // ============ AUTENTICACIÓN ============
    // IMPORTANTE: La ruta es "api/auth/login" NO "/token"
    @POST("api/auth/login")
    @Headers({
            "Accept: application/json",
            "Content-Type: application/json"  // Cambiado a JSON porque en Postman funciona así
    })
    Call<LoginResponse> login(@Body LoginRequest loginRequest);

    // ============ PROVEEDORES (requieren token) ============
    @GET("api/proveedores")
    Call<List<Proveedor>> getProveedores();

    @POST("api/proveedores")
    Call<Proveedor> crearProveedor(@Body Proveedor proveedor);

    @PUT("api/proveedores/{id}")
    Call<Proveedor> actualizarProveedor(@Path("id") Long id, @Body Proveedor proveedor);

    @DELETE("api/proveedores/{id}")
    Call<Void> eliminarProveedor(@Path("id") Long id);

    @POST("api/auth/register")  // Ajusta la ruta según tu backend
    Call<LoginResponse> register(@Body RegisterRequest registerRequest);
}
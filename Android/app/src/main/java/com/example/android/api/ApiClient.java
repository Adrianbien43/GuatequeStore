package com.example.android.api;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import android.os.Build;
import android.content.Context;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Interceptor;
import okhttp3.Response;

import java.io.IOException;

import com.example.android.iniciosesion.SessionManager;

public class ApiClient {

    private static final String BASE_URL_EMULADOR = "http://10.0.2.2:8080/";
    private static final String BASE_URL_FISICO = "http://172.16.1.163:8080/";

    private static String BASE_URL;
    private static Retrofit retrofit = null;
    private static SessionManager sessionManager;

    /**
     * Inicializar ApiClient con contexto (necesario para el token)
     */
    public static void init(Context context) {
        sessionManager = new SessionManager(context);

        // Determinar URL base según el dispositivo
        if (Build.FINGERPRINT.contains("generic") ||
                Build.FINGERPRINT.contains("emulator") ||
                Build.DEVICE.contains("emulator") ||
                Build.MODEL.contains("Emulator") ||
                Build.HARDWARE.contains("goldfish") ||
                Build.HARDWARE.contains("ranchu")) {
            BASE_URL = BASE_URL_EMULADOR;  // Emulador
        } else {
            BASE_URL = BASE_URL_FISICO;     // Móvil físico
        }
    }

    /**
     * Obtener instancia de ApiService con interceptor de autenticación
     */
    public static ApiService getApi() {
        if (retrofit == null) {

            // Interceptor para añadir token a las peticiones
            Interceptor authInterceptor = new Interceptor() {
                @Override
                public Response intercept(Chain chain) throws IOException {
                    Request originalRequest = chain.request();

                    // Si hay sesión activa, añadir token al header
                    if (sessionManager != null && sessionManager.isLoggedIn()) {
                        String token = sessionManager.getToken();
                        if (token != null) {
                            Request newRequest = originalRequest.newBuilder()
                                    .header("Authorization", "Bearer " + token)
                                    .header("Accept", "application/json")
                                    .header("Content-Type", "application/json")
                                    .build();
                            return chain.proceed(newRequest);
                        }
                    }

                    // Si no hay token, continuar con la petición original
                    return chain.proceed(originalRequest);
                }
            };

            // Cliente HTTP con interceptor
            OkHttpClient client = new OkHttpClient.Builder()
                    .addInterceptor(authInterceptor)     // Para añadir el token
                    .build();

            // Construir Retrofit
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .client(client)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }

        return retrofit.create(ApiService.class);
    }

    /**
     * Método para limpiar la instancia (útil para logout)
     */
    public static void clearInstance() {
        retrofit = null;
    }

    /**
     * Obtener la URL base actual
     */
    public static String getBaseUrl() {
        return BASE_URL;
    }

    /**
     * Método para cambiar la IP manualmente si es necesario
     */
    public static void setBaseUrl(String newBaseUrl) {
        BASE_URL = newBaseUrl;
        retrofit = null; // Forzar recreación con nueva URL
    }
}
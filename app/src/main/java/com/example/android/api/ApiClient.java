package com.example.android.api;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import android.os.Build;

public class ApiClient {

    private static String getBaseUrl() {
        // Detecta automáticamente si estás en emulador o móvil físico
        if (Build.FINGERPRINT.contains("generic") ||
                Build.FINGERPRINT.contains("emulator") ||
                Build.DEVICE.contains("emulator") ||
                Build.MODEL.contains("Emulator") ||
                Build.HARDWARE.contains("goldfish") ||
                Build.HARDWARE.contains("ranchu")) {
            return "http://10.0.2.2:8080/";  // Emulador
        } else {
            return "http://172.16.1.163:8080/";  // Tu móvil físico (cambia esta IP cuando cambies de red)
        }
    }

    private static final String BASE_URL = getBaseUrl();
    private static Retrofit retrofit;

    public static ApiService getApi() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(ApiService.class);
    }
}
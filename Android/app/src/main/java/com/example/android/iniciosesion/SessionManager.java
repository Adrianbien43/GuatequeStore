package com.example.android.iniciosesion;

import android.content.Context;
import android.content.SharedPreferences;

public class SessionManager {

    // Constantes
    private static final String PREF_NAME = "UserSession";
    private static final String KEY_TOKEN = "token";
    private static final String KEY_USER_ID = "user_id";
    private static final String KEY_USER_NAME = "user_name";
    private static final String KEY_USER_EMAIL = "user_email";
    private static final String KEY_IS_LOGGED_IN = "is_logged_in";

    private SharedPreferences pref;
    private SharedPreferences.Editor editor;
    private Context context;

    // Constructor
    public SessionManager(Context context) {
        this.context = context;
        pref = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = pref.edit();
    }

    /**
     * Guardar datos de inicio de sesión
     */
    public void saveLoginDetails(String token, String userId, String userName, String userEmail) {
        editor.putString(KEY_TOKEN, token);
        editor.putString(KEY_USER_ID, userId);
        editor.putString(KEY_USER_NAME, userName);
        editor.putString(KEY_USER_EMAIL, userEmail);
        editor.putBoolean(KEY_IS_LOGGED_IN, true);
        editor.apply(); // apply() es asíncrono y más seguro que commit()
    }

    /**
     * Guardar solo el token (si necesitas actualizarlo)
     */
    public void saveToken(String token) {
        editor.putString(KEY_TOKEN, token);
        editor.apply();
    }

    /**
     * Obtener token
     */
    public String getToken() {
        return pref.getString(KEY_TOKEN, null);
    }

    /**
     * Obtener ID del usuario
     */
    public String getUserId() {
        return pref.getString(KEY_USER_ID, null);
    }

    /**
     * Obtener nombre del usuario
     */
    public String getUserName() {
        return pref.getString(KEY_USER_NAME, null);
    }

    /**
     * Obtener email del usuario
     */
    public String getUserEmail() {
        return pref.getString(KEY_USER_EMAIL, null);
    }

    /**
     * Verificar si hay sesión iniciada
     */
    public boolean isLoggedIn() {
        return pref.getBoolean(KEY_IS_LOGGED_IN, false);
    }

    /**
     * Cerrar sesión (borra todos los datos)
     */
    public void logout() {
        editor.clear();
        editor.apply();
    }

    /**
     * Obtener token completo con tipo (si lo necesitas)
     * Ejemplo: "Bearer eyJhbGciOiJIUzI1NiIs..."
     */
    public String getFullToken() {
        String token = getToken();
        if (token != null && !token.startsWith("Bearer ")) {
            return "Bearer " + token;
        }
        return token;
    }

    /**
     * Actualizar solo el nombre de usuario
     */
    public void updateUserName(String newName) {
        editor.putString(KEY_USER_NAME, newName);
        editor.apply();
    }

    /**
     * Actualizar solo el email
     */
    public void updateUserEmail(String newEmail) {
        editor.putString(KEY_USER_EMAIL, newEmail);
        editor.apply();
    }
}
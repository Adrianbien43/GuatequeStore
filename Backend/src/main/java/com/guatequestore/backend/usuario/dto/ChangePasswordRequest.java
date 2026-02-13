package com.guatequestore.backend.usuario.dto;

public class ChangePasswordRequest {

    //Contraseña que el usario está usando actualmente
    private String passwordActual;
    //Nueva contraseña que quiere establecer
    private String nuevaPassword;

    public String getPasswordActual() {
        return passwordActual;
    }

    public void setPasswordActual(String passwordActual) {
        this.passwordActual = passwordActual;
    }

    public String getNuevaPassword() {
        return nuevaPassword;
    }

    public void setNuevaPassword(String nuevaPassword) {
        this.nuevaPassword = nuevaPassword;
    }
}

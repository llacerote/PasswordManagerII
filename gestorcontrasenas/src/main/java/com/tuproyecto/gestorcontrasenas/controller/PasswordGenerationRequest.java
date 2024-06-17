package com.tuproyecto.gestorcontrasenas.controller;

public class PasswordGenerationRequest {
    private int length;
    private boolean useUpper;
    private boolean useLower;
    private boolean useDigits;
    private boolean useSpecial;
    private String service;

    // Getters y setters
    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public boolean isUseUpper() {
        return useUpper;
    }

    public void setUseUpper(boolean useUpper) {
        this.useUpper = useUpper;
    }

    public boolean isUseLower() {
        return useLower;
    }

    public void setUseLower(boolean useLower) {
        this.useLower = useLower;
    }

    public boolean isUseDigits() {
        return useDigits;
    }

    public void setUseDigits(boolean useDigits) {
        this.useDigits = useDigits;
    }

    public boolean isUseSpecial() {
        return useSpecial;
    }

    public void setUseSpecial(boolean useSpecial) {
        this.useSpecial = useSpecial;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }
}

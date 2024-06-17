package com.tuproyecto.gestorcontrasenas.controller;

import com.tuproyecto.gestorcontrasenas.service.PasswordGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/password-management")
public class PasswordController {

    @Autowired
    private PasswordGeneratorService passwordGeneratorService;

    @GetMapping("/generate-password")
    public String generatePassword(@RequestParam int length,
                                   @RequestParam boolean useUpper,
                                   @RequestParam boolean useLower,
                                   @RequestParam boolean useDigits,
                                   @RequestParam boolean useSpecial) {
        return passwordGeneratorService.generatePassword(length, useUpper, useLower, useDigits, useSpecial);
    }
}

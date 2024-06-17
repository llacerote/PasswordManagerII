package com.tuproyecto.gestorcontrasenas.dto;

import com.tuproyecto.gestorcontrasenas.model.Password;
import com.tuproyecto.gestorcontrasenas.model.User;
import com.tuproyecto.gestorcontrasenas.service.PasswordGeneratorService;
import com.tuproyecto.gestorcontrasenas.service.PasswordService;
import com.tuproyecto.gestorcontrasenas.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/passwords")
public class PasswordManagementController {

    @Autowired
    private PasswordGeneratorService passwordGeneratorService;

    @Autowired
    private PasswordService passwordService;

    @Autowired
    private UserService userService;

    @GetMapping("/generate")
    public String generatePassword(@RequestParam int length,
                                   @RequestParam boolean useUpper,
                                   @RequestParam boolean useLower,
                                   @RequestParam boolean useDigits,
                                   @RequestParam boolean useSpecial) {
        return passwordGeneratorService.generatePassword(length, useUpper, useLower, useDigits, useSpecial);
    }

    @PostMapping("/save")
    public Password savePassword(@RequestParam String username, @RequestBody Password password) {
        User user = userService.findByUsername(username);
        if (user != null) {
            password.setUser(user);
            return passwordService.savePassword(password);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @GetMapping("/user/{username}")
    public List<Password> getPasswordsByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user != null) {
            return passwordService.findByUser(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deletePassword(@PathVariable Long id) {
        passwordService.deletePassword(id);
}


}

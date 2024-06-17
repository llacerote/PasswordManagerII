package com.tuproyecto.gestorcontrasenas.controller;

import com.tuproyecto.gestorcontrasenas.model.User;
import com.tuproyecto.gestorcontrasenas.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser != null) {
            if (existingUser.getPasswordHash().equals(user.getPasswordHash())) {
                return existingUser;
            } else {
                throw new RuntimeException("Invalid credentials");
            }
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }
        return userService.saveUser(user);
    }
}

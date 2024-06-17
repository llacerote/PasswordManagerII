package com.tuproyecto.gestorcontrasenas.service;

import com.tuproyecto.gestorcontrasenas.model.User;
import com.tuproyecto.gestorcontrasenas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}

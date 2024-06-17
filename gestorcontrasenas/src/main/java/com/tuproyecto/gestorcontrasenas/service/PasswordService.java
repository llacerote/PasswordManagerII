package com.tuproyecto.gestorcontrasenas.service;

import com.tuproyecto.gestorcontrasenas.model.Password;
import com.tuproyecto.gestorcontrasenas.model.User;
import com.tuproyecto.gestorcontrasenas.repository.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordService {

    @Autowired
    private PasswordRepository passwordRepository;

    public Password savePassword(Password password) {
        return passwordRepository.save(password);
    }

    public List<Password> findByUser(User user) {
        return passwordRepository.findByUser(user);
    }
    public void deletePassword(Long id) {
        passwordRepository.deleteById(id);
    }
    
}

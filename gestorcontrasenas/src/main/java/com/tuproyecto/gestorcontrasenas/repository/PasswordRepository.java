package com.tuproyecto.gestorcontrasenas.repository;

import com.tuproyecto.gestorcontrasenas.model.Password;
import com.tuproyecto.gestorcontrasenas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PasswordRepository extends JpaRepository<Password, Long> {
    List<Password> findByUser(User user);
}

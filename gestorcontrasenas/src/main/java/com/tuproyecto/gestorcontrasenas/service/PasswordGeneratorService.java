package com.tuproyecto.gestorcontrasenas.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

@Service
public class PasswordGeneratorService {

    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL = "!@#$%&*()-_=+<>?";

    public String generatePassword(int length, boolean useUpper, boolean useLower, boolean useDigits, boolean useSpecial) {
        StringBuilder password = new StringBuilder(length);
        SecureRandom random = new SecureRandom();
        List<String> charCategories = new ArrayList<>();

        if (useUpper) charCategories.add(UPPER);
        if (useLower) charCategories.add(LOWER);
        if (useDigits) charCategories.add(DIGITS);
        if (useSpecial) charCategories.add(SPECIAL);

        for (int i = 0; i < length; i++) {
            String charCategory = charCategories.get(random.nextInt(charCategories.size()));
            int position = random.nextInt(charCategory.length());
            password.append(charCategory.charAt(position));
        }

        return new String(password);
    }
}

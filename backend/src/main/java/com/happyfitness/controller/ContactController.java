package com.happyfitness.controller;

import com.happyfitness.model.ContactRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private static final Logger log = LoggerFactory.getLogger(ContactController.class);

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContact(@Valid @RequestBody ContactRequest request) {
        log.info("=== Nouveau message de contact ===");
        log.info("Nom: {}", request.getName());
        log.info("Email: {}", request.getEmail());
        log.info("Téléphone: {}", request.getPhone());
        log.info("Sujet: {}", request.getSubject());
        log.info("Message: {}", request.getMessage());
        log.info("Date: {}", LocalDateTime.now());
        log.info("==================================");

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("message", "Merci ! Votre message a été envoyé avec succès. Nous vous répondrons sous 24h.");
        response.put("timestamp", LocalDateTime.now().toString());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/info")
    public ResponseEntity<Map<String, String>> getContactInfo() {
        Map<String, String> info = new LinkedHashMap<>();
        info.put("name", "Happy Fitness Club");
        info.put("address", "Hay Chmaou, Yousra Zarkae 60 (prêt de la société Coca Cola), Salé, Morocco");
        info.put("phone", "05378-77734");
        info.put("email", "happyfitness.infos@gmail.com");
        info.put("facebook", "https://Facebook.com/Happyfitness.ma");
        info.put("instagram", "https://www.instagram.com/happyfitnessclub_/");
        info.put("hours", "06:00 - 23:00");
        return ResponseEntity.ok(info);
    }
}

package com.happyfitness.controller;

import com.happyfitness.model.Pack;
import com.happyfitness.model.PricingTier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/pricing")
public class PricingController {

    @GetMapping("/packs")
    public ResponseEntity<List<Pack>> getPacks() {
        List<Pack> packs = new ArrayList<>();

        packs.add(new Pack(
            "happier",
            "HAPPIER PACK",
            "L'expérience ultime",
            780,
            "DHS",
            "/trimestre",
            List.of(
                "Accès illimité Gym & Cardio",
                "Planning personnalisé",
                "1x Séance Coach Privé /mois",
                "Accès vestiaires premium",
                "Badge digital & suivi"
            ),
            true
        ));

        packs.add(new Pack(
            "happy",
            "HAPPY PACK",
            "L'essentiel pour commencer",
            330,
            "DHS",
            "/mois",
            List.of(
                "Accès Gym & Cardio",
                "Planning standard",
                "Suivi digital",
                "Accès vestiaires"
            ),
            false
        ));

        return ResponseEntity.ok(packs);
    }

    @GetMapping("/grid")
    public ResponseEntity<List<PricingTier>> getPricingGrid() {
        List<PricingTier> grid = List.of(
            new PricingTier("Accès Libre", "330 DHS", "780 DHS", "2200 DHS"),
            new PricingTier("Musculation", "230 DHS", "500 DHS", "—"),
            new PricingTier("Cardio", "200 DHS", "500 DHS", "—")
        );
        return ResponseEntity.ok(grid);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        Map<String, Object> dashboard = new LinkedHashMap<>();
        
        // Badge info
        Map<String, String> badge = new LinkedHashMap<>();
        badge.put("memberId", "MEMBRE #2847");
        badge.put("type", "Accès Premium");
        badge.put("status", "online");
        dashboard.put("badge", badge);

        // Prochain cours
        Map<String, Object> cours = new LinkedHashMap<>();
        cours.put("name", "ZUMBA");
        cours.put("time", "18h30");
        cours.put("date", "Aujourd'hui");
        cours.put("placesLeft", 3);
        cours.put("totalPlaces", 20);
        cours.put("fillPercentage", 85);
        dashboard.put("prochainCours", cours);

        // Abonnement
        Map<String, Object> abo = new LinkedHashMap<>();
        abo.put("status", "ACTIF");
        abo.put("type", "Premium");
        abo.put("daysLeft", 28);
        abo.put("totalDays", 90);
        dashboard.put("abonnement", abo);

        // Performance
        Map<String, Object> perf = new LinkedHashMap<>();
        perf.put("sessions", 12);
        perf.put("totalHours", "8.5h");
        perf.put("streak", 5);
        perf.put("weeklyData", List.of(50, 45, 35, 25, 15, 20, 18));
        dashboard.put("performance", perf);

        return ResponseEntity.ok(dashboard);
    }
}

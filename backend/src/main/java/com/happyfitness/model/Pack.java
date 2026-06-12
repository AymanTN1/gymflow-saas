package com.happyfitness.model;

import java.util.List;

public class Pack {
    private String id;
    private String name;
    private String subtitle;
    private int price;
    private String currency;
    private String period;
    private List<String> features;
    private boolean popular;

    public Pack() {}

    public Pack(String id, String name, String subtitle, int price, String currency, 
                String period, List<String> features, boolean popular) {
        this.id = id;
        this.name = name;
        this.subtitle = subtitle;
        this.price = price;
        this.currency = currency;
        this.period = period;
        this.features = features;
        this.popular = popular;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }

    public boolean isPopular() { return popular; }
    public void setPopular(boolean popular) { this.popular = popular; }
}

package com.happyfitness.model;

public class PricingTier {
    private String formula;
    private String monthly;
    private String quarterly;
    private String annual;

    public PricingTier() {}

    public PricingTier(String formula, String monthly, String quarterly, String annual) {
        this.formula = formula;
        this.monthly = monthly;
        this.quarterly = quarterly;
        this.annual = annual;
    }

    public String getFormula() { return formula; }
    public void setFormula(String formula) { this.formula = formula; }

    public String getMonthly() { return monthly; }
    public void setMonthly(String monthly) { this.monthly = monthly; }

    public String getQuarterly() { return quarterly; }
    public void setQuarterly(String quarterly) { this.quarterly = quarterly; }

    public String getAnnual() { return annual; }
    public void setAnnual(String annual) { this.annual = annual; }
}

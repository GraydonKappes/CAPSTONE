package com.prs.web.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "Vendorid")
    private int vendorId;

    @Column(name = "PartNumber")
    private String partNumber = "";  // Initialize with empty string as default

    @Column(name = "Name")
    private String name;

    @Column(name = "Price")
    private BigDecimal price;

    @Column(name = "Unit")
    private String unit;

    // Default constructor
    public Product() {
        this.partNumber = "";  // Set default in constructor
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getVendorId() {
        return vendorId;
    }

    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }

    public String getPartNumber() {
        return partNumber != null ? partNumber : "";  // Ensure never null
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber != null ? partNumber : "";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    @PrePersist
    public void prePersist() {
        if (this.partNumber == null) {
            this.partNumber = "";
        }
    }
}
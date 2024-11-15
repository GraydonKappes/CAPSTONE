// Vendor.java
package com.prs.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vendor")
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(length = 10, nullable = false, unique = true)
    private String code;
    
    @Column(length = 255, nullable = false)
    private String name;
    
    @Column(length = 255, nullable = false)
    private String address;
    
    @Column(length = 255, nullable = false)
    private String city;
    
    @Column(length = 2, nullable = false)
    private String state;
    
    @Column(length = 5, nullable = false)
    private String zip;
    
    @Column(name = "PhoneNumber", length = 12)
    private String phoneNumber;
    
    @Column(length = 100, nullable = false)
    private String email;

    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    
    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
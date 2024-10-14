package com.prs.web.controller;

import com.prs.web.model.Vendor;
import com.prs.web.db.VendorDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private VendorDb vendorDb;

    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorDb.findAll();
    }

    @GetMapping("/{id}")
    public Vendor getVendorById(@PathVariable int id) {
        return vendorDb.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found with id: " + id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Vendor createVendor(@RequestBody Vendor vendor) {
        return vendorDb.save(vendor);
    }

    @PutMapping("/{id}")
    public Vendor updateVendor(@PathVariable int id, @RequestBody Vendor vendor) {
        if (!vendorDb.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found with id: " + id);
        }
        vendor.setId(id);
        return vendorDb.save(vendor);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteVendor(@PathVariable int id) {
        if (!vendorDb.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendor not found with id: " + id);
        }
        vendorDb.deleteById(id);
    }
}
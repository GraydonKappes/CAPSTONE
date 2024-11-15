package com.prs.web.controller;

import com.prs.web.model.Vendor;
import com.prs.web.db.VendorDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin
public class VendorController {
    @Autowired
    private VendorDb repo;

    @GetMapping
    public List<Vendor> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vendor> getById(@PathVariable int id) {
        return repo.findById(id)
                .map(x -> new ResponseEntity<>(x, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Vendor vendor) {
        try {
            Vendor savedVendor = repo.save(vendor);
            return new ResponseEntity<>(savedVendor, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating vendor: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>("Error creating vendor: " + e.getMessage(), 
                                     HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Vendor vendor) {
        try {
            if (!repo.existsById(id)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            vendor.setId(id);
            Vendor updatedVendor = repo.save(vendor);
            return new ResponseEntity<>(updatedVendor, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error updating vendor: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>("Error updating vendor: " + e.getMessage(), 
                                     HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            if (!repo.existsById(id)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            repo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.err.println("Error deleting vendor: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>("Error deleting vendor: " + e.getMessage(), 
                                     HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
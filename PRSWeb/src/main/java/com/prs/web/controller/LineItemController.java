// LineItemController.java
package com.prs.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.prs.web.model.LineItem;
import com.prs.web.db.LineItemDb;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/lineitems")
public class LineItemController {
    
    @Autowired
    private LineItemDb lineItemDb;
    
    @GetMapping("")
    public ResponseEntity<List<LineItem>> getAll() {
        return new ResponseEntity<>(lineItemDb.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LineItem> getById(@PathVariable int id) {
        var lineItem = lineItemDb.findById(id);
        if(lineItem.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(lineItem.get(), HttpStatus.OK);
    }
    
    @GetMapping("/request/{requestId}")
    public ResponseEntity<List<LineItem>> getByRequestId(@PathVariable int requestId) {
        return new ResponseEntity<>(lineItemDb.findByRequestId(requestId), HttpStatus.OK);
    }
    
    @PostMapping("")
    public ResponseEntity<LineItem> create(@RequestBody LineItem lineItem) {
        if(lineItem == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        lineItem.setId(0);
        var savedLineItem = lineItemDb.save(lineItem);
        return new ResponseEntity<>(savedLineItem, HttpStatus.CREATED);
    }
    
    @PutMapping("")
    public ResponseEntity<LineItem> update(@RequestBody LineItem lineItem) {
        if(lineItem == null || lineItem.getId() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        var existingLineItem = lineItemDb.findById(lineItem.getId());
        if(existingLineItem.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(lineItemDb.save(lineItem), HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable int id) {
        var lineItem = lineItemDb.findById(id);
        if(lineItem.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        lineItemDb.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
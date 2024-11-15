// LineItemController.java
package com.prs.web.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.prs.web.db.LineItemDb;
import com.prs.web.model.LineItem;

@CrossOrigin
@RestController
@RequestMapping("/api/lineitems")
public class LineItemController {
    @Autowired
    private LineItemDb lineItemDb;
    
    @GetMapping
    public ResponseEntity<List<LineItem>> getAllLineItems() {
        return new ResponseEntity<>(lineItemDb.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LineItem> getLineItemById(@PathVariable int id) {
        Optional<LineItem> lineItem = lineItemDb.findById(id);
        if(lineItem.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(lineItem.get(), HttpStatus.OK);
    }
    
    @GetMapping("/request/{requestId}")
    public ResponseEntity<List<LineItem>> getLineItemsByRequestId(@PathVariable int requestId) {
        List<LineItem> items = lineItemDb.findByRequestId(requestId);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<LineItem> createLineItem(@RequestBody LineItem lineItem) {
        LineItem newLineItem = lineItemDb.save(lineItem);
        return new ResponseEntity<>(newLineItem, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LineItem> updateLineItem(@PathVariable int id, @RequestBody LineItem lineItem) {
        if (!lineItemDb.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        lineItem.setId(id);
        return new ResponseEntity<>(lineItemDb.save(lineItem), HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLineItem(@PathVariable int id) {
        if (!lineItemDb.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        lineItemDb.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
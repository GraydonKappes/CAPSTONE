// LineItemController.java
package com.prs.web.controller;

import com.prs.web.model.LineItem;
import com.prs.web.model.Request;
import com.prs.web.db.LineItemDb;
import com.prs.web.db.RequestDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lineitems")
@CrossOrigin
public class LineItemController {
    @Autowired
    private LineItemDb lineItemDb;
    
    @Autowired
    private RequestDb requestDb;
    
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
        try {
            LineItem newLineItem = lineItemDb.save(lineItem);
            updateRequestTotal(lineItem.getRequest().getId());
            return new ResponseEntity<>(newLineItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LineItem> updateLineItem(@PathVariable int id, @RequestBody LineItem lineItem) {
        if (!lineItemDb.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        try {
            lineItem.setId(id);
            LineItem updatedLineItem = lineItemDb.save(lineItem);
            updateRequestTotal(lineItem.getRequest().getId());
            return new ResponseEntity<>(updatedLineItem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLineItem(@PathVariable int id) {
        Optional<LineItem> lineItem = lineItemDb.findById(id);
        if (lineItem.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        int requestId = lineItem.get().getRequest().getId();
        lineItemDb.deleteById(id);
        updateRequestTotal(requestId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    private void updateRequestTotal(int requestId) {
        Request request = requestDb.findById(requestId).orElse(null);
        if (request != null) {
            List<LineItem> lineItems = lineItemDb.findByRequestId(requestId);
            double total = lineItems.stream()
                .mapToDouble(item -> item.getProduct().getPrice().doubleValue() * item.getQuantity())
                .sum();
            request.setTotal(total);
            requestDb.save(request);
        }
    }
}
package com.prs.web.controller;

import com.prs.web.model.Request;
import com.prs.web.db.RequestDb;
import com.prs.web.db.UserDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin
public class RequestController {
    @Autowired
    private RequestDb repo;
    
    @Autowired
    private UserDb userRepo;

    @GetMapping
    public List<Request> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getById(@PathVariable int id) {
        return repo.findById(id)
                .map(x -> new ResponseEntity<>(x, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Request> create(@RequestBody Request request) {
        if (!userRepo.existsById(request.getUserId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (request.getTotal() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // Set initial status if not provided
        if (request.getStatus() == null || request.getStatus().trim().isEmpty()) {
            request.setStatus("NEW");
        }
        return new ResponseEntity<>(repo.save(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> update(@PathVariable int id, @RequestBody Request request) {
        if (!repo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (!userRepo.existsById(request.getUserId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (request.getTotal() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        request.setId(id);
        return new ResponseEntity<>(repo.save(request), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!repo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        repo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Additional endpoints for request workflow
    @PutMapping("/review/{id}")
    public ResponseEntity<Request> reviewRequest(@PathVariable int id, @RequestBody Request request) {
        if (!repo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        request.setId(id);
        
        // Validate status transition
        String status = request.getStatus().toUpperCase();
        if (!status.equals("APPROVED") && !status.equals("REJECTED")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        // If rejected, ensure reason is provided
        if (status.equals("REJECTED") && 
            (request.getReasonForRejection() == null || 
             request.getReasonForRejection().trim().isEmpty())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<>(repo.save(request), HttpStatus.OK);
    }
}
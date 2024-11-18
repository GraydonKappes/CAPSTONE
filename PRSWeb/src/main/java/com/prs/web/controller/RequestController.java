package com.prs.web.controller;

import com.prs.web.model.Request;
import com.prs.web.db.RequestDb;
import com.prs.web.db.UserDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin
public class RequestController {
    @Autowired
    private RequestDb requestRepo;
    
    @Autowired
    private UserDb userRepo;

    @GetMapping
    public List<Request> getAll() {
        return requestRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getById(@PathVariable int id) {
        return requestRepo.findById(id)
                .map(x -> new ResponseEntity<>(x, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Request> create(@RequestBody Request request) {
        if (!userRepo.existsById(request.getUserId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        request.setStatus("NEW");
        request.setSubmittedDate(LocalDateTime.now());
        
        if (request.getTotal() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(requestRepo.save(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> update(@PathVariable int id, @RequestBody Request request) {
        if (!requestRepo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (!userRepo.existsById(request.getUserId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (request.getTotal() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        request.setId(id);
        return new ResponseEntity<>(requestRepo.save(request), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (!requestRepo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        requestRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/submit-review")
    public ResponseEntity<Request> submitForReview(@PathVariable int id) {
        if (!requestRepo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Request request = requestRepo.findById(id).get();
        
        if (request.getTotal() <= 50) {
            request.setStatus("APPROVED");
        } else {
            request.setStatus("REVIEW");
        }
        
        return new ResponseEntity<>(requestRepo.save(request), HttpStatus.OK);
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<Request>> getRequestsForReview() {
        List<Request> requests = requestRepo.findByStatus("REVIEW");
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Request> approveRequest(@PathVariable int id) {
        if (!requestRepo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Request request = requestRepo.findById(id).get();
        request.setStatus("APPROVED");
        
        return new ResponseEntity<>(requestRepo.save(request), HttpStatus.OK);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Request> rejectRequest(
            @PathVariable int id, 
            @RequestParam String reasonForRejection) {
        
        if (!requestRepo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Request request = requestRepo.findById(id).get();
        request.setStatus("REJECTED");
        request.setReasonForRejection(reasonForRejection);
        
        return new ResponseEntity<>(requestRepo.save(request), HttpStatus.OK);
    }
}
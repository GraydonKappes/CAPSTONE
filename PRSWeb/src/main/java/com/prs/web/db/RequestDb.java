package com.prs.web.db;

import com.prs.web.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RequestDb extends JpaRepository<Request, Integer> {
    List<Request> findByStatus(String status);
    List<Request> findByUserId(Integer userId);
}
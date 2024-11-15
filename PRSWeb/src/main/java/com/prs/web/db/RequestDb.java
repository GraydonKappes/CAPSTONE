package com.prs.web.db;

import com.prs.web.model.Request;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestDb extends JpaRepository<Request, Integer> {

	List<Request> findAll();
}
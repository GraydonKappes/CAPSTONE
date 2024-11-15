package com.prs.web.db;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prs.web.model.Product;


public interface ProductDb extends JpaRepository<Product, Integer> {

}
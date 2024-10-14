package com.prs.web.db;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.prs.web.model.Product;


public interface ProductDb extends JpaRepository<Product, Integer> {

}
package com.prs.web.db;

import com.prs.web.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorDb extends JpaRepository<Vendor, Integer> {
    // You can add custom query methods here if needed
}
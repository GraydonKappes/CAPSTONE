// Repository interface
package com.prs.web.db;

import com.prs.web.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorDb extends JpaRepository<Vendor, Integer> {
}

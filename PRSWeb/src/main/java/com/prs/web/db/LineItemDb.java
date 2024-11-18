// LineItemDb.java
package com.prs.web.db;

import com.prs.web.model.LineItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface LineItemDb extends JpaRepository<LineItem, Integer> {
    @Query("SELECT li FROM LineItem li WHERE li.request.id = :requestId")
    List<LineItem> findByRequestId(@Param("requestId") int requestId);
    
    @Query("SELECT li FROM LineItem li WHERE li.product.id = :productId")
    List<LineItem> findByProductId(@Param("productId") int productId);
}
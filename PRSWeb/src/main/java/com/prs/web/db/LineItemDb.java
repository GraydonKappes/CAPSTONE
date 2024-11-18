// LineItemDb.java
package com.prs.web.db;

import org.springframework.data.jpa.repository.JpaRepository;
import com.prs.web.model.LineItem;
import java.util.List;

public interface LineItemDb extends JpaRepository<LineItem, Integer> {
    List<LineItem> findByRequestId(int requestId);
}
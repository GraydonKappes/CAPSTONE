// LineItemDb.java
package com.prs.web.db;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.prs.web.model.LineItem;

public interface LineItemDb extends JpaRepository<LineItem, Integer> {
    List<LineItem> findByRequestId(int requestId);
}
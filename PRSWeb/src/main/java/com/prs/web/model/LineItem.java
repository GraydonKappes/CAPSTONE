// LineItem.java
package com.prs.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "LineItems")
public class LineItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "RequestId", nullable = false)
    private int requestId;
    
    @Column(name = "ProductId", nullable = false)
    private int productId;
    
    @Column(name = "Quantity", nullable = false)
    private int quantity;

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getRequestId() { return requestId; }
    public void setRequestId(int requestId) { this.requestId = requestId; }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
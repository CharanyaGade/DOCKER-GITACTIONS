package com.klef.dev;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "item_table")
public class Item {

    @Id
    @Column(name = "item_id")
    private int id;

    @Column(name = "item_name", nullable = false, length = 20)
    private String name;

    @Column(name = "item_category", nullable = false, length = 30)
    private String category;

    @Column(name = "item_price", nullable = false)
    private double price;

    @Column(name = "item_quantity", nullable = false)
    private int quantity;

    @Column(name = "item_supplier", nullable = false, length = 20)
    private String supplier;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }

    @Override
    public String toString() {
        return "Item [id=" + id + ", name=" + name + ", category=" + category +
                ", price=" + price + ", quantity=" + quantity + ", supplier=" + supplier + "]";
    }
	
}

package com.klef.dev;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.Item;
import com.klef.dev.ItemService;

@RestController
@RequestMapping("/itemapi")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/")
    public String home() {
        return "Item Management API is running...";
    }

    @PostMapping("/add")
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        Item savedItem = itemService.addItem(item);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.viewAllItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getItemById(@PathVariable int id) {
        Item item = itemService.getItemById(id);
        if (item != null) {
            return new ResponseEntity<>(item, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Item with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateItem(@RequestBody Item item) {
        Item existing = itemService.getItemById(item.getId());
        if (existing != null) {
            Item updated = itemService.updateItem(item);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Item with ID " + item.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable int id) {
        Item existing = itemService.getItemById(id);
        if (existing != null) {
            itemService.deleteItem(id);
            return new ResponseEntity<>("Item with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Item with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}

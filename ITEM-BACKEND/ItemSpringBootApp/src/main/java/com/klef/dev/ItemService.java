package com.klef.dev;

import java.util.List;
import com.klef.dev.Item;

public interface ItemService {
    Item addItem(Item item);
    List<Item> viewAllItems();
    Item getItemById(int id);
    Item updateItem(Item item);
    void deleteItem(int id);
}

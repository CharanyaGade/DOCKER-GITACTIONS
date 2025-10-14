package com.klef.dev;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.dev.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {

}

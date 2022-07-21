import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleDelete(id) {
    let newItems = items.filter((item) => item.id + "" !== id + "");
    setItems(newItems);
  }

  function onAddNewItem(item) {
    setItems([...items, item]);
  }

  function onAddToCart(udpdatedItem) {
    let newItems = items.map((item) => {
      if (item.id + "" === udpdatedItem.id + "") {
        return udpdatedItem;
      }
      return item;
    });
    setItems(newItems);
  }

  return (
    <div className="ShoppingList">
      <ItemForm onAddNewItem={onAddNewItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onAddToCart={onAddToCart}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

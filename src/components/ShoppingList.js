import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v1 as uuid } from "uuid";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
  const [isInCart, setIsInCart] = useState(false);

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

  function handleDelete(event) {
    let id = event.target.id;
    fetch(`http://localhost:4000/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let newItems = items.filter((item) => item.id+'' !== id+'');
    setItems(newItems);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = { id: uuid(), name, category, isInCart };

    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setItems([...items, formData]);
  }

  function handleAddToCart(event) {
    let id = event.target.id;
    let newItems = items.map((item) => {
      if (item.id+'' === id+'') {
        setIsInCart((isInCart) => !isInCart);
        return { ...item, isInCart: !isInCart };
      }
      return item;
    });

    setItems(newItems);
  }

  return (
    <div className="ShoppingList">
      <ItemForm
        handleSubmit={handleSubmit}
        setName={setName}
        setCategory={setCategory}
        category={category}
        name={name}
      />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

import React from "react";

function Item({ item, onDelete, onAddToCart }) {
  function handleAddToCart() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ isInCart: !item.isInCart }),
    })
      .then((response) => response.json())
      .then((item) => onAddToCart(item));
  }

  function handleDelete(event) {   
    let id = event.target.id;
    fetch(`http://localhost:4000/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => onDelete(id));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""} key={item.id}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        id={item.id}
        onClick={handleAddToCart}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" id={item.id} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default Item;

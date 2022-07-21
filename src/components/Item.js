import React from "react";

function Item({ item, handleDelete, handleAddToCart }) {
  return (
    <li className={item.isInCart ? "in-cart" : ""} key={item.id}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} id={item.id} onClick={handleAddToCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" id={item.id} onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;

import React from "react";
import "./cartItemCard.css";
import { NavLink } from "react-router-dom";

function CartItemCard({ item, deleteCartItems }) {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="png" />
      <div>
        <NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
}

export default CartItemCard;

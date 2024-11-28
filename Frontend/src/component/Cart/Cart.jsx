import React from "react";
import "./cart.css";
import CartItemCard from "./CartItemCard";

function Cart() {
  const item = {
    product: "productID",
    price: 2000,
    name: "kunal",
  };

  return (
    <>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        <div className="cartContainer">
          <CartItemCard item={item} />
        </div>
      </div>
    </>
  );
}

export default Cart;

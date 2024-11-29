import React from "react";
import "./confirmOrder.css";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function ConfirmOrder() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal < 1000 ? 0 : 100;

  const tax = subtotal * 0.05;

  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pincode},${shippingInfo.country}`;

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>

            <div className="confirmCartItems">
              <Typography>Your Cart Items:</Typography>
              <div className="confirmCartItemsContainer">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="product" />
                      <NavLink to={`/product/${item.product}`}>
                        {item.name}
                      </NavLink>
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>{item.quantity * item.price}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;

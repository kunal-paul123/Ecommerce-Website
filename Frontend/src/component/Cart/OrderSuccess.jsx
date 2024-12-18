import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import "./orderSuccess.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { CLEAR_ERRORS } from "../../Constants/orderConstants";

function OrderSuccess() {
  return (
    <>
      <div className="orderSuccess">
        <CheckCircleIcon />
        <Typography>Your order has been placed successfully</Typography>
        <NavLink to="/orders">View Orders</NavLink>
      </div>
    </>
  );
}

export default OrderSuccess;

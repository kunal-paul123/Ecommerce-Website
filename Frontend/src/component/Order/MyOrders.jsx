import React, { useEffect } from "react";
import "./myOrders.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearErrors, myOrders } from "../../Actions/orderAction";
import { NavLink } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";

function MyOrders() {
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 300, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <NavLink to={`/order/${params.row.id}`}>
            <LaunchIcon />
          </NavLink>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        name: item.orderItems[0].name,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, toast, error]);

  return (
    <>
      <MetaData title={`${user.name} - orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnclick
            className="myOrdersTable"
          />

          <Typography className="myOrdersHeading">
            {user.name}'s Orders
          </Typography>
        </div>
      )}
    </>
  );
}

export default MyOrders;

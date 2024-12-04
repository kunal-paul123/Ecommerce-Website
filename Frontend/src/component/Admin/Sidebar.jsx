import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/">
        <img src={logo} alt="Ecommerce" />
      </NavLink>
      <NavLink to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </NavLink>
      <NavLink>
        <SimpleTreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem itemId="1" label="Products">
            <NavLink to="/admin/products">
              <TreeItem itemId="2" label="All" labelIcon={<PostAddIcon />} />
            </NavLink>

            <NavLink to="/admin/product">
              <TreeItem itemId="3" label="Create" labelIcon={<AddIcon />} />
            </NavLink>
          </TreeItem>
        </SimpleTreeView>
      </NavLink>
      <NavLink to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </NavLink>
      <NavLink to="/admin/users">
        <p>
          <PeopleIcon />
          Users
        </p>
      </NavLink>
      <NavLink to="/admin/reviews">
        <p>
          <RateReviewOutlinedIcon />
          Reviews
        </p>
      </NavLink>
    </div>
  );
}

export default Sidebar;

import React from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer"></div>
    </div>
  );
}

export default Dashboard;

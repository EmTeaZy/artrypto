import Router, { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) {
    return (
      <div className="text-center mt-5">
        <h1>Admin dashboard</h1>
      </div>
    );
  } else Router.push("/admin/login");
};

export default Dashboard;

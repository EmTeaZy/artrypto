import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContextProvider } from "../../context/AuthContext";
const Dashboard = () => {
    return (
      <div className="text-center mt-5">
        <h1>Admin dashboard</h1>
      </div>
    );
};

export default Dashboard;

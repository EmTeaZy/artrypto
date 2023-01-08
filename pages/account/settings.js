import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SettingsForm from "../../components/SettingsForm";
import FullLayout from "../../src/layouts/FullLayout";


const Settings = () => {
  const { address, isConnected } = useAccount();
  const [user,changeUser]=useState({});
  const router = useRouter();
  useEffect(()=>{
    getUserData();
  })
  const getUserData = async ()=>{
    const JSONdata = JSON.stringify({walletAddress:address});
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    await fetch("/api/findOne", options)
      .then((res) => res.json())
      .then((user) =>{
        if(user)
        {
          changeUser(user.user)
        } else console.log("can't find user error");
      })
  }
  return (
    <>
      <FullLayout check={"user"}>
        <Box>
        <SettingsForm user={user}/>
        </Box>
      </FullLayout>
    </>
  );
};

export default Settings;

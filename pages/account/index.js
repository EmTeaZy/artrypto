import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import UserDetails from "../../components/AccountComponents/UserDetails";

const Account = () => {
  const { address, isConnected } = useAccount();
  const [user, changeUser] = useState({});
  const [addUser, changeStatus] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getUserData();
  });
  const getUserData = async () => {
    console.log("in")
    let JSONdata = JSON.stringify({ walletAddress: address });
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    await fetch("/api/findOne", options)
      .then((res) => res.json())
      .then(async (user) => {
        if (user.user) {
          changeUser(user.user);
        } else {
          changeStatus(true);
        }
      });
    if (addUser) {
      JSONdata = JSON.stringify({
        username: "unnamed",
        walletAddress: address,
      });
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      await fetch("/api/addUser", options)
        .then((res) => res.json())
        .then((user) => {
          if (user) {
            changeUser(user.user);
            changeStatus(false);
          } else {
            console.log("mongo error");
          }
        });
    }
  };
  return (
    <>
      <Box bgcolor={"primary.main"} px={8} py={4}>
        <UserDetails user={user} check={"user"} />
      </Box>
    </>
  );
};

export default Account;

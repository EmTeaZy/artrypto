import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import UserDetails from "../../components/AccountComponents/UserDetails";
import axios from "axios";
import CreatedNFTs from "../../components/AccountComponents/CreatedNFTs";
import {useAddress} from "@thirdweb-dev/react";

const Account = () => {
  const address = useAddress();
  const [user, setUser] = useState({});
  useEffect(() => getUserData, []);
  const getUserData = async () => {
    if (address) {
      await axios
        .post("/api/findUser", { walletAddress: address })
        .then((res) => {
          if (res.data) {
            setUser(res.data);
          } else {
            let img = Math.floor(Math.random() * (7 - 1 + 1) + 1).toString();
            axios
              .post("/api/addUser", {
                username: "unnamed",
                walletAddress: address,
                imgid: img,
              })
              .then((res) => {
                if (res.data) {
                  setUser(res.data.user);
                } else {
                  console.log("mongo error");
                }
              });
          }
        });
    }
  };

  return (
    <>
      <Box bgcolor={"primary.main"} px={8} py={4}>
        <UserDetails user={user} check={"user"} />
        <hr style={{ borderColor: "white" }} />
        <CreatedNFTs address={address} />
      </Box>
    </>
  );
};

export default Account;

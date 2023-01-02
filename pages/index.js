import { Button } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const index = () => {

  const [walletConnected, setWalletConnected] = useState(false); //hook to check wallet is connected or not
  const [userAddress, setUserAddress] = useState("");
  //to server side routing between pages
  const router = useRouter();

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);


  //connect metamask
  async function connect(onConnected) {
    if(setWalletConnected)
    {
      router.push("/account")
      return;
    }
    else
    {
      if (!window.ethereum) {
        alert("Get MetaMask!");
        return;
      }
      
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletConnected(true)
      onConnected(accounts[0]);
      router.push("/account")
    }
  }

  //check if wallet is connected
  async function checkIfWalletIsConnected(onConnected) {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        onConnected(account);
        setWalletConnected(true)
        return;
      }
    }
  }

  //on account change
  window.ethereum.on('accountsChanged',(accounts)=>{
    setUserAddress(accounts[0])
  })



  return (
    <>
      <h1>This is user landing page</h1>
      <Button variant="contained" onClick={() => connect(setUserAddress)}>
        Profile
      </Button>
      <p>
        {walletConnected ? "Wallet is connected" : "Wallet is not connected"}
      </p>
      <p>{userAddress}</p>
    </>
  );
};

export default index;

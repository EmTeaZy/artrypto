import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Typography from '@mui/material/Typography'

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
    if(walletConnected)
    {
      router.push("/account")
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
      }
    }
  }

  //on account change
  window.ethereum?.on('accountsChanged',(accounts)=>{
    setUserAddress(accounts[0])
  })

  return (
    <div className="text-center m-5">
      <Typography variant="h1"> This is user landing page </Typography>
      <Button variant="contained" onClick={() => connect(setUserAddress)}>
        Profile
      </Button>
      <Typography variant="subtitle1">
        {walletConnected ? "Wallet is connected" : "Wallet is not connected"}
      </Typography>
      <Typography variant="subtitle1">{userAddress}</Typography>
    </div>
  );
};

export default index;

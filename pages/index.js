import { Button } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useNetwork  } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { async } from "@firebase/util";

const index = () => {
  const { address, isConnected } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  //to server side routing between pages
  const router = useRouter();
  const { chain, chains } = useNetwork()

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  //check if wallet is connected
  async function checkIfWalletIsConnected(onConnected) {
    if (isConnected) {
      onConnected(address);
    }
  }

  async function connectWallet() {
    if (!isConnected) {
      connect();
    }
    else{
      router.push("/account")
    }
  }

  return (
    <>
      <h1>This is user landing page</h1>
      <Button variant="contained" onClick={() => connectWallet()}>
        Profile
      </Button>

      <p>{isConnected ? "Wallet is connected" : "Wallet is not connected"}</p>
      <p>{address}</p>
      {chain && <div>Connected to {chain.name}</div>}
      {chains && (
        <div>Available chains: {chains.map((chain) => chain.name)}</div>
      )}
    </>
  );
};

export default index;

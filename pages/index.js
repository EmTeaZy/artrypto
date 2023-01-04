import { Button } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect  } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { async } from "@firebase/util";

const index = () => {
  //get metamask account from wagmi hook
  const { address, isConnected } = useAccount();

  //to server side routing between pages
  const router = useRouter();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

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
    
    </>
  );
};

export default index;



//telling user to remain at goerli testnet component.
// import useNetwork
//const { chain, chains } = useNetwork()
//  <p>{chain.name!='Goerli'?"Change your network to goerli":""}</p>
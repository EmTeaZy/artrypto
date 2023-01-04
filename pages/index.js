
import { Button } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect  } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { async } from "@firebase/util";
import Typography from '@mui/material/Typography'


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
    <div className="text-center m-5">
      <Typography variant="h1"> This is user landing page </Typography>
      <Button variant="contained" onClick={() => connectWallet()}>
        Profile
      </Button>
      <Typography variant="subtitle1">
        {isConnected ? "Wallet is connected" : "Wallet is not connected"}
      </Typography>
      <Typography variant="subtitle1">{address}</Typography>
    </div>
  );
};

export default index;



//telling user to remain at goerli testnet component.
// import useNetwork
//const { chain, chains } = useNetwork()
//  <p>{chain.name!='Goerli'?"Change your network to goerli":""}</p>
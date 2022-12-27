import { Button } from "@mui/material";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useRef } from "react";
import { useRouter } from 'next/navigation';
const index = () => {
  const [walletConnected, setWalletConnected] = useState(false); //hook to check wallet is connected or not
  
  //to server side routing between pages
  const router = useRouter();

const [status,changeStatus]=useState("");

  //connect metamask wallet in this function
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    
    // If user is not connected to the Goerli Test network, let them know and throw an error
    
    const { chainId } = await provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = provider.getSigner();
      return signer;
    }

    return provider.getSigner();
  };


  //function to connect wallet and go to user profile page
  const connectWallet = async () => {
    console.log(status)
   if(!walletConnected)
   {
      try {
        const signer = await getProviderOrSigner();
        setWalletConnected(true);
        console.log(await signer.getAddress())
        //push to account page
        //  router.push('/user/account')
      } catch (err) {
        console.error(err);
      }
   }
   else
   {
      //  router.push('/user/account')
   }
  };
  return (
    <>
      <h1>This is user landing page</h1>
      <Button variant="contained" onClick={connectWallet}>
        Profile
      </Button>

      <p>hwllo</p>
    </>
  );
};

export default index;

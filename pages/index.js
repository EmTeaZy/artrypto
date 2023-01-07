import {Box} from "@mui/material";
import React from "react";
import {useAccount} from "wagmi";
import Typography from '@mui/material/Typography'


const index = () => {

  //get metamask account from wagmi hook
  const { isConnected } = useAccount();

  return (
    <>
    <Box sx={{textAlign:"center"}}>
      <Typography color="text.primary" variant="h1"> This is user landing page </Typography>
      <Typography variant="h3">
        {isConnected ? "Wallet is connected" : "Wallet is not connected"}
      </Typography>
    </Box>
    
    </>
  );
};

export default index;



//telling user to remain at goerli testnet component.
// import useNetwork
//const { chain, chains } = useNetwork()
//  <p>{chain.name!='Goerli'?"Change your network to goerli":""}</p>
import { Box, Typography } from "@mui/material";
import React from "react";
import { useNetwork } from "wagmi";

const SwitchGoerli = () => {
  const { chain, chains } = useNetwork();
  return (
    <>
      {chain?.name !== "Goerli" ? (
        <Box sx={{bgcolor:"warning.main" , textAlign:"center"}}>
          <Typography color="black" variant="subtitle2">
            Change your Ethereum network to Goerli testnet from Metamask
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default SwitchGoerli;

//telling user to remain at goerli testnet component.
// import useNetwork
//const { chain, chains } = useNetwork()
//  <p>{chain.name!='Goerli'?"Change your network to goerli":""}</p>

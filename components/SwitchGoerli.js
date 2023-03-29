import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAddress, useChainId } from "@thirdweb-dev/react";

const SwitchGoerli = () => {
  const chainID = useChainId();
  const address = useAddress();
  return (
    <>
      {chainID !== 5 && address ? (
        <Box sx={{ bgcolor: "warning.main", textAlign: "center" }}>
          <Typography color="black" variant="subtitle2">
            Change your Chain network to Goerli testnet from wallet
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

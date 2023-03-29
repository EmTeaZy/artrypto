import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import NFTCard from "./NFTCard";
import { useOwnedNFTs, useAddress, useContract } from "@thirdweb-dev/react";
import { NFT_MINTING_CONTRACT_ADDRESS } from "../../constants";

const CreatedNFTs = ({ nfts }) => {
  const [gotNFT, setStatus] = useState(false);
  const contractAddress = NFT_MINTING_CONTRACT_ADDRESS;
  const { contract } = useContract(contractAddress);
  const myaddress = useAddress();
  const {data,isLoading,error,} = useOwnedNFTs(contract, myaddress);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          mx: "auto",
        }}
      >
        {!nfts ? (
          <Typography color={"text.danger"} variant="subtitle 1">
            No NFTs minted
          </Typography>
        ) : (
          <></>
        )}
        {nfts ? nfts.map((NFT) => <NFTCard nft={NFT.metadata} />) : <></>}
      </Box>
    </>
  );
};

export default CreatedNFTs;

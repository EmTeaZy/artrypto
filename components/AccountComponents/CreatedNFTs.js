import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import NFTCard from "./NFTCard";
import { useOwnedNFTs, useAddress, useContract } from "@thirdweb-dev/react";
import { NFT_MINTING_CONTRACT_ADDRESS } from "../../constants";
import { useRouter } from "next/router";

const CreatedNFTs = ({ address }) => {
  const [nfts, setnfts] = useState();
  const [gotNFT, setStatus] = useState(true);
  const contractAddress = NFT_MINTING_CONTRACT_ADDRESS;
  const { contract } = useContract(contractAddress);
  const myaddress = address;
  const { data, isLoading, error } = useOwnedNFTs(contract, myaddress);
  useEffect(() => {
    setnfts(data);
    console.log(nfts);
  });
  return (
    <>
      <Typography variant="h1">Created NFTs</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          mx: "auto",
        }}
      >
        {!gotNFT ? (
          <Typography color={"text.danger"} variant="subtitle 1">
            No NFTs minted
          </Typography>
        ) : (
          <></>
        )}
        {data ? (
          data.map((NFT) => <NFTCard nft={NFT} />)
        ) : (
          <Typography variant="subtitle1" sx={{ color: "green" }}>
            Fetching Nfts...
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CreatedNFTs;

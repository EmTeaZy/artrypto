import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import NFTCard from "./NFTCard";
import { useAccount } from "wagmi";

const CreatedNFTs = () => {
  const { address } = useAccount();
  const [nfts, setnfts] = useState();
  const[gotNFT,setStatus]=useState(false);

  useEffect(() => fetchNFTs, []);

  const fetchNFTs = async () => {
    const walletAddress = address;
    const data = JSON.stringify(walletAddress);
    await fetch("/api/getNFTs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }).then((nftss) => {
      nftss.json().then((assets) => { 
        if(assets)
        setnfts(assets.assets) 
        else
        setStatus(true)
    });
    });
  };
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
        {nfts ? (
          nfts.map((NFT) => <NFTCard nft={NFT} />)
        ) : (
         <></>
        )}
      </Box>
    </>
  );
};

export default CreatedNFTs;

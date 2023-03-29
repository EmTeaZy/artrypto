import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import NFTCard from "./NFTCard";

const CreatedNFTs = ({ address }) => {
  const [nfts, setnfts] = useState();
  const [gotNFT, setStatus] = useState(false);
  const [addresss, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNFTs = async () => {
    setAddress(address);
    const walletAddress = addresss;
    const data = JSON.stringify(walletAddress);
    console.log(data);
    setLoading(true);
    await fetch("/api/getNFTs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }).then((nftss) => {
      nftss.json().then((assets) => {
        if (assets) {
          setnfts(assets.assets);
          return;
        } else setStatus(true);
      });
      setLoading(false);
    });
  };
  return (
    <>
      <Button
        disabled={loading}
        variant="outlined"
        color="primary"
        onClick={() => {
          fetchNFTs();
        }}
      >
        <Typography variant="h1">
          {loading ? "Fetching NFTs..." : "Created NFTs"}
        </Typography>
      </Button>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          mx: "auto",
        }}
      >
        {gotNFT ? (
          <Typography color={"text.danger"} variant="subtitle 1">
            No NFTs minted
          </Typography>
        ) : (
          <></>
        )}
        {nfts ? nfts.map((NFT) => <NFTCard nft={NFT} />) : <></>}
      </Box>
    </>
  );
};

export default CreatedNFTs;

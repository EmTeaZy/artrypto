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

const CreatedNFTs = ({address}) => {
  const [nfts, setnfts] = useState();
  const [gotNFT, setStatus] = useState(true);
  const contractAddress = NFT_MINTING_CONTRACT_ADDRESS;
  const { contract } = useContract(contractAddress);
  const myaddress = address;
  const {data,isLoading,error,} = useOwnedNFTs(contract, myaddress);
  useEffect(() => {
   setnfts(data)
   console.log(nfts)
  });
  const fetchNfts=(e)=>{
    setnfts(data)
    console.log("hi")
    setStatus(true)
  }
  return (
    <>
    <Button onClick={(e)=>{fetchNfts(e)}}>Fetch Nfts</Button>
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
        {nfts ? nfts.map((NFT) => <NFTCard nft={NFT} />) : <></>}
      </Box>
    </>
  );
};

export default CreatedNFTs;

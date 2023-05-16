import { Box } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Profile from '/public/images/nfts105.png';
import Image from "next/image";

const Hero = () => {
  return (
    <>
    
      <Box px= {10} sx={{ 
        textAlign: "left",
        display: "flex",
        flexDirection: {xs:"column", md:"row"},
        alignItems: "center",
        justifyContent: "space-between",
        my: 0
        }}>

            <Box>
        <Typography sx={{fontSize: 49 }} variant="h1">
          {" "}
          Explore, Buy and Sell NFTs
        </Typography>
        
          <Typography variant="h4">
          {" "}
          Pakistan's first and largest digital marketplace for crypto
          collectibles and non-fungible tokens (NFTs). Discover exclusive digital items and
          add them to your collection.
         </Typography>

        </Box>

        
        <Box>
            <Image src={Profile} width={730} height={410} alt="hero_image"></Image>
        </Box>
      </Box>
    </>
  );
}
export default Hero;
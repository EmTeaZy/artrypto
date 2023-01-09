import { Box } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Profile from '/public/images/nft101.png';

const Hero = () => {
  return (
    <>
    
      <Box sx={{ 
        textAlign: "left",
        }}>
        <Typography sx={{marginLeft: "88px", my: 25, fontSize: 58 }} variant="h1">
          {" "}
          Explore, Buy and Sell NFTs
          <Typography variant="h3">
          {" "}
          Pakistan's first and largest digital marketplace for crypto collectibles <br></br>
          and non-fungible tokens (NFTs). Discover exclusive digital items and<br></br>
          add them to your collection or sell them.
        </Typography>
        </Typography>
        
        
        <Box px={4}>
         
        </Box>
      </Box>
    </>
  );
}
export default Hero;
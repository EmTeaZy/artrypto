import { Box } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";

const InfoSection = () => {
  return (
    <>
    
      <Box sx={{ 
        textAlign: "right",
        }}>
        <Typography sx={{marginRight: "88px", my: 25, fontSize: 58 }} variant="h1">
          {" "}
          What is an NFT?
          <Typography variant="h3">
          {" "}
          An NFT (non-fungible token) is a unique digital item stored on a blockchain.<br></br>
          NFTs can represent almost anything, and serve as a digital record of ownership.
        </Typography>
        </Typography>
        
        
        <Box px={4}>
         
        </Box>
      </Box>
    </>
  );
}
export default InfoSection;
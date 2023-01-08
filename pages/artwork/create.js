import { Box, Typography } from "@mui/material";
import React from "react";
import GetArtworkDetails from "../../components/CreateComponents/GetArtworkDetails";

const Create = () => {
  return (
    <>
      <Box px={45}>
        <Box px={25}>
          <Typography variant="h1" color="text.primary" mt={3}>
            Create NFT
          </Typography>
          <Typography variant="subtitle2" color={"text.info"}>
            Upload your artwork, fill out the fields and make it an NFT.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GetArtworkDetails />
        </Box>
      </Box>
    </>
  );
};

export default Create;

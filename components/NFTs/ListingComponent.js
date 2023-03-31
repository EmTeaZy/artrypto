import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import {NFT_MINTING_CONTRACT_ADDRESS} from "../../constants"

const NFTCard = ({ nft }) => {
  const router = useRouter();
  return (
    <>
      <Card sx={{ Width: 300 }}>
        <CardActionArea>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 170 }}
              image={nft.asset.image}
              alt="Live from space album cover"
            />
            <CardContent>
              <Typography
                variant="h5"
                color="text.tertiary"
                gutterBottom
                component="div"
              >
                {nft.asset.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {nft.asset.description}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </>
  );
};

export default NFTCard;

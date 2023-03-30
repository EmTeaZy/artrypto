import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import EventList from "../../../../components/NFTs/EventList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { useAddress, useContract, useNFT } from "@thirdweb-dev/react";
import { database } from "../../../../config/firebase";
import { AddCircleTwoTone } from "@mui/icons-material";

const NFTDisplay = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id, contractAddress } = router.query;
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useNFT(contract, id);
  const [rate, setRate] = useState(0);
  const API_KEY =
    "acabd80096c3a92b83f2523c7d5aa44b532a877084b7090857640444f3f39e07";

  useEffect(() => {
    axios
      .get(
        `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,JPY,EUR?api_key=${API_KEY}`
      )
      .then((r) => {
        setRate(r?.data?.USD);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="d-flex flex-column">
      <div className="d-flex w-full m-auto">
        <Box sx={{ pr: 15, ml: 3, textAlign: "left", mt: 5 }}>
          <div className="left-container">
            <CardMedia
              component="img"
              sx={{ width: 370,borderRadius:"20px" }}
              image={data?.metadata.image || ''}
              alt="Live from space album cover"
            />
            <div className="mt-3">
              <Typography variant="h1">Description</Typography>
              <Typography variant="subtitle1">
                {data?.metadata.description || ''}
              </Typography>
            </div>
          </div>
        </Box>
        <div className="right-container">
          <div className="mt-5">
            <div>
              <Typography variant="h1">{data?.metadata.name || ''}</Typography>
              <Typography variant="subtitle1">
                Owned by <Typography color="secondary">{data?.owner || ''}</Typography> 
              </Typography>
            </div>

            <div className="d-flex flex-row mt-2">
              <Typography variant="subtitle2"># 12, 123</Typography>
              <Typography className="ms-2" variant="subtitle2">
                <VisibilityIcon color="light" fontSize="small" /> 123 views
              </Typography>
              <Typography
                className="ms-2"
                variant="subtitle2"
                sx={{ cursor: "pointer" }}
              >
                <FavoriteBorderIcon color="light" fontSize="small" /> 3
                favorites
              </Typography>
            </div>

            <div className="mt-5">
              <Typography variant="h2">
                Current Price <br />
              </Typography>
              <Typography variant="h1">{0.1}ETH</Typography>
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                ${(0.1 * rate).toFixed(2)}
              </Typography>
            </div>

            <div className="mt-5">
              {data?.owner === address ? (
                <Button
                  size="large"
                  variant="contained"
                  style={{ width: "20rem", height: "4rem" }}
                  startIcon={<AddCircleTwoTone/>}
                  onClick={()=>{router.push(`/nfts/${contractAddress}/${id}/sell`)}}
                >List for Sale</Button>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  style={{ width: "20rem", height: "4rem" }}
                  startIcon={<ShoppingBasketIcon />}
                >
                  {" "}
                  Buy Now{" "}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="m-5">
        <Typography variant="h1">Item Activity</Typography>
        <EventList />
      </div>
    </div>
  );
};

export default NFTDisplay;

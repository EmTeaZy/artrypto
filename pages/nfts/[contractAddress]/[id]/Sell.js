import { CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAddress, useContract, useNFT } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ListingInput from "../../../../components/SellComponents/ListingInput";

const Sell = () => {
  const router = useRouter();
  const { id, contractAddress } = router.query;
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useNFT(contract, id);
  const [basePrice, setBasePrice] = useState(0);
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
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mx: "auto",
            width: { xs: 300, md: 900 },
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Box>
            <Typography variant="h1">List for Sale</Typography>
            <ListingInput id={id} changeBasePrice={setBasePrice} />
          </Box>
          <Box bgcolor={"#121314"} sx={{ p: 4, borderRadius: "20px", ml: 8 }}>
            <CardMedia
              component="img"
              sx={{ width: 370, borderRadius: "20px" }}
              image={data?.metadata.image || ""}
              alt="nft-image-preview"
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="h2">{data?.metadata.name || ""}</Typography>
              <Typography variant="h4">{basePrice} ETH</Typography>
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                ${(basePrice * rate).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sell;

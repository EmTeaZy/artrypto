import { makeStyles } from "@material-ui/styles";
import {
  CardMedia,
  FormControl,
  MenuItem,
  Typography,
  TextField,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAddress, useContract, useSigner } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSnackbar } from "../../context/SnackbarContextProvider";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_MINTING_CONTRACT_ADDRESS,
} from "../../constants";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

const useStyles = makeStyles((theme) => ({
  select: {
    color: "black",
  },
}));
const ListingInput = ({ id,changeBasePrice }) => {
  const { show } = useSnackbar();
  const classes = useStyles();
  const router = useRouter();
  const address = useAddress();
  const contractAddress = NFT_MINTING_CONTRACT_ADDRESS;
  const marketplaceAddress = MARKETPLACE_CONTRACT_ADDRESS;
  const signer = useSigner();
  const { contract } = useContract(marketplaceAddress, "marketplace");
  const [basePrice, setBasePrice] = useState(0);
  const [saleType, setSaleType] = useState("fixed");
  const [auctionDuration, setAuctionDuration] = useState("");
  const handleBasePriceChange = (event) => {
    setBasePrice(event.target.value);
    changeBasePrice(event.target.value)
  };

  const handleSaleTypeChange = (event) => {
    setSaleType(event.target.value);
    // clear auction duration if fixed sale type is selected
    if (event.target.value === "fixed") {
      setAuctionDuration("");
    }
  };

  const handleAuctionDurationChange = (event) => {
    setAuctionDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ basePrice, saleType, auctionDuration });
    listForSale();
  };

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

  const directListing = async () => {
    const listing = {
      assetContractAddress: contractAddress,
      tokenId: id,
      startTimestamp: new Date(),
      listingDurationInSeconds:
        new Date().getTime() + Number(auctionDuration) * 24 * 60 * 60 * 1000,
      quantity: 1,
      currencyContractAddress: "0x7af963cF6D228E564e2A0aA0DdBF06210B38615D",
      buyoutPricePerToken: basePrice.toString(),
    };
    console.log(listing);
     const tx = await contract.direct.createListing(listing);
  };
  const listForSale = async () => {
    if (saleType === "fixed") {
      await directListing();
      show("NFT Listed for Sale");
      router.push("/");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Base Price"
          color="secondary"
          fullWidth
          value={basePrice}
          onChange={handleBasePriceChange}
          required
          type="number"
          InputProps={{ inputProps: { min: 0.001 } }}
          margin="normal"
        />
        <Typography variant="subtitle1" sx={{ color: "gray" }}>
          ${(basePrice * rate).toFixed(2)}
        </Typography>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel color="secondary">Sale Type</InputLabel>
          <Select
            value={saleType}
            onChange={handleSaleTypeChange}
            label="Sale Type"
            color="secondary"
          >
            <MenuItem value="fixed" classes={{ root: classes.select }}>
              Fixed Price
            </MenuItem>
            <MenuItem classes={{ root: classes.select }} value="auction">
              Auction
            </MenuItem>
          </Select>
        </FormControl>

        <Box>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel color="secondary">Sale Duration</InputLabel>
            <Select
              value={auctionDuration}
              onChange={handleAuctionDurationChange}
              label="Auction Duration"
              color="secondary"
            >
              <MenuItem classes={{ root: classes.select }} value="1">
                1 day
              </MenuItem>
              <MenuItem classes={{ root: classes.select }} value="3">
                3 days
              </MenuItem>
              <MenuItem classes={{ root: classes.select }} value="7">
                7 days
              </MenuItem>
              <MenuItem classes={{ root: classes.select }} value="30">
                1 month
              </MenuItem>
              <MenuItem classes={{ root: classes.select }} value="90">
                3 months
              </MenuItem>
              <MenuItem classes={{ root: classes.select }} value="120">
                6 months
              </MenuItem>
              <MenuItem classes={{ root: classes.select }} value="365">
                1 year
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" color="primary" type="submit" fullWidth>
          List for Sale
        </Button>
      </form>
    </>
  );
};

export default ListingInput;

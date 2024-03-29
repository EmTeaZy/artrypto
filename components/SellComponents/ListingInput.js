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
import {
  useAddress,
  useContract,
  useSigner,
  useCreateDirectListing,
  Web3Button,
} from "@thirdweb-dev/react";
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
import moment from "moment";

const ListingInput = ({ id, changeBasePrice }) => {
  const { show } = useSnackbar();
  const router = useRouter();
  const address = useAddress();
  const contractAddress = NFT_MINTING_CONTRACT_ADDRESS;
  const marketplaceAddress = MARKETPLACE_CONTRACT_ADDRESS;
  const signer = useSigner();
  const { contract } = useContract(marketplaceAddress, "marketplace");
  const [basePrice, setBasePrice] = useState(0);
  const [minBid, setMinBid] = useState(0);
  const [saleType, setSaleType] = useState("fixed");
  const [auctionDuration, setAuctionDuration] = useState("");
  const [check, changeCheck] = useState(false);

  const handleBasePriceChange = (event) => {
    setBasePrice(event.target.value);
    changeBasePrice(event.target.value);
  };

  const handleMinBidChange = (event) => {
    setMinBid(event.target.value);
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
      tokenId: Number(id),
      startTimestamp: new Date(),
      listingDurationInSeconds: moment()
        .add(auctionDuration, "days")
        .diff(moment(), "seconds"),
      quantity: 1,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      buyoutPricePerToken: basePrice.toString(),
    };
    try {
      const tx = await contract.direct.createListing(listing);
      show("Nft listed for sale successfully");
      console.log(tx);
    } catch (error) {
      show("NFT not listed for sale, internel error", "error");
    }
  };
  const auctionListing = async () => {
    const listing = {
      assetContractAddress: contractAddress,
      tokenId: Number(id),
      startTimestamp: new Date(),
      listingDurationInSeconds: moment()
        .add(auctionDuration, "days")
        .diff(moment(), "seconds"),
      // new Date().getTime()/1000 + Number(auctionDuration) * 24 * 60 * 60,
      quantity: 1,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      buyoutPricePerToken: basePrice.toString(),
      reservePricePerToken: minBid.toString(),
    };
    try {
      const tx = await contract.auction.createListing(listing);
      show("Nft listed for sale successfully");
      console.log(tx);
    } catch (err) {
      console.log(err);
      show("NFT not listed for sale, internel error", "error");
    }
  };
  const listForSale = async () => {
    changeCheck(true);
    if (saleType === "fixed") {
      await directListing();
    } else if (saleType === "auction") {
      await auctionListing();
    }
    router.push("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="subtitle3">
          The price on which a buyer can pay to instantly buy
        </Typography>
        <TextField
          label="Base Price"
          color="secondary"
          fullWidth
          value={basePrice}
          onChange={handleBasePriceChange}
          required
          type="number"
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
            <MenuItem value="fixed" sx={{ color: "black" }}>
              Fixed Price
            </MenuItem>
            <MenuItem sx={{ color: "black" }} value="auction">
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
              <MenuItem sx={{ color: "black" }} value="1">
                1 day
              </MenuItem>
              <MenuItem sx={{ color: "black" }} value="3">
                3 days
              </MenuItem>
              <MenuItem sx={{ color: "black" }} value="7">
                7 days
              </MenuItem>
              <MenuItem sx={{ color: "black" }} value="30">
                1 month
              </MenuItem>
              <MenuItem sx={{ color: "black" }} value="90">
                3 months
              </MenuItem>
              <MenuItem sx={{ color: "black" }} value="120">
                6 months
              </MenuItem>
              <MenuItem sx={{ color: "black" }} value="365">
                1 year
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        {saleType === "auction" && (
          <>
            <Box>
              <Typography variant="subtitle3">
                The minimum price per token necessary to bid on this auction
              </Typography>
              <TextField
                label="Minimum Bid"
                color="secondary"
                fullWidth
                value={minBid}
                onChange={handleMinBidChange}
                required
                type="number"
                margin="normal"
              />
              <Typography variant="subtitle1" sx={{ color: "gray" }}>
                ${(minBid * rate).toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            sx={{ color: "#F2B809" }}
            type="submit"
            fullWidth
            disabled={check}
          >
            {!check ? <>List For Sale</> : <>Listing</>}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ListingInput;

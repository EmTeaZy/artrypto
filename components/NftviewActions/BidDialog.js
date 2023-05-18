import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { useContract, useOffers, useSDK } from "@thirdweb-dev/react";
import { useState } from "react";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../../constants";
import { useSnackbar } from "../../context/SnackbarContextProvider";
import { useRouter } from "next/router";

export default function BigDialog(props) {
  const { open, handleClose, Nftdata, listingdata } = props;
  const { show } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { contract } = useContract(MARKETPLACE_CONTRACT_ADDRESS, "marketplace");
  const sdk = useSDK();
  const { data: offers, isLoading } = useOffers(contract, listingdata.id);
  const [offerValue, setOfferValue] = useState();
  const handleOfferChange = (event) => {
    seterror(false);
    setOfferValue(event.target.value);
  };

  const [error, seterror] = useState(false);

  const handleClick = () => {
    if (listingdata?.type === 0) {
      handleMakeOffer();
    } else if (listingdata?.type === 1) {
      handleMakeBid();
    }
  };
  const handleMakeBid = async () => {
    const balance = await sdk?.wallet?.balance(
      "0x9c3c9283d3e44854697cd22d3faa240cfb032889"
    );
    const buyPrice = Number(
      listingdata?.reservePriceCurrencyValuePerToken?.displayValue
    );
    const highestBid = offers.length!==0?Number(offers[0]?.totalOfferAmount) / 1e18:0;
    console.log(highestBid);
    if (offerValue > buyPrice) {
      if (Number(balance.displayValue) >= offerValue) {
          if (offerValue > highestBid) {
            createOffer();
          } else {
            show("Your bid should be greater then the highest Bidder", "error");
            setOfferValue(0);
          }
      } else {
        show("Insufficient amount to make offer on this NFT", "error");
        setOfferValue(0);
      }
    } else {
      seterror(true);
    }
  };
  const handleMakeOffer = async () => {
    const balance = await sdk?.wallet?.balance(
      "0x9c3c9283d3e44854697cd22d3faa240cfb032889"
    );
    console.log(balance);
    if (Number(balance.displayValue) >= offerValue) {
      createOffer();
    } else {
      show("Insufficient amount to make offer on this NFT", "error");
      setOfferValue(0);
    }
  };
  const createOffer = async () => {
    setLoading(true);
    console.log(offerValue);
    try {
      const res = await contract.makeOffer(
        Number(listingdata.id),
        offerValue,
        1
      );
      setLoading(false);
      show(
        listingdata?.type === 1
          ? "Bid done successfully"
          : "Offer made succesfully"
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      show("Transaction not succesfull", "error");
    }
    setLoading(false);
    setOfferValue(0);
    handleClose();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h1" sx={{ color: "black" }}>
            {listingdata?.type === 1 ? "Bid on NFT" : "Create an Offer"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "18px" }}>
            <Typography
              sx={{ fontSize: "22px", fontWeight: "600", color: "black" }}
            >
              NFT Name: <Typography>{Nftdata?.metadata.name}</Typography>
            </Typography>
            <Typography
              sx={{ fontSize: "22px", fontWeight: "600", color: "black" }}
            >
              Description:{" "}
              <Typography>{Nftdata?.metadata.description}</Typography>
            </Typography>
            <Typography
              sx={{ fontSize: "22px", fontWeight: "600", color: "black" }}
            >
              Instant Buy Price:{" "}
              <Typography>
                {" "}
                {listingdata?.buyoutCurrencyValuePerToken?.displayValue}{" "}
                {listingdata?.buyoutCurrencyValuePerToken?.name}
              </Typography>
            </Typography>
            {listingdata?.type === 1 ? (
              <Typography
                sx={{ fontSize: "22px", fontWeight: "600", color: "black" }}
              >
                Minimum Bid
                <Typography>
                  {" "}
                  {
                    listingdata?.reservePriceCurrencyValuePerToken?.displayValue
                  }{" "}
                  {listingdata?.reservePriceCurrencyValuePerToken?.name}
                </Typography>
              </Typography>
            ) : (
              <></>
            )}

            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: "600",
                color: "black",
                mt: "10px",
              }}
            >
              {listingdata?.type === 1 ? "Your Bid:" : "Your Offer:"}
            </Typography>
            <TextField
              label={listingdata.type === 0 ? "Offer Price" : "Bidding Price"}
              color="primary"
              fullWidth
              inputProps={{ style: { color: "black" } }}
              value={offerValue}
              onChange={handleOfferChange}
              required
              type="number"
              margin="normal"
            />
            {error ? (
              <Typography variant="subtitle2" sx={{ color: "red" }}>
                *Error bidding value is less then minimum bidding price
              </Typography>
            ) : (
              <></>
            )}
            <Typography mt={5} sx={{ color: !loading ? "red" : "green" }}>
              {!loading
                ? "Are you sure? You are going to offer the given amount for this NFT?"
                : "Nft Listing process is in progress...... Hold tight, it's gonna be fun"}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={() => handleClick()}>
            {!loading && listingdata.type === 0
              ? "Create Listing"
              : "Make a bid"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
